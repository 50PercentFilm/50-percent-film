# 50% Film — fixes applied (June 2026)

## Fixed across all pages
- Footer year: © 2027 → © 2025–2026 (was also © 2025 on the agreement page; now consistent)
- Added meta description + Open Graph + Twitter cards to every page (link previews now show title, description, and image)
- Logo now links to index.html (was a dead "#")
- Dead "Contact" links in the menu/footer now point to contact.html
- Homepage <title> upgraded to "50% Film — Short Films. Full Vision." for SEO

## New files
- about.html — the missing About page, built in your design system and voice
- 404.html — custom on-brand not-found page (Netlify serves this automatically)
- og-image.jpg — 1200×630 share card used by the meta tags
- sitemap.xml + robots.txt

## Renamed
- Submit.html → submit.html (every nav link pointed to lowercase "submit.html"; the capital S would 404 on case-sensitive hosting)
  NOTE: commit this as a real rename — `git mv Submit.html submit.html` — so Git records the case change.

## Still needs your input (left untouched on purpose)
- Letterboxd links are still "#" sitewide. Send the profile URL, or say the word and I'll remove the claim.
- Newsletter links are still "#". You have a Mailchimp popup script; send the hosted signup URL or I can wire the links to trigger the popup.
- collections.html: the 6 collection cards link to "#". Tell me where each should go.
- news.html: 7 extra dead "#" links beyond the footer. Need destinations.
- Data mismatch: homepage shows 5 confirmed films + different collection counts than the catalogue/collections pages show. Send the canonical film list and I'll align all three.
- Film detail pages (Cosmo / Dear Tooth Fairy / Narben) aren't in the repo and the homepage cards aren't clickable. Send them or I'll build a template.
- About page is written in the "two of us" unnamed voice. Want your names/bios added? Easy.

---

# Film pages update (June 2026)

## Fact-checked & corrected (existing pages)
- cosmo.html:
  - Removed an unverifiable director quote in "The Making Of" (the "greatest thing I've ever done…" block) — replaced with factual prose. Could not confirm the wording, so it shouldn't sit in quotation marks attributed to Joey Lever.
  - Removed the smaller unverified "an insane experience" quote in "Behind the Film".
  - Named the orchestra: Budapest Scoring (the page only said "59-piece orchestra"; the composer's own materials name Budapest Scoring).
  - Corrected Alan Meyerson's credits to verified ones (Dune, Interstellar, The Dark Knight) and added "Grammy-winning". Removed "Big Hero 6" and "Dunkirk", which I couldn't confirm against the project's own sources.
  - Added Year: 2023 (per IMDb).
  - Cast (Charlie Bond as Cosmo, James Hamer-Morton as Nova) confirmed correct via IMDb — left as-is.
  - NOTE: "Award-winning" is the filmmaker's own consistent description across his channels, so I kept it, but IMDb lists the film with a nomination rather than a confirmed win. Worth confirming the specific award with Joey before leaning on it.
- dear-tooth-fairy.html: Liah Danquah's details (London director, Goldsmiths, founder of LTD Productions) check out. No fake quotes present. Left content as-is.
- narben.html: Joshua Haiden's Narben has almost no public web footprint, so I couldn't independently verify the crew (Maximilian Gübitz, Lou Riera, Cosmix Studios). No fake critic quotes present. Left the director-supplied details as-is — confirm them with Joshua if you want certainty. "Narben" does correctly mean "Scars" in German.

## Common fixes to all 5 film pages
- Footer year → © 2025–2026
- Added favicons + meta description + Open Graph + Twitter cards
- Fixed broken paths: pages used ../index.html (assumes a subfolder) but sit in the repo root, so those links would break. Now point to index.html / catalogue.html / submit.html.

## New pages (built from the Cosmo template, verified data only)
- leclat.html — L'éclat, dir. Tansi Makele. Real cast & crew pulled from Letterboxd (cinematographer Ana Maria Miranda, editor Nathan Grosshans, etc). Synopsis left as a placeholder — Letterboxd has none, and I won't invent one.
- my-last-day-on-earth.html — dir. Pauliina Leskinen. Uses the official one-line synopsis and real cast/crew from Letterboxd.

## Still to do (needs you)
- These film pages aren't linked yet from the homepage cards or the catalogue rows. Say the word and I'll wire them up.
- Per-film share images (og:image) would beat the generic one. Send stills and I'll set them per page.
- L'éclat and My Last Day synopses + director bios are placeholders pending real copy from you.

---

# Film page art + coming-soon pass (June 2026)
- Added index-style hero art to the top of all five film pages: the film-strip panel grid with red diagonal gradients, big faded numbers, sprocket-perforation edges, and the rotated "50% Film" label. Consistent across every film page and matched to the homepage.
- Replaced the embed placeholder with a "Grab your popcorn. They're coming soon." message on the three films that have no video yet: Dear Tooth Fairy, L'éclat, My Last Day on Earth.
- Cosmo (YouTube) and Narben (Short Film Wire) have working embeds and are actually watchable, so I left their players in place rather than label a released film "coming soon." Say the word if you want the popcorn message on those two as well for a coordinated launch.
- Removed all premiere-date claims from L'éclat (status strip, poster, and meta) and My Last Day on Earth.

---

# Hero art correction + popcorn on all five (June 2026)
- Replaced the film-strip grid hero with each film's actual card artwork from the homepage (Cosmo purple orb, Dear Tooth Fairy amber glow, Narben blue streaks, L'éclat gold, My Last Day navy), so each film page top matches its catalogue card.
- Put the "Grab your popcorn." message on all five film pages, including Cosmo and Narben (their embeds were replaced).
- Changed the sub-line to "Film coming soon".
- Note: Cosmo and Narben still show their external watch links (YouTube / Letterboxd) below the coming-soon message. Tell me if you want those removed for consistency.

