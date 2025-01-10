sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: inw.le_scanner",
		defaults: {
			page: "ui5://test-resources/inw/le_scanner/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "inw/le_scanner/",
				never: "test-resources/inw/le_scanner/"
			},
			loader: {
				paths: {
					"inw/le_scanner": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for inw.le_scanner"
			},
			"integration/opaTests": {
				title: "Integration tests for inw.le_scanner"
			}
		}
	};
});
