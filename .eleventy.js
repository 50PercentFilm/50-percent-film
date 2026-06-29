module.exports = function (eleventyConfig) {
  // --- Copy your existing hand-built site through to the output, completely untouched ---
  // (Everything stays exactly where it is in your repo; this just mirrors it into _site.)
  const passExt = [
    "html", "htm", "css", "js", "mjs", "json",
    "jpg", "jpeg", "png", "gif", "webp", "svg", "ico", "avif",
    "xml", "txt", "pdf", "mp4", "webm", "mov",
    "woff", "woff2", "ttf", "otf", "eot", "webmanifest",
  ];
  passExt.forEach((ext) => eleventyConfig.addPassthroughCopy(`*.${ext}`));
  eleventyConfig.addPassthroughCopy("films");   // your films subfolder, if present
  eleventyConfig.addPassthroughCopy("uploads"); // images writers upload via the CMS

  // --- The news system's own files ---
  eleventyConfig.addPassthroughCopy({ "_news/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "_news/assets": "assets" });

  // "June 2026" style date used in the eyebrows
  eleventyConfig.addFilter("monthYear", (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }) : ""
  );

  // All news pieces, newest first
  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("_news/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: ".",
      includes: "_news/_includes",
      data: "_news/_data",
      output: "_site",
    },
    templateFormats: ["njk", "md"], // your .html pages are copied as-is, never reprocessed
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
