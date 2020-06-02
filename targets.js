module.exports = {
    "hint.css": {
        parse: (base, tooltip) => {
            const node = toBasicMdastNode(base);
            node.data.hProperties["aria-label"] = tooltip;
            node.data.hProperties.class += " hint--top";
            return node;
        },
    },
    "balloon.css": {
        parse: (base, tooltip) => {
            const node = toBasicMdastNode(base);
            node.data.hProperties["aria-label"] = tooltip;
            node.data.hProperties["data-balloon-pos"] = "up";
            return node;
        },
    },
    "microtip": {
        parse: (base, tooltip) => {
            const node = toBasicMdastNode(base);
            node.data.hProperties["aria-label"] = tooltip;
            node.data.hProperties.role = "tooltip";
            node.data.hProperties["data-microtip-position"] = "top";
            return node;
        },
    },
    "inline-html": {
        parse: (base, tooltip, tokenize) => {
            const node = toBasicMdastNode(base);
            node.children.push({
                type: "paragraph",
                data: {
                    hName: "div",
                    hProperties: {
                        class: "tooltip-content",
                    }
                },
                children: tokenize(tooltip).children[0].children,
            });
            return node;
        },
    },
};

const toBasicMdastNode = base => {
    return {
        data: {
            hName: "span",
            hProperties: {
                class: "tooltip",
            },
        },
        children: [
            { type: "text", value: base },
        ],
    };
};

