const nxPreset = require("@nx/jest/preset").default

module.exports = {
	...nxPreset,
	collectCoverage: true,
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	}
}
