sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,o){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",istLagerplatzBarcodeState:"None",istLagerplatzBarcodeStateText:"",sollLagereinheitBarcodeState:"None",sollLagereinheitBarcodeStateText:"",istLagereinheitBarcodeState:"None",istLagereinheitBarcodeStateText:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const o=this.byId("istLagereinheitBarcode");const n=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const r=[o,n,s];this.aInputs=[o,n,s];r.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none");t.addEventListener("focus",t=>{this.onInputFocus(t);this._lastFocusedInputId=e.getId()})}})});document.addEventListener("keydown",this.onKeyDown.bind(this));this.successSound=new Audio("./sounds/success.mp3");this.warningSound=new Audio("./sounds/warning.mp3");this.errorSound=new Audio("./sounds/error.mp3");this.firstsubmit=false},onKeyDown:function(e){const t=e.key;const o=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(o);break;case"ArrowUp":this.onArrowUp(o);break;case"DPAD_DOWN":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;case"ArrowDown":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onIstLagereinheitSubmit:async function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");if(s==="text"){this.onKeyboardAction("istLagereinheitBarcode")}await this.requestBackendData();if(t.getValue()){this.aInputs[o+1].focus()}},onIstLagerplatzSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");if(s==="text"){this.onKeyboardAction("istLagerplatzBarcode")}this.aInputs[o+1].focus()},onSollLagereinheitSubmit:function(e){const t=e.getSource();const o=t.getDomRef("inner");const n=o.getAttribute("inputmode");if(n==="text"){this.onKeyboardAction("sollLagereinheitBarcode")}if(this.firstsubmit){const e=this.byId("buchenButton");e.firePress();this.aInputs[0].focus();this.firstsubmit=false}else{this.firstsubmit=true}},requestBackendData:async function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");if(t){const o=t.padStart(20,"0");const n=this.getOwnerComponent().getModel();const s="/LE_TRANSPORTSet";const r=[new sap.ui.model.Filter("Lenum",sap.ui.model.FilterOperator.EQ,o)];await n.read(s,{filters:r,success:t=>{if(t.results[0]){e.setProperty("/TANummer",t.results[0].Btanr);e.setProperty("/anzahlPositionen",t.results[0].Btaps);e.setProperty("/sollLagerplatzBarcode",t.results[0].Lgpla);e.setProperty("/istLagereinheitBarcodeState","None");e.setProperty("/istLagereinheitBarcodeStateText","")}},error:()=>{e.setProperty("/istLagereinheitBarcodeState","Error");e.setProperty("/istLagereinheitBarcodeStateText","Lagereinheit nicht gefunden.");e.setProperty("/istLagereinheitBarcode","");this.errorSound.play()}})}},onBuchenPress:function(){o.show("Erfolgreich gebucht!");const e=this.getModel("viewModel");e.setProperty("/istLagereinheitBarcode","");e.setProperty("/sollLagerplatzBarcode","");e.setProperty("/istLagerplatzBarcode","");e.setProperty("/sollLagereinheitBarcode","");e.setProperty("/TANummer","");e.setProperty("/anzahlPositionen","");e.setProperty("/istLagerplatzBarcodeState","None");e.setProperty("/istLagerplatzBarcodeStateText","");e.setProperty("/sollLagereinheitBarcodeState","None");e.setProperty("/sollLagereinheitBarcodeStateText","");e.setProperty("/istLagereinheitBarcodeState","None");e.setProperty("/istLagereinheitBarcodeStateText","");this.successSound.play()},onInputFocus:function(e){const t=e.srcElement;t.setSelectionRange(0,t.value.length)},onIstLagerplatzChange:function(){const e=this.getView().getModel("viewModel");const t=e.getProperty("/istLagerplatzBarcode");const o=e.getProperty("/sollLagerplatzBarcode");if(t===o){e.setProperty("/istLagerplatzBarcodeState","Success");e.setProperty("/istLagerplatzBarcodeStateText","Soll = Ist Nachlagerplatz")}else{e.setProperty("/istLagerplatzBarcodeState","Warning");e.setProperty("/istLagerplatzBarcodeStateText","Soll ≠ Ist Nachlagerplatz");this.warningSound.play()}},onSollLagereinheitChange:function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");const o=e.getProperty("/sollLagereinheitBarcode");if(t===o){e.setProperty("/sollLagereinheitBarcodeState","Success");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit")}else{e.setProperty("/sollLagereinheitBarcodeState","Warning");e.setProperty("/sollLagereinheitBarcodeStateText","Soll ≠ Ist Lagereinheit");this.warningSound.play()}},onKeyboardAction:function(e){let t=null;if(typeof e==="string"){t=e}if(!t){t=this._lastFocusedInputId}const o=this.byId(t);const n=o.getDomRef("inner");if(n){const e=n.getAttribute("inputmode");const t=e==="text"?"none":"text";n.setAttribute("inputmode",t);if(t==="text"){setTimeout(()=>{o.focus();n.select()},100)}}},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},onResetApp:function(){location.reload()}})});
//# sourceMappingURL=Main.controller.js.map