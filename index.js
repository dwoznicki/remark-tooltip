const unified = require("unified");
const remarkParse = require("remark-parse");
const targets = require("./targets");

// Syntax: [base]^tooltip content^
const TOOLTIP_REGEX = /^\[(.+?)\]\^(.+?[^\\])\^/;

const processor = unified().use(remarkParse);

const defaultOptions = {
    target: "hint.css",
    parse: null,
};

function attacher(options) {
    options = options || defaultOptions;

    let targetOptions;
    if (options.target) {
        targetOptions = targets[options.target];
    }

    let parse = options.parse;
    if (!parse && targetOptions) {
        parse = targetOptions.parse;
    }
    if (!parse) {
        throw new Error("Missing `parse` function. You may either pass in as an option or pass in a valid `target` option to infer it.");
    }

    const tokenize = processor.parse;

    function locator(value, fromIndex) {
        return value.indexOf("[", fromIndex);
    }

    function inlineTokenizer(eat, value) {
        const match = TOOLTIP_REGEX.exec(value);

        if (match) {
            const base = match[1];
            const tooltip = match[2];

            const node = parse(base, tooltip, tokenize);
            node.type = "tooltip";

            return eat(match[0])(node);
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

