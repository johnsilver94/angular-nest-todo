/** @type {import('stylelint').Config} */
export default {
	extends: ["stylelint-config-recommended-scss", "stylelint-prettier/recommended"],
	plugins: ["stylelint-order", "stylelint-scss", "stylelint-prettier"],
	overrides: [
		{
			files: ["**/*.scss"],
			customSyntax: "postcss-scss"
		}
	],
	rules: {
		"prettier/prettier": true,
		"order/properties-alphabetical-order": true,
		"scss/at-rule-no-unknown": null,
		"scss/at-import-no-partial-leading-underscore": null
	}
}
