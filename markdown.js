"use strict";

/*
 * A simple markdown compiler.
 *
 * An applies_to function is provided to test against
 * input files that require this compiler
 */

module.exports = setup;

var md = require("marked");

function setup (config) {
  var settings = config.marked_settings || {};

  return {
    applies_to: applies_to,
    compile: compile
  };

  function compile (src) {
    return md(src, settings);
  }

  function applies_to (file_path) {
    return /\.md$|\.md\./.test(file_path);
  }
}
