# Zetzer

Zetzer is an HTML template processor.

Features!

- pages, templates and partials
- [doT][dot] templates in HTML input
- [Markdown][markdown] input (with optional doT processing)
- optional JSON headers for metadata
- grunt and broccoli plugins

"Zetzer" ("setzer" in German, "zecer" in Polish) used to be a
profession where a person would manually compose a page for a printing
press by arranging metal fonts on a matrix. Interesting fact: the
zetzer would see the page mirrored left-right while working on it so
they had to master reading in this weird form. English word for it is
probably typesetter.

## Main concepts

Zetzer has three main concepts: page, template and partial. Each of
them can declare a JSON header for some extra info. Header's metadata
is accessible from within the document as {{= it.field_name }}. The
header is divided from content by one empty line.

One of special header fields is `template` which declares the template
that current document will be wrapped with. A template can be declared
for a page, a partial and even for another template. (Possible
circular wrapping will be detected.)

### Pages

**Pages** are starting points of the compilation. For each input page
(either HTML or Markdown) document there will be exactly one output
HTML document.

### Templates

**Templates** wrap around the content of a **page**, partial** or
another **template**. Inside a template, invoking contents of the
wrapped document is made by:

    {{= it.document }}

We can access wrapped document's header by naming its fields like:

    {{= it.document.title }}

### Partials

Includes can be invoked by name (extension can be omitted) from any
other **partial**, **page** or **template**:

    {{= it.include("navigation", { option: "value" }) }}

We can pass extra options to the partial that will appear on the `it`
inside the partial. A partial can have a template. This means it will
be wrapped in that template before putting it in the document that
requested it.

## Usage & Configuration

Zetzer can be used as a library and Grunt or Broccoli
plugin. Specific instruction can be found here:

- [broccoli-zetzer][broccoli-zetzer]
- [grunt-zetzer][grunt-zetzer]

Configuration options:

### pages (broccoli only)

Directory where input pages are located. Grunt version uses the
standard `files` scheme instead.

### templates

Directory where all the templates are located.

### partials

Directory that holds all partials.

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
[grunt-zetzer]: https://github.com/brainshave/grunt-zetzer
[broccoli-zetzer]: https://github.com/brainshave/broccoli-zetzer