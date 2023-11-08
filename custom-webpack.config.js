
module.exports = {
  experiments: {
    topLevelAwait: true
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "fs/promises": false
    }
  }
}