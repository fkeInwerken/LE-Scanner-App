sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];i.forEach(e=>{e.addEventDelegate({onfocusin:this.onFocus.bind(this)})});this.aInputs=[n,o,s];i.forEach(e=>{e.addEventDelegate({onAfterRendering:function(){const t=e.getDomRef("inner");if(t){t.setAttribute("inputmode","none")}}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const n=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"ENTER":case"\r":case"\n":this.onEnter();break;case"TRIGGER":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:sap.m.MessageToast.show(`Unhandled key: ${t}`,{width:"15em",my:"center center",at:"center center"})}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onEnter:function(){const e=this.byId("buchenButton");if(e){e.firePress()}},onFocus:function(e){const t=e.srcControl;const n=t.getDomRef("inner");if(n){n.select()}},onKeyboardAction:function(e){const t=e.getSource();t.addEventDelegate({onAfterRendering:function(){const e=t.getDomRef("inner");if(e){e.setAttribute("inputmode","text")}}});t.focus()},onBuchenPress:function(){sap.m.MessageToast.show("Erfolgreich gebucht!",{width:"15em",my:"center center",at:"center center"})},_getFocusedInputIndex:function(){const e=document.activeElement.id;const t=e.replace(/-inner$/,"");return this.aInputs.findIndex(e=>e.getId()===t)},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)}})});
//# sourceMappingURL=Main.controller.js.map