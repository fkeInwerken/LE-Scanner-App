sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",istLagereinheitBarcodeInputMode:"none",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const i=this.byId("sollLagereinheitBarcode");const s=[n,o,i];this.aInputs=[n,o,i];this.aInputs=[n,o,i];s.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;let n=this.getView().getModel("viewModel").getProperty("/istLagereinheitBarcodeInputMode");t.setAttribute("inputmode",n);t.addEventListener("keydown",e=>{n=this.getView().getModel("viewModel").getProperty("/istLagereinheitBarcodeInputMode");if(n!=="none")return;const t=e.key;const o=this.getView().getModel("viewModel").getProperty("/istLagereinheitBarcode");this.getView().getModel("viewModel").setProperty("/istLagereinheitBarcode",o+t)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const n=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"Enter":this.onEnter();break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"TRIGGER":case"ArrowLeft":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onEnter:function(){const e=this.byId("buchenButton");if(e){e.firePress()}},onFocus:async function(e){const t=e.srcControl;const n=t.getDomRef("inner");if(n){n.select()}},onKeyboardAction:function(e){const t=e.getSource();const n=t.getDomRef("inner");if(n){const e=this.getView().getModel("viewModel").getProperty("/istLagereinheitBarcodeInputMode");if(e==="none")this.getView().getModel("viewModel").setProperty("/istLagereinheitBarcodeInputMode","text");if(e==="text")this.getView().getModel("viewModel").setProperty("/istLagereinheitBarcodeInputMode","none");n.setAttribute("inputmode",this.getView().getModel("viewModel").getProperty("/istLagereinheitBarcodeInputMode"));t.focus()}},onBuchenPress:function(){sap.m.MessageToast.show("Erfolgreich gebucht!",{width:"15em",my:"center center",at:"center center"})},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},_handleInputChange:function(e){const t=this.aInputs[e];if(t.getValue()){const t=this.aInputs[e+1];if(t){t.focus()}}}})});
//# sourceMappingURL=Main.controller.js.map