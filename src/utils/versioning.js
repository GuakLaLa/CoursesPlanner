// versioning.js
function getNextVersionNumber(lastVersion) {
  return lastVersion ? lastVersion.version + 1 : 1;
}

module.exports = { getNextVersionNumber };
