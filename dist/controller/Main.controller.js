sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(t,e,n){"use strict";return t.extend("inw.le_scanner.controller.Main",{onInit:function(){const t=new e({istLagereinheitBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(t,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];this.aInputs=[n,o,s];i.forEach(t=>{t.attachBrowserEvent("focus",function(){this._selectInputText(t)})});i.forEach(t=>{t.addEventDelegate({onAfterRendering:()=>{const e=t.getDomRef("inner");if(!e)return;e.setAttribute("inputmode","none")}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(t){const e=t.key;const n=this._getFocusedInputIndex();switch(e){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"Enter":this.onEnter();break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"TRIGGER":case"ArrowLeft":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:console.log(`Unhandled key: ${e}`)}},onArrowUp:function(t){if(t>0){const e=this.aInputs[t-1];e.focus();this._selectInputText(e)}},onArrowDown:function(t){if(t<this.aInputs.length-1){const e=this.aInputs[t+1];e.focus();this._selectInputText(e)}},onEnter:function(){const t=this.byId("buchenButton");if(t){t.firePress()}},onInputSubmit:function(t){this.onKeyboardAction(t)},onInputLiveChange:function(t){const e=100;let n;const o=t.getSource();const s=this.aInputs.indexOf(o);const i=o.getDomRef("inner");const r=i.getAttribute("inputmode");if(r==="none"){clearTimeout(n);n=setTimeout(()=>{if(this.aInputs[s+1]){this.aInputs[s+1].focus()}if(s===0&&this.aInputs[s+1]){this.requestBackendData()}},e)}},requestBackendData:function(){const t={TANummer:"806187",anzahlPositionen:50,istLagerplatzBarcode:"B"};this.getView().getModel("viewModel").setProperty("/TANummer",t.TANummer);this.getView().getModel("viewModel").setProperty("/anzahlPositionen",t.anzahlPositionen);this.getView().getModel("viewModel").setProperty("/istLagerplatzBarcode",t.istLagerplatzBarcode)},onKeyboardAction:function(t){const e=t.getSource();const n=e.getId().split("--").pop();const o={palletButton:"istLagereinheitBarcode",lagerButton:"istLagerplatzBarcode",einheitButton:"sollLagereinheitBarcode"};const s=o[n];const i=this.byId(s);const r=i.getDomRef("inner");if(r){const t=r.getAttribute("inputmode");const e=t==="text"?"none":"text";r.setAttribute("inputmode",e);setTimeout(()=>{i.focus();r.select()},100)}},onBuchenPress:function(){n.show("Erfolgreich gebucht!")},_getFocusedInputIndex:function(){const t=document.activeElement.id;return this.aInputs.findIndex(e=>e.getId()===t.replace(/-inner$/,""))},_selectInputText:function(t){setTimeout(()=>{const e=t.getDomRef("inner");if(e){e.setSelectionRange(0,e.value.length)}},0)},_handleInputChange:function(t){const e=this.aInputs[t];if(e.getValue()){const e=this.aInputs[t+1];if(e){e.focus()}}}})});
//# sourceMappingURL=Main.controller.js.map