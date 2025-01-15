//@ui5-bundle inw/le_scanner/Component-preload.js
sap.ui.predefine("inw/le_scanner/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("inw.le_scanner.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("inw/le_scanner/controller/App.controller", ["./BaseController"],function(e){"use strict";return e.extend("inw.le_scanner.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("inw/le_scanner/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("inw/le_scanner/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(t,e,n){"use strict";return t.extend("inw.le_scanner.controller.Main",{onInit:function(){const t=new e({istLagereinheitBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(t,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];this.aInputs=[n,o,s];this.aInputs.forEach(t=>{t.focus(this.onInputFocus.bind(this))});i.forEach(t=>{t.addEventDelegate({onAfterRendering:()=>{const e=t.getDomRef("inner");if(!e)return;e.setAttribute("inputmode","none")}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(t){const e=t.key;const n=this._getFocusedInputIndex();switch(e){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"Enter":this.onEnter(n);break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"TRIGGER":case"ArrowLeft":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:console.log(`Unhandled key: ${e}`)}},onArrowUp:function(t){if(t>0){const e=this.aInputs[t-1];e.focus();this._selectInputText(e)}},onArrowDown:function(t){if(t<this.aInputs.length-1){const e=this.aInputs[t+1];e.focus();this._selectInputText(e)}},onEnter:function(t){const e=this.byId("buchenButton");if(t===-1){e.firePress()}else{const e=this.aInputs[t];this.onKeyboardAction({getSource:()=>e})}},onInputSubmit:function(t){},onInputFocus:function(t){const e=t.getSource();e.focus();this._selectInputText(e)},onInputLiveChange:function(t){const e=500;let n;const o=t.getSource();const s=this.aInputs.indexOf(o);const i=o.getDomRef("inner");const r=i.getAttribute("inputmode");if(r==="none"){clearTimeout(n);n=setTimeout(()=>{if(this.aInputs[s+1]){this.aInputs[s+1].focus()}if(s===0&&this.aInputs[s+1]){this.requestBackendData()}},e)}},requestBackendData:function(){const t={TANummer:"806187",anzahlPositionen:50,istLagerplatzBarcode:"B"};this.getView().getModel("viewModel").setProperty("/TANummer",t.TANummer);this.getView().getModel("viewModel").setProperty("/anzahlPositionen",t.anzahlPositionen);this.getView().getModel("viewModel").setProperty("/istLagerplatzBarcode",t.istLagerplatzBarcode)},onKeyboardAction:function(t){const e=t.getSource();const n=e.getId().split("--").pop();const o={palletButton:"istLagereinheitBarcode",lagerButton:"istLagerplatzBarcode",einheitButton:"sollLagereinheitBarcode"};const s=o[n];const i=this.byId(s);const r=i.getDomRef("inner");if(r){const t=r.getAttribute("inputmode");const e=t==="text"?"none":"text";r.setAttribute("inputmode",e);setTimeout(()=>{i.focus();r.select()},100)}},onBuchenPress:function(){n.show("Erfolgreich gebucht!")},_getFocusedInputIndex:function(){const t=document.activeElement.id;return this.aInputs.findIndex(e=>e.getId()===t.replace(/-inner$/,""))},_selectInputText:function(t){setTimeout(()=>{const e=t.getDomRef("inner");if(e){e.setSelectionRange(0,e.value.length)}},0)},_handleInputChange:function(t){const e=this.aInputs[t];if(e.getValue()){const e=this.aInputs[t+1];if(e){e.focus()}}}})});
sap.ui.predefine("inw/le_scanner/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("inw/le_scanner/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"inw/le_scanner/i18n/i18n.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Paletten Barcode:\nTAPlaceholder=TA:\nPosPlaceholder=No Pos.:\nstorageLocationLabel=Lagerplatz Barcode:\nstorageUnitLabel=Lagereinheit Barcode:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_de.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Paletten Barcode:\nTAPlaceholder=TA:\nPosPlaceholder=No Pos.:\nstorageLocationLabel=Lagerplatz Barcode:\nstorageUnitLabel=Lagereinheit Barcode:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_en.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\n',
	"inw/le_scanner/manifest.json":'{"_version":"1.12.0","name":"Lagerverwaltung","short_name":"Lagerverwaltung","theme_color":"#2196f3","background_color":"#2196f3","display":"standalone","orientation":"portrait","sap.app":{"id":"inw.le_scanner","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.60"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"css":[{"uri":"css/style.css"}]},"rootView":{"viewName":"inw.le_scanner.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"inw.le_scanner.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"inw.le_scanner.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"inw/le_scanner/view/App.view.xml":'<mvc:View\n\tcontrollerName="inw.le_scanner.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"inw/le_scanner/view/Main.view.xml":'<mvc:View controllerName="inw.le_scanner.controller.Main" displayBlock="true" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:ndc="sap.ndc" core:require="{\n\t\tformatter: \'inw/le_scanner/model/formatter\'\n\t}"><Page title="{i18n>appTitle}" id="page" class="sapUiContentPadding"><headerContent><Button text="{viewModel>/appVersion}" enabled="false" type="Transparent" /></headerContent><content><Label text="{i18n>palletLabel}" required="true" class="sapUiSmallMarginTop" /><Input id="istLagereinheitBarcode" value="{viewModel>/istLagereinheitBarcode}" width="89%" submit="onInputSubmit" liveChange="onInputLiveChange"></Input><Button id="palletButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /><Text id="taPlaceholder" text="{i18n>TAPlaceholder}" width="20%" textAlign="Left"></Text><Label id="TANummer" text="{viewModel>/TANummer}" visible="true"  width="80%" /><Text id="posPlaceholder" text="{i18n>PosPlaceholder}" width="20%" textAlign="Left"></Text><Label id="anzahlPositionen" text="{viewModel>/anzahlPositionen}" visible="true" width="80%" /><Label text="{i18n>storageLocationLabel}" class="sapUiLargeMarginTop" /><Input id="istLagerplatzBarcode" value="{viewModel>/istLagerplatzBarcode}" width="89%" submit="onInputSubmit" liveChange="onInputLiveChange"></Input><Button id="lagerButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /><Label text="{i18n>storageUnitLabel}" required="true" class="sapUiLargeMarginTop" /><Input id="sollLagereinheitBarcode" value="{viewModel>/sollLagereinheitBarcode}" width="89%" submit="onInputSubmit" liveChange="onInputLiveChange"></Input><Button id="einheitButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /></content><footer><Toolbar><ToolbarSpacer /><Button id="buchenButton" text="{i18n>postButton}" type="Emphasized" press="onBuchenPress" /></Toolbar></footer></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
