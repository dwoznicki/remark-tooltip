const unified = require("unified");
const remarkParse = require("remark-parse");

const TOOLTIP_REGEX = /^\[(.+?)\]\^(.+?)\^/;

function parse(doc) {
    return unified()
        .use(remarkParse)
        .parse(doc);
}

function attacher() {
    function locator(value, fromIndex) {
        return value.indexOf("[", fromIndex);
    }

    function inlineTokenizer(eat, value) {
        const match = TOOLTIP_REGEX.exec(value);

        if (match) {
            const base = match[1];
            const tooltip = match[2];

            return eat(match[0])({
                type: "tooltip",
                children: [
                    { type: "text", value: base },
                    {
                        type: "tooltip",
                        children: parse(tooltip).children[0].children,
                        data: {
                            hName: "div",
                            hProperties: {
                                class: "tooltip-popup",
                            }
                        }
                    }
                ],
                data: {
                    hName: "span",
                    hProperties: {
                        class: "tooltip",
                    }
                }
            });
        }
    }

    inlineTokenizer.locator = locator;

    // Inject inlineTokenizer
    const Parser = this.Parser;
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;
    inlineTokenizers.tooltip = inlineTokenizer;
    inlineMethods.splice(0, 0, "tooltip");
}

module.exports = attacher;

