"use strict";

var random = require("./random");
var trim = require("./trim");

describe("markdown_compiler", function () {

  var markdown_setup = require("../markdown");
  
  describe("applies_to", function () {
    var compiler = markdown_setup({});
    it("returns true for a markdown path", function () {
      expect(compiler.applies_to("file.md")).toEqual(true);
      expect(compiler.applies_to("file.dot.md.haml")).toEqual(true);
    });

    it("returns false for a non-markdown path", function () {
      expect(compiler.applies_to("file.html")).toEqual(false);
    });
  });

  describe("compile", function () {
    var compiler = markdown_setup({});
    it("compiles markdown", function () {
      var content = random.word();
      expect(trim(compiler.compile(content))).toEqual("<p>" + content + "</p>");
    });
  });

  describe("setup", function(){
    it("renders markdown tables as html when gfm and tables are true", function(){
      var content = "\r\n\r\n| col1 | col2 |\r\n| ---- | ---- |\r\n| row2col1 | row2col2 |\r\n\r\n"
      var compiler = markdown_setup({marked_settings:{gfm:true, tables:true}});
      expect(trim(compiler.compile(content))).toMatch("<table");
    });
  });

});
