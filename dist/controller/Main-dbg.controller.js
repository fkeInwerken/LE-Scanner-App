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
					appVersion:
						this.getOwnerComponent().getManifestEntry("sap.app")
							.applicationVersion.version,
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

				// Input Change
				this.aInputs.forEach((oInput, iIndex) => {
					oInput.attachLiveChange(() => this._handleInputChange(iIndex));
				});

				// stop keyboard popup
				aInputs.forEach((oInput) => {
					oInput.addEventDelegate({
						onAfterRendering: function () {
							const oDomRef = oInput.getDomRef("inner");
							if (oDomRef) {
							//			oDomRef.setAttribute("inputmode", "none");
							}
						},
					});
				});

				// Event Listener für Key Events hinzufügen
				document.addEventListener("keydown", this.onKeyDown.bind(this));

				
				document.addEventListener("focus", function (event) {
					if (event.target.tagName === "INPUT") {
					  event.target.setAttribute("inputmode", "none");
					}
				  }, true);
			},

	

			onKeyDown: function (oEvent) {
				// const barcodeRegex = /^(?:[\x00-\x7F]|([0-9]{2}))*$/;
				// const sFocusedElementId = document.activeElement.id;
				// const sControlId = sFocusedElementId.replace(/-inner$/, "");

				const sKey = oEvent.key;

				// if (barcodeRegex.test(sKey)) {
				// 	const oInput = this.byId(sControlId);
				// 	oInput.setValue(oInput.getValue() + sKey);
				// }

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
					case "\r":
					case "\n":
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
				}
			},

			onArrowUp: function (iCurrentIndex) {
				if (iCurrentIndex > 0) {
					const oPreviousInput = this.aInputs[iCurrentIndex - 1];
					oPreviousInput.focus();
					this._selectInputText(oPreviousInput);
				}
			},

			onArrowDown: function (iCurrentIndex) {
				if (iCurrentIndex < this.aInputs.length - 1) {
					const oNextInput = this.aInputs[iCurrentIndex + 1];
					oNextInput.focus();
					this._selectInputText(oNextInput);
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
							oDomRef.setAttribute("inputmode", "text");
				}
			},

			onKeyboardAction: function (oEvent) {
				const oInput = oEvent.getSource();

				const oDomRef = oInput.getDomRef("inner");
				if (oDomRef) {
					//	oDomRef.setAttribute("inputmode", "text");
					oInput.focus();
					//	oDomRef.setAttribute("inputmode", "none");
				}
			},

			onBuchenPress: function () {
				sap.m.MessageToast.show("Erfolgreich gebucht!", {
					width: "15em",
					my: "center center",
					at: "center center",
				});
			},

			_getFocusedInputIndex: function () {
				// get Element ID
				const sFocusedElementId = document.activeElement.id;

				const sControlId = sFocusedElementId.replace(/-inner$/, "");

				return this.aInputs.findIndex(
					(oInput) => oInput.getId() === sControlId
				);
			},

			_selectInputText: function (oInput) {
				// wait for Dom-Element
				setTimeout(() => {
					const oDomRef = oInput.getDomRef("inner");
					if (oDomRef) {
						oDomRef.setSelectionRange(0, oDomRef.value.length);
					}
				}, 0);
			},

			_handleInputChange: function (iCurrentIndex) {
				const oCurrentInput = this.aInputs[iCurrentIndex];

				if (oCurrentInput.getValue()) {
					const oNextInput = this.aInputs[iCurrentIndex + 1];
					if (oNextInput) {
						oNextInput.focus();
					}
				}
			},
		});
	}
);
