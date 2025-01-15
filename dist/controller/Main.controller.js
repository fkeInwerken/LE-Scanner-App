sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];this.aInputs=[n,o,s];i.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none")}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const n=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"Enter":this.onEnter();break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"TRIGGER":case"ArrowLeft":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:console.log(`Unhandled key: ${t}`)}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onEnter:function(){const e=this.byId("buchenButton");if(e){e.firePress()}},onKeyboardAction:function(e){const t=e.getSource();const n=t.getId().split("--").pop();const o={palletButton:"istLagereinheitBarcode",lagerButton:"istLagerplatzBarcode",einheitButton:"sollLagereinheitBarcode"};const s=o[n];const i=this.byId(s);const r=i.getDomRef("inner");if(r){const e=r.getAttribute("inputmode");const t=e==="text"?"none":"text";r.setAttribute("inputmode",t);setTimeout(()=>{i.focus();r.select()},100)}},onBuchenPress:function(){n.show("Erfolgreich gebucht!")},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},_handleInputChange:function(e){const t=this.aInputs[e];if(t.getValue()){const t=this.aInputs[e+1];if(t){t.focus()}}}})});
//# sourceMappingURL=Main.controller.js.map