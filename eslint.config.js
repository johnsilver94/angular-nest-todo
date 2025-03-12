const nx = require("@nx/eslint-plugin")
const eslint = require("@eslint/js")
const tseslint = require("typescript-eslint")

module.exports = [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...nx.configs["flat/base"],
	...nx.configs["flat/typescript"],
	...nx.configs["flat/javascript"],
	{
		ignores: ["**/dist", "**/*.html"]
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
			],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true
				}
			]
		}
	},
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
		// Override or add rules here
		rules: {}
	}
]
