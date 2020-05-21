const TOOLTIP_REGEX = /^&\[(.+?)\]\((.+?)\)/;

function attacher() {
    function locator(value, fromIndex) {
        return value.indexOf("&[", fromIndex);
    }

    function inlineTokenizer(eat, value) {
        const match = TOOLTIP_REGEX.exec(value);

        if (match) {
            const baseText = match[1];
            const tooltipContent = match[2];

            return eat(match[0])({
                type: "tooltip",
                tooltip: tooltipContent,
                children: [
                    { type: "text", value: baseText }
                ],
                data: {
                    hName: "span",
                    hProperties: {
                        class: "tooltip-base",
                        "data-tooltip": tooltipContent,
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

