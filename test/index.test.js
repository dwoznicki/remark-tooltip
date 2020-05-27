const unified = require("unified");
const remarkParse = require("remark-parse");
const remarkTooltip = require("../index");
const remark2rehype = require("remark-rehype");
const rehypeStringify = require("rehype-stringify");

const stringify = doc => {
    return unified()
        .use(remarkParse)
        .use(remarkTooltip)
        .use(remark2rehype)
        .use(rehypeStringify)
        .processSync(doc).contents;
};

describe("HTML tooltip", () => {
    it("should parse markdown", () => {
        const doc = "[base text]^tooltip text^";
        expect(stringify(doc)).toMatchSnapshot();
    });

    it("should parse markdown within the tooltip", () => {
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
});

