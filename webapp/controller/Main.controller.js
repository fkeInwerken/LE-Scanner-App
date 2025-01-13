sap.ui.define(
	["./BaseController", "sap/ui/model/json/JSONModel"],
	function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("inw.le_scanner.controller.Main", {
			onInit: function () {
				const oViewModel = new JSONModel({
					istLagereinheitBarcode: "",
					istLagerplatzBarcode: "",
					sollLagereinheitBarcode: "",
					TANummer: "",
					anzahlPositionen: "",
				});
				this.setModel(oViewModel, "viewModel");

				//focus select
				const oInputIst = this.byId("istLagereinheitBarcode");
				const oInputWechsel = this.byId("istLagerplatzBarcode");
				const oInputSoll = this.byId("sollLagereinheitBarcode");

				const aInputs = [oInputIst, oInputWechsel, oInputSoll];

				aInputs.forEach((oInput) => {
					oInput.addEventDelegate({
						onfocusin: this.onFocus.bind(this),
						onfocusout: this.onFocusOut.bind(this),
					});
				});

				// stop keyboard popup
				aInputs.forEach((oInput) => {
					oInput.addEventDelegate({
						onAfterRendering: function () {
							const oDomRef = oInput.getDomRef();
							if (oDomRef) {
								oDomRef.setAttribute("inputmode", "none");
							}
						},
					});
				});

				// Event Listener für Key Events hinzufügen
				document.addEventListener("keydown", this.onKeyDown.bind(this));
			},

			onAfterRendering: function () {},

			onKeyDown: function (oEvent) { 
				const sKey = oEvent.key;

				switch (sKey) {
					case "ArrowUp":
					  console.log("Arrow Up pressed");
					  this.handleArrowUp();
					  break;
			
					case "ArrowDown":
					  console.log("Arrow Down pressed");
					  this.handleArrowDown();
					  break;
			
					case "ArrowLeft":
					  console.log("Arrow Left pressed");
					  this.handleArrowLeft();
					  break;
			
					case "ArrowRight":
					  console.log("Arrow Right pressed");
					  this.handleArrowRight();
					  break;
			
					case "Enter": // Der Button wird oft als "Enter" registriert
					  console.log("Enter pressed");
					  this.handleEnter();
					  break;
					  
					  default:
						console.log(`Unhandled key: ${sKey}`);
					}
			},

			onFocus: function (oEvent) {
				// Get the source control of the focus event
				const oInput = oEvent.srcControl;

				// Get the DOM reference of the input field
				const oDomRef = oInput.getDomRef("inner");

				// Select the text in the input field if the DOM element exists
				if (oDomRef) {
					oDomRef.select();
				}
			},
			onFocusOut: function (oEvent) {
				/*	const oInput = oEvent.getSource();

				// Deactivate virtual keyboard 
				oInput.addEventDelegate({
					onAfterRendering: function () {
						const oDomRef = oInput.getDomRef();
						if (oDomRef) {
							oDomRef.setAttribute("inputmode", "none");
						}
					}
				});
				*/
			},

			onKeyboardAction: function (oEvent) {
				const oInput = oEvent.getSource();

				// Activate virtual keyboard
				oInput.addEventDelegate({
					onAfterRendering: function () {
						const oDomRef = oInput.getDomRef();
						if (oDomRef) {
							oDomRef.setAttribute("inputmode", "text");
						}
					},
				});
				oInput.focus();
			},
		});
	}
);
