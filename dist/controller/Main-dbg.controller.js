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
        istLagerplatzBarcodeState: 'None',
        istLagerplatzBarcodeStateText: '',
        sollLagereinheitBarcodeState: 'None',
        sollLagereinheitBarcodeStateText: '',
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
              this._lastFocusedInputId = oInput.getId();
            });
          },
        });
      });

      // Event Listener für Key Events hinzufügen
      document.addEventListener('keydown', this.onKeyDown.bind(this));

      // Audios
      this.successSound = new Audio('./sounds/success.mp3');
      this.warningSound = new Audio('./sounds/warning.mp3');
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
        case 'Escape':
          this.onP2();
          break;
        default:
        //   MessageToast.show("Key pressed: " + oEvent.key + " | KeyCode: " + oEvent.keyCode, {
        //     duration: 3000, // Optional: Wie lange der Toast angezeigt wird (in Millisekunden)
        //     my: "center center", // Positioniert den Toast in der Mitte des Bildschirms
        //     at: "center center", // Zeigt den Toast in der Mitte des Bildschirms
        //     of: window, // Definiert, dass der Toast im Fenster (browser) angezeigt wird
        //     offset: "0 0" // Verhindert eine Verschiebung
        // });
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
    onP2: function () {
      const oBuchenButton = this.byId('buchenButton');
      oBuchenButton.firePress();
      this.aInputs[0].focus();
    },

    onIstLagereinheitSubmit: function (oEvent) {
      const oInput = oEvent.getSource();
      const currentIndex = this.aInputs.indexOf(oInput);
      const oDomRef = oInput.getDomRef('inner');
      const currentInputMode = oDomRef.getAttribute('inputmode');

      this.aInputs[currentIndex + 1].focus();

      this.requestBackendData();

      if (currentInputMode === 'text') {
        this.onCallKeyboardAction();
      }
    },
    onIstLagerplatzSubmit: function (oEvent) {
      const oInput = oEvent.getSource();
      const currentIndex = this.aInputs.indexOf(oInput);
      const oDomRef = oInput.getDomRef('inner');
      const currentInputMode = oDomRef.getAttribute('inputmode');

      this.aInputs[currentIndex + 1].focus();

      if (currentInputMode === 'text') {
        this.onCallKeyboardAction();
      }
    },
    onSollLagereinheitSubmit: function (oEvent) {
      const oInput = oEvent.getSource();

      const oDomRef = oInput.getDomRef('inner');
      const currentInputMode = oDomRef.getAttribute('inputmode');

      if (currentInputMode === 'text') {
        this.onCallKeyboardAction();
      }
    },
    onCallKeyboardAction: function () {
      const currentIndex = this.aInputs.findIndex((input) => input.getId() === this._lastFocusedInputId);
      const previousInput = this.aInputs[currentIndex - 1].getId();
      this.onKeyboardAction(previousInput);
    },

    requestBackendData: function () {
      // hier getProperty viewModel istLagereinheitBarcode
      const exampleData = {
        TANummer: '390',
        anzahlPositionen: 3,
        sollLagerplatzBarcode: '101-02-B-1',
      };

      const oViewModel = this.getModel('viewModel');
      oViewModel.setProperty('/TANummer', exampleData.TANummer);
      oViewModel.setProperty('/anzahlPositionen', exampleData.anzahlPositionen);
      oViewModel.setProperty('/sollLagerplatzBarcode', exampleData.sollLagerplatzBarcode);
    },

    onBuchenPress: function () {
      // Validierung

      MessageToast.show('Erfolgreich gebucht!');

      // hier wird die Lagereinheit und Lagerplatz ins Backend geschickt

      // Model leeren und wieder ins erste Feld springen
      const oViewModel = this.getModel('viewModel');
      oViewModel.setProperty('/istLagereinheitBarcode', '');
      oViewModel.setProperty('/sollLagerplatzBarcode', '');
      oViewModel.setProperty('/istLagerplatzBarcode', '');
      oViewModel.setProperty('/sollLagereinheitBarcode', '');
      oViewModel.setProperty('/TANummer', '');
      oViewModel.setProperty('/anzahlPositionen', '');
      oViewModel.setProperty('/istLagerplatzBarcodeState', 'None');
      oViewModel.setProperty('/istLagerplatzBarcodeStateText', '');
      oViewModel.setProperty('/sollLagereinheitBarcodeState', 'None');
      oViewModel.setProperty('/sollLagereinheitBarcodeStateText', '');
    },

    onInputFocus: function (oEvent) {
      const oDomRef = oEvent.srcElement;
      oDomRef.setSelectionRange(0, oDomRef.value.length);
    },
    // onIstLagereinheitLiveChange: function () {
    //   this.switchInput("istLagereinheitBarcode");
    // },

    // onIstLagerplatzLiveChange: function () {
    //   this.switchInput("istLagerplatzBarcode");
    // },
    // onSollLagereinheitLiveChange: function () {
    //   this.switchInput("sollLagereinheitBarcode");
    // },

    // switchInput: function (sInputId) {

    //   const oInput = this.byId(sInputId);
    //   const oDomRef = oInput.getDomRef('inner');
    //   const DELAY = 500;
    //   let inputTimeout;

    //   const currentIndex = this.aInputs.indexOf(oInput);
    //   const currentInputMode = oDomRef.getAttribute('inputmode');

    //   if (currentInputMode === 'none') {
    //     clearTimeout(inputTimeout);
    //     inputTimeout = setTimeout(() => {
    //       if (this.aInputs[currentIndex + 1]) {
    //         this.aInputs[currentIndex + 1].focus();
    //       }
    //       if (currentIndex === 0 && this.aInputs[currentIndex + 1]) {
    //         this.requestBackendData();
    //       }
    //     }, DELAY);
    //   }
    // },
    onIstLagerplatzChange: function () {
      const oViewModel = this.getView().getModel('viewModel');
      const istLagerplatzBarcode = oViewModel.getProperty('/istLagerplatzBarcode');
      const sollLagerplatzBarcode = oViewModel.getProperty('/sollLagerplatzBarcode');

      if (istLagerplatzBarcode === sollLagerplatzBarcode) {
        oViewModel.setProperty('/istLagerplatzBarcodeState', 'Success');
        oViewModel.setProperty('/istLagerplatzBarcodeStateText', 'Soll = Ist Nachlagerplatz');
        oViewModel.setProperty('/sollLagereinheitBarcodeStateText', 'Soll = Ist Lagereinheit');
        this.successSound.play();
      } else {
        oViewModel.setProperty('/istLagerplatzBarcodeState', 'Warning');
        oViewModel.setProperty('/istLagerplatzBarcodeStateText', 'Soll ≠ Ist Nachlagerplatz');
        this.warningSound.play();
      }
    },
    onSollLagereinheitChange: function () {
      const oViewModel = this.getModel('viewModel');
      const istLagereinheitBarcode = oViewModel.getProperty('/istLagereinheitBarcode');
      const sollLagereinheitBarcode = oViewModel.getProperty('/sollLagereinheitBarcode');

      if (istLagereinheitBarcode === sollLagereinheitBarcode) {
        oViewModel.setProperty('/sollLagereinheitBarcodeState', 'Success');
        oViewModel.setProperty('/sollLagereinheitBarcodeStateText', 'Soll = Ist Lagereinheit');
        this.successSound.play();
      } else {
        oViewModel.setProperty('/sollLagereinheitBarcodeState', 'Warning');
        oViewModel.setProperty('/sollLagereinheitBarcodeStateText', 'Soll ≠ Ist Lagereinheit');
        this.warningSound.play();
      }
    },

    // onIstLEKeyboardAction: function () {
    //   this.triggerInputMode('istLagereinheitBarcode');
    // },
    // onLPKeyboardAction: function () {
    //   this.triggerInputMode('istLagerplatzBarcode');
    // },
    // onSollLEKeyboardAction: function () {
    //   this.triggerInputMode('sollLagereinheitBarcode');
    // },

    // triggerInputMode: function (sInputId) {
    //   const oInput = this.byId(sInputId);
    //   // Get the DOM reference of the input field
    //   const oDomRef = oInput.getDomRef('inner');

    //   // Select the text in the input field if the DOM element exists
    //   if (oDomRef) {
    //     const currentInputMode = oDomRef.getAttribute('inputmode');
    //     const newInputMode = currentInputMode === 'text' ? 'none' : 'text';
    //     oDomRef.setAttribute('inputmode', newInputMode);
    //     setTimeout(() => {
    //       oInput.focus();
    //       oDomRef.select();
    //     }, 100);
    //   }
    // },

    onKeyboardAction: function (inputId) {
      let focusedInputId = null;

      // Überprüfen, ob `inputId` gültig ist und zu einem Input-Feld gehört
      if (typeof inputId === 'string') {
        const oControl = this.byId(inputId);
        if (oControl && oControl.isA('sap.m.Input')) {
          focusedInputId = inputId;
        }
      }

      // Fallback zu `_lastFocusedInputId`, falls keine gültige ID übergeben wurde
      if (!focusedInputId) {
        focusedInputId = this._lastFocusedInputId;
      }

      const oInput = this.byId(focusedInputId);
      const oDomRef = oInput.getDomRef('inner');
      const oFocusInput = this.byId(this._lastFocusedInputId);
      const oFocusDomRef = oInput.getDomRef('inner');

      if (oDomRef) {
        // `inputmode` wechseln
        const currentInputMode = oDomRef.getAttribute('inputmode');
        const newInputMode = currentInputMode === 'text' ? 'none' : 'text';
        oDomRef.setAttribute('inputmode', newInputMode);

        // Fokus und Textauswahl
        setTimeout(() => {
          oFocusInput.focus();
          oFocusDomRef.select();
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
    },
    onResetApp: function () {
      // Simuliere F5-ähnliches Verhalten durch Laden der Seite neu
      location.reload();
    },
  });
});
