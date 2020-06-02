const unified = require("unified");
const remarkParse = require("remark-parse");
const remarkTooltip = require("../index");
const remark2rehype = require("remark-rehype");
const rehypeStringify = require("rehype-stringify");

const stringify = (doc, options) => {
    return unified()
        .use(remarkParse)
        .use(remarkTooltip, options)
        .use(remark2rehype)
        .use(rehypeStringify)
        .processSync(doc).contents;
};

describe("tooltip Markdown --> HTML", () => {
    it("should parse Markdown", () => {
        const doc = "[base text]^tooltip text^";
        expect(stringify(doc)).toMatchSnapshot();
    });

    it("should not parse Markdown within tooltip content by default", () => {
        const doc = "[base text]^*tooltip* [content](/content)^";
        expect(stringify(doc)).toMatchSnapshot();
    });

    it("should ignore escaped brackets (\\]) and carets (\\^)", () => {
        const doc = "[base \\[\\] text]^tooltip \\^ text^";
        expect(stringify(doc)).toMatchSnapshot();
    });

    it("should render properly inline", () => {
        const doc = "He's a *handsome* [gecko]^Anaximander^.";
        expect(stringify(doc)).toMatchSnapshot();
    });

    it("should parse target \"hint.css\"", () => {
        const doc = "[base text]^tooltip text^";
        const str = stringify(doc, { target: "hint.css" });
        expect(str).toMatch(`aria-label="tooltip text"`);
        expect(str).toMatchSnapshot();
    });

    it("should parse target \"balloon.css\"", () => {
        const doc = "[base text]^tooltip text^";
        const str = stringify(doc, { target: "balloon.css" });
        expect(str).toMatch(`aria-label="tooltip text"`);
        expect(str).toMatch(`data-balloon-pos=`);
        expect(str).toMatchSnapshot();
    });

    it("should parse target \"microtip\"", () => {
        const doc = "[base text]^tooltip text^";
        const str = stringify(doc, { target: "microtip" });
        expect(str).toMatch(`aria-label="tooltip text"`);
        expect(str).toMatch(`data-microtip-pos`);
        expect(str).toMatch(`role="tooltip"`);
        expect(str).toMatchSnapshot();
    });

    it("should parse target \"inline-html\"", () => {
        const doc = "[base text]^*tooltip* [text](/hello)^";
        const str = stringify(doc, { target: "inline-html" });
        expect(str).toMatch("<em>tooltip</em>");
        expect(str).toMatch(`<a href="/hello">text</a>`);
        expect(str).toMatchSnapshot();
    });
});

