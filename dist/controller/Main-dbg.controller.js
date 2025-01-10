sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/m/MessageToast",], function (BaseController, MessageBox, MessageToast) {
	"use strict";

	return BaseController.extend("inw.le_scanner.controller.Main", {
		onInit: function () {
			
		
			
		},
		onAfterRendering: function (){
			const oTANummer = this.byId("TANummer");
			const oAnzahlPositionen = this.byId("anzahlPositionen");
			const oLagerplatz = this.byId("Lagerplatz");
			   // Füge das Delegate hinzu, um nach dem Rendern den tabindex zu setzen
			   this._setTabIndexAfterRendering(oTANummer);
			   this._setTabIndexAfterRendering(oAnzahlPositionen);
			   this._setTabIndexAfterRendering(oLagerplatz);
		},
		_setTabIndexAfterRendering: function(oControl) {
			oControl.addEventDelegate({
				onAfterRendering: function () {
					// Setze tabindex auf -1, damit das Element von der Tabulator-Navigation ausgeschlossen wird
					oControl.getDomRef().setAttribute("tabindex", -1);
				}
			});
		},

		 // Handler for "istLagereinheitBarcode"
		 onistLagereinheitBarcodeSuccess: function (oEvent) {
			const sScannedValue = oEvent.getParameter("text"); // Gescannter Wert auslesen
			if (sScannedValue) {
				// Scannerdaten ins Model schreiben
				

				// Daten aus Backend holen/nehmen


				// Felder beschreiben
			}
        },
    
        
        // Handler for "wechselLagerplatzBarcode"
        onwechselLagerplatBarcodeSuccess: function (oEvent) {
			const sScannedValue = oEvent.getParameter("text"); // Gescannter Wert auslesen
			if (sScannedValue) {
				// Scannerdaten ins Model schreiben
				

			}

        },
       
        // Handler for "sollLagereinheitBarcode"
        onsollLagereinheitBarcodeSuccess: function (oEvent) {
			const sScannedValue = oEvent.getParameter("text"); // Gescannter Wert auslesen
			if (sScannedValue) {
				// Scannerdaten ins Model schreiben


			}
        },
		onBarcodeError: function () {
			MessageToast.show("Scan fehlgeschlagen. Bitte erneut versuchen.");
        },
        onBarcodeLiveupdate: function () {},

	});
});
