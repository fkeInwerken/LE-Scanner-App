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
					});
				});

				// for keydown events
				this.aInputs = [oInputIst, oInputWechsel, oInputSoll];

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

				// check current Inputfield
				const iCurrentIndex = this._getFocusedInputIndex();

				switch (sKey) {
					case "DPAD_UP":
						this.onArrowUp(iCurrentIndex);
						break;
					case "ArrowUp":
						this.onArrowUp(iCurrentIndex);
						break;
					case "DPAD_DOWN":
						if (iCurrentIndex === -1) {
							this.aInputs[0].focus();
							return;
						}
						this.onArrowDown(iCurrentIndex);
						break;
					case "ArrowDown":
						if (iCurrentIndex === -1) {
							this.aInputs[0].focus();
							return;
						}
						this.onArrowDown(iCurrentIndex);
						break;
					case "DPAD_LEFT":
						this.onArrowLeft();
						break;
					case "DPAD_RIGHT":
						this.onArrowRight();
						break;
					case "ENTER":
						this.onEnter();
						break;
					case "TRIGGER":
						this.onTrigger();
						break;
					case "P1":
						this.onP1();
						break;
					case "P2":
						this.onP2();
						break;
					default:
						console.log(`Unhandled key: ${sKey}`);
				}
			},

			onArrowUp: function (iCurrentIndex) {
				if (iCurrentIndex > 0) {
					this.aInputs[iCurrentIndex - 1].focus();
				}
			},

			onArrowDown: function (iCurrentIndex) {
				if (iCurrentIndex < this.aInputs.length - 1) {
					this.aInputs[iCurrentIndex + 1].focus();
				}
			},

			onEnter: function () {
				const oBuchenButton = this.byId("buchenButton");
				if (oBuchenButton) {
					oBuchenButton.firePress();
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

			_getFocusedInputIndex: function () {
				// get Element ID
				const sFocusedElementId = document.activeElement.id;

				// Check Position of Element in Input Array
				return this.aInputs.findIndex(
					(oInput) => oInput.getId() === sFocusedElementId
				);
			},
		});
	}
);
