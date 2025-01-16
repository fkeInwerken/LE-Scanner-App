sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",istLagerplatzBarcodeState:"None",istLagerplatzBarcodeStateText:"",sollLagereinheitBarcodeState:"None",sollLagereinheitBarcodeStateText:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const r=[n,o,s];this.aInputs=[n,o,s];r.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none");t.addEventListener("focus",e=>{this.onInputFocus(e)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const n=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"P2":this.onP2();break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onP2:function(){const e=this.byId("buchenButton");e.firePress()},onIstLagereinheitSubmit:function(e){const t=e.getSource();const n=this.aInputs.indexOf(t);const o=t.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();this.requestBackendData();if(s==="text"){this.triggerInputMode("istLagereinheitBarcode")}},onIstLagerplatzSubmit:function(e){const t=e.getSource();const n=this.aInputs.indexOf(t);const o=t.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();if(s==="text"){this.triggerInputMode("istLagerplatzBarcode")}},onSollLagereinheitSubmit:function(e){const t=e.getSource();const n=t.getDomRef("inner");const o=n.getAttribute("inputmode");if(o==="text"){this.triggerInputMode("sollLagereinheitBarcode")}this.aInputs[0].focus()},requestBackendData:function(){const e={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const t=this.getModel("viewModel");t.setProperty("/TANummer",e.TANummer);t.setProperty("/anzahlPositionen",e.anzahlPositionen);t.setProperty("/sollLagerplatzBarcode",e.sollLagerplatzBarcode)},onBuchenPress:function(){n.show("Erfolgreich gebucht!");const e=this.getModel("viewModel");e.setProperty("/istLagereinheitBarcode","");e.setProperty("/sollLagerplatzBarcode","");e.setProperty("/istLagerplatzBarcode","");e.setProperty("/sollLagereinheitBarcode","");e.setProperty("/TANummer","");e.setProperty("/anzahlPositionen","");e.setProperty("/istLagerplatzBarcodeState","None");e.setProperty("/istLagerplatzBarcodeStateText","");e.setProperty("/sollLagereinheitBarcodeState","None");e.setProperty("/sollLagereinheitBarcodeStateText","")},onInputFocus:function(e){const t=e.srcElement;t.setSelectionRange(0,t.value.length)},onIstLagerplatzChange:function(){const e=this.getView().getModel("viewModel");const t=e.getProperty("/istLagerplatzBarcode");const n=e.getProperty("/sollLagerplatzBarcode");const o=new Audio("inw.le_scanner/resources/sounds/success.mp3");const s=new Audio("inw.le_scanner/resources/sounds/warning.mp3");if(t===n){e.setProperty("/istLagerplatzBarcodeState","Success");e.setProperty("/istLagerplatzBarcodeStateText","Soll = Ist Nachlagerplatz");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");o.addEventListener("canplaythrough",function(){o.play()})}else{e.setProperty("/istLagerplatzBarcodeState","Warning");e.setProperty("/istLagerplatzBarcodeStateText","Soll ≠ Ist Nachlagerplatz");s.addEventListener("canplaythrough",function(){s.play()})}},onSollLagereinheitChange:function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");const n=e.getProperty("/sollLagereinheitBarcode");const o=new Audio("inw.le_scanner/resources/sounds/success.mp3");const s=new Audio("inw.le_scanner/resources/sounds/warning.mp3");if(t===n){e.setProperty("/sollLagereinheitBarcodeState","Success");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");o.addEventListener("canplaythrough",function(){o.play()})}else{e.setProperty("/sollLagereinheitBarcodeState","Warning");e.setProperty("/sollLagereinheitBarcodeStateText","Soll ≠ Ist Lagereinheit");s.addEventListener("canplaythrough",function(){s.play()})}},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},onResetApp:function(){location.reload()}})});
//# sourceMappingURL=Main.controller.js.map