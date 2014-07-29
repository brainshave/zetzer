# Zetzer

Zetzer is a static HTML page generator.

Features!

- **pages**, **templates** and **partials**
- [doT][dot] template engine
- Markdown via [marked][marked]
- optional JSON headers for metadata
- grunt and broccoli plugins

The name: "Zetzer" ("setzer" in German, "zecer" in Polish) used to be a
profession where a person would manually compose a page for a printing
press by arranging metal fonts on a matrix. Interesting fact: the
zetzer would see the page mirrored left-right while working on it so
they had to master reading in this weird form. English word for it is
probably typesetter.

## Usage

Zetzer can be used as a library and Grunt or Broccoli
plugin. Specific instructions can be found here:

- [broccoli-zetzer][broccoli-zetzer]
- [grunt-zetzer][grunt-zetzer]

## Main concepts

Zetzer has three main concepts: page, template and a partial. Each of
them can declare a JSON header for any extra info about the
document. Header's metadata is accessible from within the document as
`{{= it.field_name }}`. The header is divided from content by one
empty line.

One of special header fields is `template` which declares the template
that current document will be wrapped with. A template can be declared
for a page, a partial and even for another template. (Possible
circular wrapping will be detected.)

Based on file's extension, it will be processed by either by doT or
marked:

- `*.md`: marked
- `*.html`: doT
- `*.dot.md`: doT & marked

### Pages

**Pages** are the starting points of the compilation. For each input
page (either HTML or Markdown) document there will be exactly one
output HTML document.

### Templates

**Templates** wrap around the content of a **page**, **partial** or
another **template**. We declare current unit's template by specifying
`template` field in its header. Inside a template, invoking contents
of the wrapped document is made by:

    {{= it.document }}

We can access wrapped document's header by naming its fields like:

    {{= it.document.title }}

### Partials

Includes can be invoked by name (extension can be omitted) from any
other **partial**, **page** or **template**:

    {{= it.include("navigation") }}

We can pass extra options to the partial that will appear on the `it`
inside the partial.

    {{= it.include("navigation", { option: "value" }) }}

A partial can have a template. This means it will be wrapped in that
template before putting it in the document that requested it.

We can access any partial's header fields by naming it:

    {{= it.include("navigation").title }}

## Configuration options

### pages (broccoli-zetzer only)

Directory where input pages are located. Grunt version uses the
standard `files` scheme instead. A tree in Broccoli.

### templates

Directory where all the templates are located. A tree in
Broccoli. Defaults to "." in Grunt.

### partials

Directory that holds all partials. A tree in Broccoli. Defaults to "."
in Grunt.

### env

Global environment. Fields defined in `env` will be visible on every
`it` object inside [doT][dot] templates. They can be overridden by
file-local headers.

### meta_data_separator

Separator between a header and file contents. By default it's an empty
line.

### dot_template_settings

Settings for the [doT][dot] template engine.

## Contributing

Please make sure your changes follow the current style and all test
passes. Each new feature and bug fix require new tests. To run the
test suite run `npm test`.

For buildtool-related bugs please take a look at
[grunt-zetzer][grunt-zetzer] and [broccoli-zetzer][broccoli-zetzer]
projects.

If you take a look at any source file you can notice that there's no
dependencies between modules. All dependencies are injected in by the
library consumers ([grunt-zetzer] and [broccoli-zetzer]). That's the
place where the integration happens.

## Release History

- __version 2.0.0__ (29th July, 2014) - rename to Zetzer and split grunt-specific code to grunt-zetzer

Previous versions as "grunt-stencil":

- __version 1.1.0__ (1st June, 2014) - apply doT to all HTML files
- __version 1.0.2__ (10th December, 2013) - Windows compatibility
- __version 1.0.1__ (24th November, 2013) - fix for new markdown version
- __version 1.0.0__ (7th October, 2013) - first stable release
- __version 0.1.0__ (4th October, 2013) - big refactor and change of specification
- __version 0.0.3__ (19th September, 2013) - fix dependencies in `package.json`
- __version 0.0.2__
- __version 0.0.1__ (16th September, 2013)

[dot]: http://olado.github.io/doT/
[marked]: https://github.com/chjj/marked
[grunt-zetzer]: https://github.com/brainshave/grunt-zetzer
[broccoli-zetzer]: https://github.com/brainshave/broccoli-zetzer