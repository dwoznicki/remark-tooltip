const fs = require("fs");
const unified = require("unified");
const parse = require("remark-parse");
const remarkTooltip = require("../index");
const remark2rehype = require("remark-rehype");
const stringify = require("rehype-stringify");

const doc = `
&[main content](tooltip content)
`;

const tree = unified()
    .use(parse)
    .use(remarkTooltip)
    //.parse(doc)
    .use(remark2rehype)
    .use(stringify)
    .process(doc, (err, file) => {
        if (err) {
            console.error(err);
        } else {
            console.log(file.contents);
        }
    });

