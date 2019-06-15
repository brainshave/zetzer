var _ = require("underscore");

module.exports = {
  word: unique_word,
};

var counter = 0;

function unique_word () {
  return "unique-" + (++counter);
}
