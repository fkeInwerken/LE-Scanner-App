sap.ui.define(['./BaseController', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'], function (BaseController, JSONModel, MessageToast) {
  'use strict';

  return BaseController.extend('inw.le_scanner.controller.Main', {
    onInit: function () {
      const oViewModel = new JSONModel({
        istLagereinheitBarcode: '',
        istLagereinheitBarcodeEnabled: false,
        istLagerplatzBarcode: '',
        sollLagereinheitBarcode: '',
        TANummer: '',
        anzahlPositionen: '',
        appVersion: this.getOwnerComponent().getManifestEntry('sap.app').applicationVersion.version,
      });
      this.setModel(oViewModel, 'viewModel');

      //focus select
      const oInputIst = this.byId('istLagereinheitBarcode');
      const oInputWechsel = this.byId('istLagerplatzBarcode');
      const oInputSoll = this.byId('sollLagereinheitBarcode');

      const aInputs = [oInputIst, oInputWechsel, oInputSoll];

      // for keydown events
      this.aInputs = [oInputIst, oInputWechsel, oInputSoll];

      // // for keydown events
      this.aInputs = [oInputIst, oInputWechsel, oInputSoll];

      // aInputs.forEach((oInput) => {
      // 	oInput.addEventDelegate({
      // 		onfocusin: this.onFocus.bind(this),
      // 	});
      // });

      // Input Change
      // this.aInputs.forEach((oInput, iIndex) => {
      // 	oInput.attachLiveChange(() => this._handleInputChange(iIndex));
      // });

      //stop keyboard popup
      aInputs.forEach((oInput) => {
        oInput.addEventDelegate({
          onAfterRendering: () => {
            const oDomRef = oInput.getDomRef('inner');
            if (!oDomRef) return;

			oDomRef.addEventListener('keydown', (oEvent) => {
				if (this.getView().getModel('viewModel').getProperty('/istLagereinheitBarcodeEnabled')) return;
				let sKey = oEvent.key;
			  
				// Fallback auf keyCode, falls key "unidentified" ist
				if (sKey === "Unidentified") {
				  const keyCode = oEvent.keyCode || oEvent.code;
				  sKey = String.fromCharCode(keyCode);  // Versuche, den keyCode in ein Zeichen umzuwandeln
				  if (keyCode === 13) {  // Wenn Enter gedrückt wurde
					sKey = "Enter";
				  }
				}
			  
				// Ausgabe von Debugging-Informationen
				console.log("Gedrückte Taste: ", sKey);
			  
				const sText = this.getView().getModel('viewModel').getProperty('/istLagereinheitBarcode');
				this.getView()
				  .getModel('viewModel')
				  .setProperty('/istLagereinheitBarcode', sText + sKey);
			  });
			  
            // oDomRef.addEventListener('keydown', (oEvent) => {
            //   if (this.getView().getModel('viewModel').getProperty('/istLagereinheitBarcodeEnabled')) return;

            //   const sKey = oEvent.key;

            //   // Verhindere, dass Sondertasten wie Enter oder Tab die Eingabe stören
            //   if (oEvent.key === 'Enter' || oEvent.key === 'Tab') {
            //     return;
            //   }

            //   // Ausgabe von Debugging-Informationen
            //   MessageToast.show('Gedrückte Taste: ' + sKey);

            //   const sText = this.getView().getModel('viewModel').getProperty('/istLagereinheitBarcode');

            //   // Text aktualisieren, indem das neue Zeichen hinzugefügt wird
            //   this.getView()
            //     .getModel('viewModel')
            //     .setProperty('/istLagereinheitBarcode', sText + sKey);
            // });
          },
        });
      });

      // Event Listener für Key Events hinzufügen
      document.addEventListener('keydown', this.onKeyDown.bind(this));
    },

    onKeyDown: function (oEvent) {
      const sKey = oEvent.key;

      // check current Inputfield
      const iCurrentIndex = this._getFocusedInputIndex();

      switch (sKey) {
        case 'DPAD_UP':
          this.onArrowUp(iCurrentIndex);
          break;
        case 'ArrowUp':
          this.onArrowUp(iCurrentIndex);
          break;
        case 'DPAD_DOWN':
          if (iCurrentIndex === -1) {
            this.aInputs[0].focus();
            return;
          }
          this.onArrowDown(iCurrentIndex);
          break;
        case 'ArrowDown':
          if (iCurrentIndex === -1) {
            this.aInputs[0].focus();
            return;
          }
          this.onArrowDown(iCurrentIndex);
          break;
        case 'Enter':
          this.onEnter();
          break;
        case 'DPAD_LEFT':
          this.onArrowLeft();
          break;
        case 'DPAD_RIGHT':
          this.onArrowRight();
          break;
        case 'TRIGGER':
        case 'ArrowLeft':
          this.onTrigger();
          break;
        case 'P1':
          this.onP1();
          break;
        case 'P2':
          this.onP2();
          break;
        default:
        // console.log(`Unhandled key: ${sKey}`);
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
      const oBuchenButton = this.byId('buchenButton');
      if (oBuchenButton) {
        oBuchenButton.firePress();
      }
    },

    // onFocus: async function (oEvent) {
    //   // Get the source control of the focus event
    //   const oInput = oEvent.srcControl;

    //   // Get the DOM reference of the input field
    //   const oDomRef = oInput.getDomRef('inner');

    //   // Select the text in the input field if the DOM element exists
    //   if (oDomRef) {
    //     oDomRef.select();
    //   }
    // },

    onKeyboardAction: function () {
      const oInput = this.byId('istLagereinheitBarcode');

      const sInputEnabled = this.getView().getModel('viewModel').getProperty('/istLagereinheitBarcodeEnabled');
      this.getView().getModel('viewModel').setProperty('/istLagereinheitBarcodeEnabled', !sInputEnabled);
      setTimeout(() => {
        oInput.focus();
        // Get the DOM reference of the input field
        const oDomRef = oInput.getDomRef('inner');

        // Select the text in the input field if the DOM element exists
        if (oDomRef) {
          oDomRef.select();
        }
      }, 100);
    },

    onBuchenPress: function () {
      sap.m.MessageToast.show('Erfolgreich gebucht!', {
        width: '15em',
        my: 'center center',
        at: 'center center',
      });
    },

    _getFocusedInputIndex: function () {
      // get Element ID
      const sFocusedElementId = document.activeElement.id;

      return this.aInputs.findIndex((oInput) => oInput.getId() === sFocusedElementId.replace(/-inner$/, ''));
    },

    _selectInputText: function (oInput) {
      // wait for Dom-Element
      setTimeout(() => {
        const oDomRef = oInput.getDomRef('inner');
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
});
