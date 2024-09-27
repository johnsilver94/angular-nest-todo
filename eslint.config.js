const nx = require("@nx/eslint-plugin")
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended")
const html = require("@html-eslint/eslint-plugin")
const htmlParser = require("@html-eslint/parser")

module.exports = [
	...nx.configs["flat/base"],
	...nx.configs["flat/typescript"],
	...nx.configs["flat/javascript"],
	eslintPluginPrettierRecommended,
	{
		ignores: ["**/dist"]
	},
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		rules: {
			"@nx/enforce-module-boundaries": [
				"error",
				{
					enforceBuildableLibDependency: true,
					allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
					depConstraints: [
						{
							sourceTag: "*",
							onlyDependOnLibsWithTags: ["*"]
						}
					]
				}
			]
		}
	},
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		// Override or add rules here
		rules: {}
	}
	// {
	// 	...html.configs["flat/recommended"],
	// 	files: ["**/*.html"],
	// 	plugins: {
	// 		"@html-eslint": html
	// 	},
	// 	languageOptions: {
	// 		parser: htmlParser
	// 	},
	// 	rules: {
	// 		...html.configs["flat/recommended"].rules,
	// 		"@html-eslint/indent": ["error", "tab"]
	// 	}
	// }
]
