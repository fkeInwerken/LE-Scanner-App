sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel",], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("inw.le_scanner.controller.Main", {
		onInit: function () {
			const oViewModel = new JSONModel({
				istLagereinheitBarcode:"",
				wechselLagerplatzBarcode:"",
				sollLagereinheitBarcode:"",
				TANummer: "",
				anzahlPositionen: "",
				Lagerplatz: "",
			});
			this.setModel(oViewModel, "viewModel");
		
			
		},
		onAfterRendering: function (){
			const oTANummer = this.byId("TANummer");
			const oAnzahlPositionen = this.byId("anzahlPositionen");
			const oLagerplatz = this.byId("Lagerplatz");
			   // Füge das Delegate hinzu, um nach dem Rendern den tabindex zu setzen
			   oTANummer.addEventDelegate;
			   oAnzahlPositionen.addEventDelegate;
			   oLagerplatz.addEventDelegate;
		},
		
	});
});
