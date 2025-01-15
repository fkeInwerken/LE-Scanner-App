sap.ui.define(['./BaseController', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'], function (BaseController, JSONModel, MessageToast) {
  'use strict';

  return BaseController.extend('inw.le_scanner.controller.Main', {
    onInit: function () {
      const oViewModel = new JSONModel({
        istLagereinheitBarcode: '',
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

      this.aInputs.forEach(oInput => {
        oInput.focus(this.onInputFocus.bind(this));
    });

      //stop keyboard popup
      aInputs.forEach((oInput) => {
        oInput.addEventDelegate({
          onAfterRendering: () => {
            const oDomRef = oInput.getDomRef('inner');
            if (!oDomRef) return;
            oDomRef.setAttribute('inputmode', 'none');
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
          console.log(`Unhandled key: ${sKey}`);
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

    onInputSubmit: function (oEvent) {
      this.onKeyboardAction(oEvent);
    },

    onInputFocus: function (oEvent) {
      const oInput = oEvent.getSource();
      oInput._selectInputText();
    },

    onInputLiveChange: function (oEvent) {
      const DELAY = 300;
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
    requestBackendData: function () {
      const exampleData = {
        TANummer: '806187', 
        anzahlPositionen: 50, 
        istLagerplatzBarcode: 'B', 
      };
      this.getView().getModel('viewModel').setProperty('/TANummer', exampleData.TANummer); 
      this.getView().getModel('viewModel').setProperty('/anzahlPositionen', exampleData.anzahlPositionen); 
      this.getView().getModel('viewModel').setProperty('/istLagerplatzBarcode', exampleData.istLagerplatzBarcode); 
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

    onBuchenPress: function () {
      MessageToast.show('Erfolgreich gebucht!');
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
