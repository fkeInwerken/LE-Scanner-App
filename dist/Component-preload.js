//@ui5-bundle inw/le_scanner/Component-preload.js
sap.ui.predefine("inw/le_scanner/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("inw.le_scanner.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("inw/le_scanner/controller/App.controller", ["./BaseController"],function(e){"use strict";return e.extend("inw.le_scanner.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("inw/le_scanner/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("inw/le_scanner/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];i.forEach(e=>{e.addEventDelegate({onfocusin:this.onFocus.bind(this)})});this.aInputs=[n,o,s];this.aInputs.forEach((e,t)=>{e.attachSubmit(()=>this._handleInputChange(t))});i.forEach(e=>{e.addEventDelegate({onAfterRendering:function(){const t=e.getDomRef("inner");if(t){t.setAttribute("inputmode","none")}}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const n=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"DPAD_LEFT":this.onArrowLeft();break;case"DPAD_RIGHT":this.onArrowRight();break;case"ENTER":case"\r":case"\n":this.onEnter();break;case"TRIGGER":this.onTrigger();break;case"P1":this.onP1();break;case"P2":this.onP2();break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onEnter:function(){const e=this.byId("buchenButton");if(e){e.firePress()}},onFocus:function(e){const t=e.srcControl;const n=t.getDomRef("inner");if(n){n.select()}},onKeyboardAction:function(e){const t=e.getSource();const n=t.getDomRef("inner");if(n){n.setAttribute("inputmode","text");t.focus();n.setAttribute("inputmode","none")}},onBuchenPress:function(){sap.m.MessageToast.show("Erfolgreich gebucht!",{width:"15em",my:"center center",at:"center center"})},_getFocusedInputIndex:function(){const e=document.activeElement.id;const t=e.replace(/-inner$/,"");return this.aInputs.findIndex(e=>e.getId()===t)},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},_handleInputChange:function(e){const t=this.aInputs[e];if(t.getValue()){const t=this.aInputs[e+1];if(t){t.focus()}}}})});
sap.ui.predefine("inw/le_scanner/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("inw/le_scanner/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"inw/le_scanner/i18n/i18n.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Paletten Barcode:\nTAPlaceholder=Transportauftrag\nPosPlaceholder=anzahl Positionen\nstorageLocationLabel=Lagerplatz Barcode:\nstorageUnitLabel=Lagereinheit Barcode:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_de.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Paletten Barcode:\nTAPlaceholder=Transportauftrag\nPosPlaceholder=anzahl Positionen\nstorageLocationLabel=Lagerplatz Barcode:\nstorageUnitLabel=Lagereinheit Barcode:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_en.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\n',
	"inw/le_scanner/manifest.json":'{"_version":"1.12.0","name":"Lagerverwaltung","short_name":"Lagerverwaltung","theme_color":"#2196f3","background_color":"#2196f3","display":"standalone","orientation":"portrait","sap.app":{"id":"inw.le_scanner","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.4"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"css":[{"uri":"css/style.css"}]},"rootView":{"viewName":"inw.le_scanner.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"inw.le_scanner.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"inw.le_scanner.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"inw/le_scanner/view/App.view.xml":'<mvc:View\n\tcontrollerName="inw.le_scanner.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"inw/le_scanner/view/Main.view.xml":'<mvc:View controllerName="inw.le_scanner.controller.Main" displayBlock="true" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:ndc="sap.ndc" core:require="{\n\t\tformatter: \'inw/le_scanner/model/formatter\'\n\t}"><Page title="{i18n>appTitle}" id="page" class="sapUiContentPadding"><headerContent><Button text="{viewModel>/appVersion}" enabled="false" type="Transparent" /></headerContent><content><Label text="{i18n>palletLabel}" required="true" class="sapUiSmallMarginTop" /><Input id="istLagereinheitBarcode" value="{viewModel>/istLagereinheitBarcode}" width="100%" showValueHelp="true" valueHelpIconSrc="sap-icon://keyboard-and-mouse" valueHelpRequest="onKeyboardAction"></Input><VBox><Input id="TANummer" value="{viewModel>/TANummer}" visible="true" editable="false" placeholder="{i18n>TAPlaceholder}" /><Input id="anzahlPositionen" value="{viewModel>/anzahlPositionen}" visible="true" editable="false" placeholder="{i18n>PosPlaceholder}" /></VBox><Label text="{i18n>storageLocationLabel}" class="sapUiLargeMarginTop" /><Input id="istLagerplatzBarcode" value="{viewModel>/istLagerplatzBarcode}" width="100%" showValueHelp="true" valueHelpIconSrc="sap-icon://keyboard-and-mouse" valueHelpRequest="onKeyboardAction"></Input><Label text="{i18n>storageUnitLabel}" required="true" class="sapUiLargeMarginTop" /><Input id="sollLagereinheitBarcode" value="{viewModel>/sollLagereinheitBarcode}" width="100%" showValueHelp="true" valueHelpIconSrc="sap-icon://keyboard-and-mouse" valueHelpRequest="onKeyboardAction"></Input></content><footer><Toolbar><ToolbarSpacer /><Button id="buchenButton" text="{i18n>postButton}" type="Emphasized" press="onBuchenPress" /></Toolbar></footer></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
