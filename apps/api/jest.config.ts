export default {
	displayName: "api",
	preset: "../../jest.preset.js",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }]
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/apps/api",
	collectCoverageFrom: ["src/**/*.{!(module|config|dto|model),}.(t|j)s", "!**/node_modules/**", "!**/vendor/**"]
}
