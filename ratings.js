/* =========================================================================
   50% Film — ratings engine
   Half-star ratings + community average, backed by Supabase.
   Every page loads this one file. Add a mount where you want the stars:
     <div class="film-rating" data-film-slug="escape"></div>
     <div class="film-rating" data-variant="compact" data-film-slug="arch_XXXX"></div>
   ========================================================================= */
(function () {
  /* ---- CONFIG ---------------------------------------------------------- */
  /* REPLACE the URL below with your Supabase Project URL.                  */
  /* Find it in the dashboard: Settings > API Keys (or the Connect dialog). */
  /* It looks like  https://abcdefghijklmnop.supabase.co                    */
  var SUPABASE_URL = "https://jdmhijroqkeibeyxmpgp.supabase.co";
  var SUPABASE_KEY = "sb_publishable_JYNRLgjUZwfrpZpLMywHsA_NMLnYgI2";
  /* ---------------------------------------------------------------------- */

  var CONFIGURED = SUPABASE_URL.indexOf("YOUR-PROJECT-REF") === -1;

  function rpc(fn, body) {
    return fetch(SUPABASE_URL + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body || {})
    }).then(function (r) {
      return r.text().then(function (t) {
        if (!r.ok) throw new Error(fn + " " + r.status + " " + t);
        return t ? JSON.parse(t) : null;
      });
    });
  }

  function voterId() {
    var id = localStorage.getItem("fr_voter");
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : "v" + Date.now() + Math.random().toString(36).slice(2);
      localStorage.setItem("fr_voter", id);
    }
    return id;
  }

  /* ---- styles ---------------------------------------------------------- */
  function injectCSS() {
    if (document.getElementById("fr-css")) return;
    var css = "" +
      ".film-rating{font-family:'Space Mono',monospace;color:#f0ece4;}" +
      ".film-rating:not(.fr--compact){border-top:1px solid #1a1a1a;margin-top:64px;padding-top:48px;}" +
      ".fr-label{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c8341a;margin-bottom:24px;}" +
      ".fr-row{display:flex;align-items:flex-end;gap:48px;flex-wrap:wrap;}" +
      ".fr-block{display:flex;flex-direction:column;gap:11px;}" +
      ".fr-sublabel{font-size:8px;letter-spacing:0.3em;text-transform:uppercase;color:#888;}" +
      ".fr-avg{display:flex;align-items:baseline;gap:12px;}" +
      ".fr-avg-num{font-family:'DM Serif Display',serif;font-style:italic;font-size:46px;line-height:1;color:#e8e2d6;}" +
      ".fr-avg-num.fr-empty{font-size:24px;opacity:.4;}" +
      ".fr-count{font-size:11px;color:#888;white-space:nowrap;}" +
      ".fr-stars{display:inline-flex;gap:4px;position:relative;}" +
      ".fr-stars.fr-read .fr-star{font-size:18px;}" +
      ".fr-stars.fr-input .fr-star{font-size:32px;}" +
      ".fr-star{position:relative;line-height:1;color:rgba(240,236,228,0.16);user-select:none;}" +
      ".fr-star-fill{position:absolute;inset:0;width:0;overflow:hidden;color:#c8341a;white-space:nowrap;}" +
      ".fr-stars.fr-input:focus-visible{outline:2px solid #c8341a;outline-offset:6px;border-radius:3px;}" +
      ".fr-hit{position:absolute;top:0;bottom:0;width:50%;z-index:2;}" +
      ".fr-hit.l{left:0;}.fr-hit.r{right:0;}" +
      ".fr-your{font-size:11px;color:#888;min-height:15px;}" +
      ".fr-your b{color:#c8341a;}" +
      /* compact (archive cards) */
      ".film-rating.fr--compact{margin-top:14px;padding-top:14px;border-top:1px solid #1e1e1e;}" +
      ".fr--compact .fr-c-top{display:flex;align-items:center;gap:8px;margin-bottom:9px;}" +
      ".fr--compact .fr-avg-num{font-size:18px;}" +
      ".fr--compact .fr-avg-num.fr-empty{font-size:11px;letter-spacing:0.05em;}" +
      ".fr--compact .fr-stars.fr-read .fr-star{font-size:12px;}" +
      ".fr--compact .fr-count{font-size:9px;letter-spacing:0.05em;}" +
      ".fr--compact .fr-c-rate{display:flex;align-items:center;gap:10px;}" +
      ".fr--compact .fr-c-rate .fr-lbl{font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#888;}" +
      ".fr--compact .fr-stars.fr-input .fr-star{font-size:18px;}" +
      /* display only (index cards) — read-only average, no input */
      ".film-rating.fr--display{margin:0;padding:0;border-top:none;}" +
      ".fr--display .fr-d-row{display:flex;align-items:center;gap:8px;}" +
      ".fr--display .fr-avg-num{font-size:14px;letter-spacing:0.02em;color:#e8e2d6;}" +
      ".fr--display .fr-avg-num.fr-empty{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#888;}" +
      ".fr--display .fr-stars.fr-read .fr-star{font-size:11px;}" +
      ".fr--display .fr-count{font-size:9px;letter-spacing:0.05em;color:#888;white-space:nowrap;}";
    var s = document.createElement("style");
    s.id = "fr-css";
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---- star markup ----------------------------------------------------- */
  function readStars() {
    var h = "";
    for (var i = 0; i < 5; i++) h += '<span class="fr-star">\u2605<span class="fr-star-fill">\u2605</span></span>';
    return h;
  }
  function inputStars() {
    var h = "";
    for (var i = 0; i < 5; i++) {
      h += '<span class="fr-star">' +
        '<span class="fr-hit l" data-v="' + (i + 0.5) + '"></span>' +
        '<span class="fr-hit r" data-v="' + (i + 1) + '"></span>' +
        '\u2605<span class="fr-star-fill">\u2605</span></span>';
    }
    return h;
  }
  function paint(bar, value) {
    var stars = bar.querySelectorAll(".fr-star");
    for (var i = 0; i < stars.length; i++) {
      var pct = Math.max(0, Math.min(1, value - i)) * 100;
      stars[i].querySelector(".fr-star-fill").style.width = pct + "%";
    }
  }

  /* ---- one widget ------------------------------------------------------ */
  function build(mount) {
    var slug = mount.getAttribute("data-film-slug");
    var variant = mount.getAttribute("data-variant");
    var compact = variant === "compact";
    var display = variant === "display";
    mount.classList.add("film-rating");
    if (compact) mount.classList.add("fr--compact");
    if (display) mount.classList.add("fr--display");

    if (display) {
      mount.innerHTML =
        '<div class="fr-d-row">' +
          '<span class="fr-avg-num fr-empty" data-avg>\u2014</span>' +
          '<div class="fr-stars fr-read" data-read>' + readStars() + '</div>' +
          '<span class="fr-count" data-count></span>' +
        '</div>';
    } else if (compact) {
      mount.innerHTML =
        '<div class="fr-c-top">' +
          '<span class="fr-avg-num fr-empty" data-avg>\u2014</span>' +
          '<div class="fr-stars fr-read" data-read>' + readStars() + '</div>' +
          '<span class="fr-count" data-count></span>' +
        '</div>' +
        '<div class="fr-c-rate">' +
          '<span class="fr-lbl">Rate</span>' +
          '<div class="fr-stars fr-input" data-input role="slider" tabindex="0" aria-label="Rate this film" aria-valuemin="0.5" aria-valuemax="5">' + inputStars() + '</div>' +
        '</div>';
    } else {
      mount.innerHTML =
        '<div class="fr-label">Rating</div>' +
        '<div class="fr-row">' +
          '<div class="fr-block">' +
            '<span class="fr-sublabel">Average</span>' +
            '<div class="fr-avg">' +
              '<span class="fr-avg-num fr-empty" data-avg>\u2014</span>' +
              '<div class="fr-stars fr-read" data-read>' + readStars() + '</div>' +
              '<span class="fr-count" data-count></span>' +
            '</div>' +
          '</div>' +
          '<div class="fr-block">' +
            '<span class="fr-sublabel">Your rating</span>' +
            '<div class="fr-stars fr-input" data-input role="slider" tabindex="0" aria-label="Rate this film from half a star to five stars" aria-valuemin="0.5" aria-valuemax="5">' + inputStars() + '</div>' +
            '<span class="fr-your" data-your></span>' +
          '</div>' +
        '</div>';
    }

    var input = mount.querySelector("[data-input]");
    var readBar = mount.querySelector("[data-read]");
    var avgEl = mount.querySelector("[data-avg]");
    var countEl = mount.querySelector("[data-count]");
    var yourEl = mount.querySelector("[data-your]");
    var selected = Number(localStorage.getItem("fr_me_" + slug)) || 0;

    function renderYour() {
      paint(input, selected);
      if (!yourEl) return;
      yourEl.innerHTML = selected ? "You rated this <b>" + selected.toFixed(1) + "</b>" : "Tap to rate";
    }

    function setStats(s) {
      if (s.avg != null && s.count > 0) {
        avgEl.textContent = (Math.round(s.avg * 10) / 10).toFixed(1);
        avgEl.classList.remove("fr-empty");
        paint(readBar, s.avg);
        countEl.textContent = s.count + (s.count === 1 ? " rating" : " ratings");
      } else {
        avgEl.textContent = "\u2014";
        avgEl.classList.add("fr-empty");
        paint(readBar, 0);
        countEl.textContent = (compact || display) ? "" : "No ratings yet";
      }
    }

    if (display) {
      // read-only: no input wiring, just expose setStats for the batch fetch
      return { slug: slug, setStats: setStats };
    }

    function commit(value) {
      selected = value;
      localStorage.setItem("fr_me_" + slug, String(value));
      renderYour();
      if (!CONFIGURED) return;
      rpc("submit_rating", { p_slug: slug, p_voter: voterId(), p_rating: value })
        .then(function () { return rpc("get_film_stats", { p_slug: slug }); })
        .then(function (rows) {
          var r = (rows && rows[0]) || { avg_rating: null, rating_count: 0 };
          setStats({ avg: r.avg_rating, count: Number(r.rating_count) });
        })
        .catch(function (e) { if (window.console) console.warn(e); });
    }

    var hits = input.querySelectorAll(".fr-hit");
    for (var i = 0; i < hits.length; i++) {
      (function (hit) {
        hit.addEventListener("mousemove", function () { paint(input, Number(hit.dataset.v)); });
        hit.addEventListener("click", function () { commit(Number(hit.dataset.v)); });
      })(hits[i]);
    }
    input.addEventListener("mouseleave", function () { paint(input, selected); });
    input.addEventListener("keydown", function (e) {
      var v = selected || 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") { v = Math.min(5, v + 0.5); e.preventDefault(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { v = Math.max(0.5, v - 0.5); e.preventDefault(); }
      else return;
      paint(input, v);
      clearTimeout(input._t);
      input._t = setTimeout(function () { commit(v); }, 250);
    });

    renderYour();
    return { slug: slug, setStats: setStats };
  }

  /* ---- boot ------------------------------------------------------------ */
  function init() {
    var mounts = document.querySelectorAll(".film-rating[data-film-slug]");
    if (!mounts.length) return;
    injectCSS();

    var byslug = {};
    for (var i = 0; i < mounts.length; i++) {
      var c = build(mounts[i]);
      (byslug[c.slug] = byslug[c.slug] || []).push(c);
    }
    if (!CONFIGURED) return; // visible + interactive, but waiting on Project URL

    rpc("get_all_film_stats", {}).then(function (rows) {
      var map = {};
      (rows || []).forEach(function (r) {
        map[r.film_slug] = { avg: r.avg_rating, count: Number(r.rating_count) };
      });
      Object.keys(byslug).forEach(function (slug) {
        var s = map[slug] || { avg: null, count: 0 };
        byslug[slug].forEach(function (c) { c.setStats(s); });
      });
    }).catch(function (e) { if (window.console) console.warn(e); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
