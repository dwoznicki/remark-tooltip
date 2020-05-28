# remark-tooltip

This [remark][remark]/[rehype][rehype] plugin adds custom syntax for creating tooltips.

## Installation

```sh
npm install remark-tooltip
```

## Usage

Sample markdown:

```markdown
[Thales]^623 - 545 BCE^ was the first Greek philosopher.
```

Sample script to convert markdown to HTML:

```javascript
const unified = require("unified");
const parse = require("remark-parse");
const remarkTooltip = require("remark-tooltip");
const remark2rehype = require("remark-rehype");
const stringify = require("rehype-stringify");

const doc = "[Thales]^623 - 545 BCE^ was the first Greek philosopher.";

unified()
    .use(parse)
    .use(remarkTooltip)
    .use(remark2rehype)
    .use(stringify)
    .process(doc, (err, file) => {
        if (err) {
            throw err;
        }
        console.log(file.contents);
    });
```

Sample output:

```html
<p><span class="tooltip">Thales<div class="tooltip-popup">623 - 545 BCE</div></span> was the first Greek philosopher.</p>
```

## License
[MIT][license] © [Daniel Woznicki][author]

