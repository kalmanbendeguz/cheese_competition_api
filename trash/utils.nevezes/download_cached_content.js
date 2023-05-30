const downloader = require("nodejs-file-downloader");

module.exports = async function () {
  const cached_files = [
    {
      url: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      directory: "./src/static/css/original/cached",
    },
    {
      url: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
      directory: "./src/static/scripts/original/cached",
    },
  ];
  try {
    for (const cached_file of cached_files) {
      cached_file.cloneFiles = false;
      const cached_file_downloader = new downloader(cached_file);
      await cached_file_downloader.download();
    }
    console.log("Cached content downloaded successfully.");
  } catch (error) {
    console.log("Cached content download failed: ", error);
  }
};