---

# Wiring pass (June 2026)
- Letterboxd: every dead Letterboxd link now points to https://boxd.it/lHBGz (14 links across the site).
- Newsletter: left as-is, per request.
- Collections page: the six dead cards are now content blocks (no dead links). Each film is filed into the collection that fits — Signal: COSMO + My Last Day on Earth; Quiet Worlds: Narben + L'éclat; First Light: Dear Tooth Fairy. Each shows its films as chips linking to the film pages, with correct counts. Empty collections still read "Open for submissions."
- News page: the six category tabs (All / News / Reviews / Interviews / Features / Festival) now actually filter the articles by category, with an empty-state message for categories with nothing in them yet. The sidebar newsletter link was left alone.
- Catalogue: now lists all five films (001 COSMO, 002 Dear Tooth Fairy, 003 Narben, 004 L'éclat, 005 My Last Day on Earth), each linking to its film page, followed by 7 open slots. Counts corrected to "5 confirmed / 7 open / 12 entries" and "entry 006".
- Data now agrees across all three pages: homepage, catalogue, and collections all reflect 5 films (Signal count on the homepage bumped from 1 to 2).

---

# Homepage cards linked (June 2026)
- The five homepage film cards (COSMO, Dear Tooth Fairy, Narben, L'éclat, My Last Day on Earth) are now clickable and link through to their film pages. The empty "A film could be here" slots still point to Submit.

---

# Film leader countdown (June 2026)
- Added an Academy-style countdown leader that plays on the homepage: rotating sweep, clock ticks, crosshair registration marks, big Bebas numbers 5 to 1, red core, then a frame-flash cut to the hero.
- Plays once per browser session (sessionStorage), has a Skip Intro button, and is disabled for users with reduced-motion preferences.
- To see it again while testing, open the site in a new tab or a private window (the once-per-session flag resets).

---

# Homepage atmosphere experiments (June 2026)
Three effects added to index.html, all on the homepage:
- Projector beam + gate weave: a faint volumetric light cone over the hero with a subtle flicker, plus a tiny gate-weave jitter on the hero title. Off for reduced-motion users.
- Reticle cursor + card spotlight: the cursor is now a focus-frame that grows on links and becomes a play triangle over film cards. Hovering a catalogue card dims the others and drifts its art with the cursor.
- Filmstrip reel: the catalogue grid is now a horizontal reel framed by sprocket holes, with wheel-to-scroll wired in.
All three are independent. Any can be dialled up, toned down, or removed.

---

# "Make it work harder" pass 1 (June 2026)
- Submit page: added a "How it works" 4-step timeline (submit / we watch / you're in / it goes live) and a 7-question FAQ covering cost, rights, festival premieres, genres, response time, takedown, and what acceptance gets you. All consistent with the agreement terms.
- Film pages (all 5): added a "Be first when it lands" block near the end. Primary action is Follow on Letterboxd (works now). The email signup is a Mailchimp-ready form — paste your Mailchimp form action URL into action="" to switch it on. Until then, submitting shows a friendly note pointing to Letterboxd, so it's never broken for visitors.
- Per-film share images: generated a unique 1200x630 share card for each film from its own colour palette (og-cosmo.jpg, og-dear-tooth-fairy.jpg, og-narben.jpg, og-leclat.jpg, og-my-last-day-on-earth.jpg) and pointed each film page's og:image / twitter:image at its own card.

## Still to do
- About page with real names: send me the two names + one line of bio each and I'll build it.
- Vol.01 anthology page: confirm whether the current 5 films are the provisional lineup.
- Journal/editorial section: confirm it should host your "One Minute Film School" / "Runtime Test" pieces.
- Shared header/footer + mobile/accessibility pass: bigger jobs, best done as focused tasks.

---

# Make-it-better pass (June 2026)
- Notify-me capture added to all 5 film pages: on-brand email form + "follow on Letterboxd". NOT yet connected — replace `#REPLACE-WITH-MAILCHIMP-ACTION` in each form with your Mailchimp form action URL (and add the audience hidden field) to go live. Until then it shows a cosmetic confirmation and does not store emails.
- New page: vol-1.html — the Volume One anthology page (concept, the 5 films gathered so far with runtimes, a "be in the room" email capture). Linked from the homepage Vol.1 teaser and added to the sitemap.
- Submit page already had a 4-step "How it works" timeline and a 7-question FAQ (cost, rights, festival premieres, formats, response time, takedown, what you get) — no change needed.
- Still to do: per-film share images (need stills); About "The People" section (need your names + bios); the journal (need content direction); a shared header/footer refactor + mobile/accessibility pass (own step).

---

# Roster expansion — 11 accepted films (June 2026)
- Built 8 new film pages from the dossier: Disclosure, @ilovethettc102, Thinking Vulnerability, Amy & I, Perseus, Toy-Gun, Escape, English Beasts. Each has its own genre-themed hero art, full synopsis (where supplied), director bio (where supplied), details, crew, popcorn "Film coming soon", and a notify capture.
- Credit flags honored: Disclosure listed as Dir. Alex Valderana / Writer Raul Barquet. Dear Tooth Fairy as Dir. Liah Danquah.
- Private links kept private: Dear Tooth Fairy (WeTransfer) and Escape (password screener) are NOT linked anywhere.
- No film links added: per request, the new pages carry no external/film links and stay "coming soon". (The 2 that had a Letterboxd film link were stripped.)
- Updated existing pages from the dossier: Dear Tooth Fairy (runtime 4 min, year 2026, Best Micro Short nomination at the BFI-supported Little Flix Festival added to bio + details); COSMO and My Last Day runtimes set to 4 min.
- Site-wide updates: catalogue now lists all 13 films (linked) + 7 open slots; collections re-assigned by genre with counts; homepage shows all 13 cards with art and corrected counts (13 selected; Dread 3, Quiet Worlds 5, First Light 1, After Dark 1, Signal 2, Still Life 1); Vol.1 selection lists all 13; sitemap updated.

## Needs you
- Narben and L'éclat are NOT in your dossier of 11. I left them on the site (so total shows 13). Tell me to remove them if they're not part of the lineup.
- Dossier gaps: COSMO full synopsis + year; Escape full synopsis; confirm Thinking Vulnerability year; director bios still missing for Amy & I, Perseus, Toy-Gun, Escape, English Beasts.
- The existing 5 pages still carry per-film Letterboxd links; say the word and I'll strip those too for a fully consistent "coming soon".

---

# Index rebuild on your file + bespoke artwork (June 2026)
- Rebuilt the homepage on the index.html you supplied: original cursor, film-leader countdown, 3-column grid format, and styling all preserved (removed a stray horizontal-reel style so it's back to your grid).
- Letterboxd: kept. The two new pages that had a Letterboxd listing (@ilovethettc102, Amy & I) have it back. No links to the films themselves anywhere — still coming-soon.
- Unique artwork for every new film, matching the bespoke feel of Narben / Dear Tooth Fairy / L'éclat: Disclosure (broadcast scanlines + red signal bar), @ilovethettc102 (online dot-grid + teal node), Thinking Vulnerability (soft intertwined rose forms), Amy & I (candle glow + blood vignette), Perseus (Super-8 light leak + grain), Toy-Gun (film-noir blinds + streetlight), Escape (violet motion + dream core), English Beasts (cold wilderness + blood slash). Each film page hero now matches its card.
- New confirmed-film treatment: every confirmed film is numbered (01–13) with a solid red hairline frame; open slots now use a dashed border and read clearly as open. Easy to tell a real film from an empty slot at a glance.
- The Mailchimp "Stay in Frame" popup is your external script and was left untouched.

---

# Cursor + hero revert (June 2026)
- Cursor: removed the ring/play-triangle "reticle" cursor. Back to your single red dot that expands on hover.
- Hero: removed the gate-weave animation that made "Short Films. Full Vision." jitter, plus the gate-flicker overlay and the projector-beam light cone. The title is now static and clean (just the one fade-in on load).
- Also removed the cursor-driven card parallax and a leftover wheel-scroll handler that was hijacking vertical scrolling over the catalogue grid.
- All of this session's catalogue work (13 films, bespoke artwork, confirmed-film numbering) is untouched.

---

# Spotlight restored (June 2026)
- Brought back the projector-beam spotlight at the top of the hero (the light cone). The title weave and the full-screen gate-flicker stay removed, so the title doesn't jitter — only the beam has its subtle projector pulse.

---

# Film page edits (June 2026)
- Notify section reworked on every film page: centered, the broken email form removed (no automation), and "Follow on Letterboxd" is now the call to action (a real link). On the older 5 pages this also removed a duplicate notify block that had crept in.
- Director Interview placeholder moved to sit underneath the synopsis instead of beside it, on all 13 pages.
- Director bios added for the five new pages that lacked them:
  - Escape — Masha Maroutitch (from supplied bio, condensed)
  - Perseus — Jack Davies (supplied bio, rewritten in third person)
  - Amy & I — Bastiaan Rook (researched: On Air debut, B. Rogue Productions, Amy & I awards, Citroen)
  - Toy-Gun — Emre Karabacak (researched + his own site: Turkish artist in Amsterdam, photo/video/sculpture/design)
  - English Beasts — Nikolas Harris (from his site: credited Writer & Director; Then I Was Lost, Once Upon a Time in England, The Deserter)

---

# Cast & crew research (June 2026)
Expanded from research:
- Disclosure — Cast: Bob Jaffe, Chase Cortland Erwin, KC Connor, Nicholas James Reilly, Jacob A. Ware. Crew: Alex Valderana (dir/editor), Raul Barquet (writer), producers Barquet/Valderana/DiCroce, Mattie Cameron Rosen (cinematography).
- Amy & I — Cast: Eline Havenaar (Amy), Sytse Faber, David Gibbs, Gwen Guegan. Crew: Bastiaan Rook (dir), Martijn Daamen (writer), producers Vasilikos/Rook.
- Thinking Vulnerability — Dancers: Victoria Moreira, Deborah Sounouvou, Tim Brugger, Lisa Birades. Dir Miloushka Bokma.
- Perseus — Jack Davies (director, writer, camera, editor; solo work).
- English Beasts — Cast: Paul Dewdney, Edmund Fargher. Crew: Nikolas Harris (writer/producer/dir), Edward Thompson (production design), Harrison Sanders (editor), Sam Pay (sound).
Already complete: Cosmo, L'eclat, My Last Day on Earth, Narben.
No additional credits findable online (left director-only): Dear Tooth Fairy, @ilovethettc102, Toy-Gun, Escape.

---

# Link previews + catalogue label (June 2026)
- Catalogue hover cursor now reads "See film" instead of "View on Letterboxd" (the rows open the film page, not Letterboxd).
- Share/link-preview image fixed: the 8 newer film pages were all pointing og:image and twitter:image at og-cosmo.jpg, so every link previewed as Cosmo. Generated a proper 1200x630 share card for each (disclosure, ilovethettc102, thinking-vulnerability, amy-and-i, perseus, toy-gun, escape, english-beasts) using each film's own hero art, and repointed both tags to og-<slug>.jpg.
- Note: iMessage/social platforms cache previews, so already-sent links may still show the old image until the cache refreshes; new shares will be correct.
