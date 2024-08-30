/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  filenameGenerator: ({ path, name, width, extension }) =>
    `${name}.${width}.${extension}`,
  sourceImageParser: ({ src, defaultParser }) => {
    const regExpMatches = src.match(/^.*\?code=(.*)$/);
    if (!regExpMatches) {
      return defaultParser(src);
    }

    // if the src has fileId and extension in its route then it
    // must be a non-standard image, so parse it differently for all intents
    // and purposes
    return {
      pathWithoutName: "", // maybe there is no path, or you can supply an arbitrary one for filename processing
      name: regExpMatches[1] || "",
      extension: "png",
    };
  },
};

module.exports = config;
