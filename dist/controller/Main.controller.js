sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(t,e,n){"use strict";return t.extend("inw.le_scanner.controller.Main",{onInit:function(){const t=new e({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(t,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];this.aInputs=[n,o,s];i.forEach(t=>{t.addEventDelegate({onAfterRendering:()=>{const e=t.getDomRef("inner");if(!e)return;e.setAttribute("inputmode","none");e.addEventListener("focus",t=>{this.onInputFocus(t)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(t){const e=t.key;const n=this._getFocusedInputIndex();switch(e){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;default:}},onArrowUp:function(t){if(t>0){const e=this.aInputs[t-1];e.focus();this._selectInputText(e)}},onArrowDown:function(t){if(t<this.aInputs.length-1){const e=this.aInputs[t+1];e.focus();this._selectInputText(e)}},onIstLagereinheitSubmit:function(t){const e=t.getSource();const n=this.aInputs.indexOf(e);const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();this.requestBackendData();if(s==="text"){this.byId("palletButton").press()}},onIstLagerplatzSubmit:function(t){const e=t.getSource();const n=this.aInputs.indexOf(e);const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();if(s==="text"){this.byId("lagerButton").press()}},onSollLagereinheitSubmit:function(t){const e=t.getSource();const n=this.byId("buchenButton");const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");if(s==="text"){this.byId("einheitButton").press()}n.firePress();this.aInputs[0].focus()},requestBackendData:function(){const t={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const e=this.getModel("viewModel");e.setProperty("/TANummer",t.TANummer);e.setProperty("/anzahlPositionen",t.anzahlPositionen);e.setProperty("/sollLagerplatzBarcode",t.sollLagerplatzBarcode)},onBuchenPress:function(){n.show("Erfolgreich gebucht!");const t=this.getModel("viewModel");t.setProperty("/istLagereinheitBarcode","");t.setProperty("/sollLagerplatzBarcode","");t.setProperty("/istLagerplatzBarcode","");t.setProperty("/sollLagereinheitBarcode","");t.setProperty("/TANummer","");t.setProperty("/anzahlPositionen","")},onInputFocus:function(t){const e=t.srcElement;e.setSelectionRange(0,e.value.length)},onInputLiveChange:function(t){const e=1e3;let n;const o=t.getSource();const s=this.aInputs.indexOf(o);const i=o.getDomRef("inner");const r=i.getAttribute("inputmode");if(r==="none"){clearTimeout(n);n=setTimeout(()=>{if(this.aInputs[s+1]){this.aInputs[s+1].focus()}if(s===0&&this.aInputs[s+1]){this.requestBackendData()}},e)}},onKeyboardAction:function(t){const e=t.getSource();const n=e.getId().split("--").pop();const o={palletButton:"istLagereinheitBarcode",lagerButton:"istLagerplatzBarcode",einheitButton:"sollLagereinheitBarcode"};const s=o[n];const i=this.byId(s);const r=i.getDomRef("inner");if(r){const t=r.getAttribute("inputmode");const e=t==="text"?"none":"text";r.setAttribute("inputmode",e);setTimeout(()=>{i.focus();r.select()},100)}},_getFocusedInputIndex:function(){const t=document.activeElement.id;return this.aInputs.findIndex(e=>e.getId()===t.replace(/-inner$/,""))},_selectInputText:function(t){setTimeout(()=>{const e=t.getDomRef("inner");if(e){e.setSelectionRange(0,e.value.length)}},0)}})});
//# sourceMappingURL=Main.controller.js.map