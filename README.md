To start, clone and run "npm start".

Landing page url: 'http://localhost:9999/app/#/main'. Change localhost in package.json.

When making changes to css, enter app/css/ and run "sass --watch app.scss:app.css" in the terminal. Do not make changes directly to the css file.

Most partials in this app use custom directives - see directives.js for guidance on directives. Directives generally have their own controller, and changes to lists, labels, dropdowns, defaults, can generally be changed in the directive's respective controller.

J
