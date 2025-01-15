sap.ui.define(['./BaseController', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'], function (BaseController, JSONModel, MessageToast) {
  'use strict';

  return BaseController.extend('inw.le_scanner.controller.Main', {
    onInit: function () {
      const oViewModel = new JSONModel({
        istLagereinheitBarcode: '',
        sollLagerplatzBarcode: '',
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

      this.aInputs = [oInputIst, oInputWechsel, oInputSoll];

      //stop keyboard popup
      aInputs.forEach((oInput) => {
        oInput.addEventDelegate({
          onAfterRendering: () => {
            const oDomRef = oInput.getDomRef('inner');
            if (!oDomRef) return;
            oDomRef.setAttribute('inputmode', 'none');
            oDomRef.addEventListener('focus', (event) => {
              this.onInputFocus(event);
            });
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

    onIstLagereinheitSubmit: function (oEvent) {
      const oInput = oEvent.getSource();
      const currentIndex = this.aInputs.indexOf(oInput);
      this.aInputs[currentIndex + 1].focus();
      this.requestBackendData();
    },
    onIstLagerplatzSubmit: function (oEvent) {
      const oInput = oEvent.getSource();
      const currentIndex = this.aInputs.indexOf(oInput);
      this.aInputs[currentIndex + 1].focus();
    },
    onSollLagereinheitSubmit: function () {
      const oBuchenButton = this.byId('buchenButton');
      oBuchenButton.firePress();
    },

    requestBackendData: function () {
      // hier getProperty viewModel istLagereinheitBarcode
      const exampleData = {
        TANummer: '390',
        anzahlPositionen: 3,
        sollLagerplatzBarcode: '101-02-B-1',
      };
      this.getView().getModel('viewModel').setProperty('/TANummer', exampleData.TANummer);
      this.getView().getModel('viewModel').setProperty('/anzahlPositionen', exampleData.anzahlPositionen);
      this.getView().getModel('viewModel').setProperty('/sollLagerplatzBarcode', exampleData.sollLagerplatzBarcode);
    },

    onBuchenPress: function () {
      // Validierung

      MessageToast.show('Erfolgreich gebucht!');

      // hier wird die Lagereinheit und Lagerplatz ins Backend geschickt
    },

    onInputFocus: function (oEvent) {
      const oDomRef = oEvent.srcElement;
      oDomRef.setSelectionRange(0, oDomRef.value.length);
    },

    onInputLiveChange: function (oEvent) {
      const DELAY = 1000;
      let inputTimeout;
      const oInput = oEvent.getSource();
      const currentIndex = this.aInputs.indexOf(oInput);

      const oDomRef = oInput.getDomRef('inner');

      const currentInputMode = oDomRef.getAttribute('inputmode');

      if (currentInputMode === 'none') {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
          if (this.aInputs[currentIndex + 1]) {
            this.aInputs[currentIndex + 1].focus();
          }
          if (currentIndex === 0 && this.aInputs[currentIndex + 1]) {
            this.requestBackendData();
          }
        }, DELAY);
      }
    },
   
    onKeyboardAction: function (oEvent) {
      const oButton = oEvent.getSource();
      const buttonId = oButton.getId().split('--').pop();

      const inputMap = {
        palletButton: 'istLagereinheitBarcode',
        lagerButton: 'istLagerplatzBarcode',
        einheitButton: 'sollLagereinheitBarcode',
      };

      const inputId = inputMap[buttonId];

      const oInput = this.byId(inputId);
      // Get the DOM reference of the input field
      const oDomRef = oInput.getDomRef('inner');

      // Select the text in the input field if the DOM element exists
      if (oDomRef) {
        const currentInputMode = oDomRef.getAttribute('inputmode');
        const newInputMode = currentInputMode === 'text' ? 'none' : 'text';
        oDomRef.setAttribute('inputmode', newInputMode);
        setTimeout(() => {
          oInput.focus();
          oDomRef.select();
        }, 100);
      }
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
    }
  });
});
