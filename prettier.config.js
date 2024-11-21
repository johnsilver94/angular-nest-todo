/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	useTabs: true,
	tabWidth: 2,
	trailingComma: "none",
	semi: false,
	singleQuote: false,
	jsxSingleQuote: false,
	printWidth: 125,
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "strict",
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: "always",
	proseWrap: "always",
	vueIndentScriptAndStyle: true,
	overrides: [
		{
			files: "*.html",
			options: {
				parser: "html"
			}
		},
		{
			files: "*.component.html",
			options: {
				parser: "angular"
			}
		}
	]
}

module.exports = config
