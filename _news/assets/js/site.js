// Red-dot cursor follow. Skips on touch devices and when reduced motion is preferred.
(function () {
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dot = document.querySelector(".cursor-dot");
  if (!dot || !fine) return;
  window.addEventListener("mousemove", function (e) {
    if (reduce) { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; }
    else { dot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"; }
  });
})();
