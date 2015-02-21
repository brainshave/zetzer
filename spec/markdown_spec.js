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
    it("does not render markdown tables as html when tables is false.", function(){
      var content = "\r\n\r\n| col1 | col2 |\r\n| ---- | ---- |\r\n| row2col1 | row2col2 |\r\n\r\n"
      var compiler = markdown_setup({marked_settings:{tables:false}});
      expect(trim(compiler.compile(content))).not.toMatch("<table");
    });
  });

  describe("setup", function(){
    it("renders markdown tables as html when tables is true", function(){
      var content = "\r\n\r\n| col1 | col2 |\r\n| ---- | ---- |\r\n| row2col1 | row2col2 |\r\n\r\n"
      var compiler = markdown_setup({marked_settings:{tables:true}});
      expect(trim(compiler.compile(content))).toMatch("<table");
    });
  });

  describe("setup", function(){
    it("renders markdown javascript code block as GFM codeblock when no marked_settings", function(){
      var content = "\r\n\r\n```javascript\r\nvar foo = {bar:true};\r\n```\r\n"
      var compiler = markdown_setup({});
      expect(trim(compiler.compile(content))).toMatch("<code class=\"lang-javascript\">");
    });
  });

  describe("setup", function(){
    it("renders markdown javascript code block as GFM codeblock when gfm is true", function(){
      var content = "\r\n\r\n```javascript\r\nvar foo = {bar:true};\r\n```\r\n"
      var compiler = markdown_setup({marked_settings:{gfm:true}});
      expect(trim(compiler.compile(content))).toMatch("<code class=\"lang-javascript\">");
    });
  });

  describe("setup", function(){
    it("renders markdown javascript code block as code tag when gfm is false", function(){
      var content = "\r\n\r\n```javascript\r\nvar foo = {bar:true};\r\n```\r\n"
      var compiler = markdown_setup({marked_settings:{gfm:false}});
      expect(trim(compiler.compile(content))).toMatch("<code>");
    });
  });
});
