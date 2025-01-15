sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,o){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",istLagerplatzBarcodeState:"None",istLagerplatzBarcodeStateText:"",sollLagereinheitBarcodeState:"None",sollLagereinheitBarcodeStateText:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const o=this.byId("istLagereinheitBarcode");const n=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const r=[o,n,s];this.aInputs=[o,n,s];r.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none");t.addEventListener("focus",e=>{this.onInputFocus(e)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const o=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(o);break;case"ArrowUp":this.onArrowUp(o);break;case"DPAD_DOWN":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;case"ArrowDown":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onIstLagereinheitSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");this.aInputs[o+1].focus();this.requestBackendData();if(s==="text"){this.triggerInputMode("istLagereinheitBarcode")}},onIstLagerplatzSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");this.aInputs[o+1].focus();if(s==="text"){this.triggerInputMode("istLagerplatzBarcode")}},onSollLagereinheitSubmit:function(e){const t=e.getSource();const o=this.byId("buchenButton");const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");if(s==="text"){this.triggerInputMode("sollLagereinheitBarcode")}this.aInputs[0].focus()},requestBackendData:function(){const e={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const t=this.getModel("viewModel");t.setProperty("/TANummer",e.TANummer);t.setProperty("/anzahlPositionen",e.anzahlPositionen);t.setProperty("/sollLagerplatzBarcode",e.sollLagerplatzBarcode)},onBuchenPress:function(){o.show("Erfolgreich gebucht!");const e=this.getModel("viewModel");e.setProperty("/istLagereinheitBarcode","");e.setProperty("/sollLagerplatzBarcode","");e.setProperty("/istLagerplatzBarcode","");e.setProperty("/sollLagereinheitBarcode","");e.setProperty("/TANummer","");e.setProperty("/anzahlPositionen","");e.setProperty("/istLagerplatzBarcodeState","None");e.setProperty("/istLagerplatzBarcodeStateText","");e.setProperty("/sollLagereinheitBarcodeState","None");e.setProperty("/sollLagereinheitBarcodeStateText","")},onInputFocus:function(e){const t=e.srcElement;t.setSelectionRange(0,t.value.length)},onIstLagerplatzChange:function(){const e=this.getView().getModel("viewModel");const t=e.getProperty("/istLagerplatzBarcode");const o=e.getProperty("/sollLagerplatzBarcode");const n=new Audio("sounds/success.mp3");const s=new Audio("sounds/warning.mp3");if(t===o){e.setProperty("/istLagerplatzBarcodeState","Success");e.setProperty("/istLagerplatzBarcodeStateText","Soll = Ist Nachlagerplatz");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");n.play()}else{e.setProperty("/istLagerplatzBarcodeState","Warning");e.setProperty("/istLagerplatzBarcodeStateText","Soll ≠ Ist Nachlagerplatz");s.play()}},onSollLagereinheitChange:function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");const o=e.getProperty("/sollLagereinheitBarcode");const n=new Audio("sounds/success.mp3");const s=new Audio("sounds/warning.mp3");if(t===o){e.setProperty("/sollLagereinheitBarcodeState","Success");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");n.play()}else{e.setProperty("/sollLagereinheitBarcodeState","Warning");e.setProperty("/sollLagereinheitBarcodeStateText","Soll ≠ Ist Lagereinheit");s.play()}},onIstLEKeyboardAction:function(){this.triggerInputMode("istLagereinheitBarcode")},onLPKeyboardAction:function(){this.triggerInputMode("istLagerplatzBarcode")},onSollLEKeyboardAction:function(){this.triggerInputMode("sollLagereinheitBarcode")},triggerInputMode:function(e){const t=this.byId(e);const o=t.getDomRef("inner");if(o){const e=o.getAttribute("inputmode");const n=e==="text"?"none":"text";o.setAttribute("inputmode",n);setTimeout(()=>{t.focus();o.select()},100)}},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},onResetApp:function(){location.reload()}})});
//# sourceMappingURL=Main.controller.js.map