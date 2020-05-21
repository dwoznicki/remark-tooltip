const find = require("unist-util-find");
const visit = require("unist-util-visit");
const unified = require("unified");
const remarkParse = require("remark-parse");
const remarkTooltip = require("../index");
const remark2rehype = require("remark-rehype");
const rehypeStringify = require("rehype-stringify");

const parse = doc => {
    return unified()
        .use(remarkParse)
        .use(remarkTooltip)
        .parse(doc);
};

const stringify = doc => {
    return unified()
        .use(remarkParse)
        .use(remarkTooltip)
        .use(remark2rehype)
        .use(rehypeStringify)
        .processSync(doc);
};

//console.log(stringify(`&[base text](*tooltip* text)`));
console.log(parse(`&[base text](*tooltip* text)`).children[0].children[0]);

/*
describe("AST tooltip node", () => {
    const base = "base text";
    const tooltip = "tooltip content";

    const doc = `&[${base}](${tooltip})`;
    const tree = parse(doc);
    const node = find(tree, "tooltip");

    it("should exist in tree", () => {
        expect(node).toBeTruthy();
    });

    it("should have the correct value and tooltip", () => {
        expect(node.base).toBe(base);
        expect(node.tooltipRaw).toBe(tooltip);
    });
});

describe("HTML tooltip", () => {
});
*/

/*
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
    */

