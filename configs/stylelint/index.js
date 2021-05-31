module.exports = {
    extends: ["@citrus-linting/stylelint-config", "stylelint-config-prettier"],
    rules: {
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
    }
}
