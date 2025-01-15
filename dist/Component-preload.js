//@ui5-bundle inw/le_scanner/Component-preload.js
sap.ui.predefine("inw/le_scanner/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("inw.le_scanner.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("inw/le_scanner/controller/App.controller", ["./BaseController"],function(e){"use strict";return e.extend("inw.le_scanner.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("inw/le_scanner/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("inw/le_scanner/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(t,e,n){"use strict";return t.extend("inw.le_scanner.controller.Main",{onInit:function(){const t=new e({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(t,"viewModel");const n=this.byId("istLagereinheitBarcode");const o=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[n,o,s];this.aInputs=[n,o,s];i.forEach(t=>{t.addEventDelegate({onAfterRendering:()=>{const e=t.getDomRef("inner");if(!e)return;e.setAttribute("inputmode","none");e.addEventListener("focus",t=>{this.onInputFocus(t)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(t){const e=t.key;const n=this._getFocusedInputIndex();switch(e){case"DPAD_UP":this.onArrowUp(n);break;case"ArrowUp":this.onArrowUp(n);break;case"DPAD_DOWN":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;case"ArrowDown":if(n===-1){this.aInputs[0].focus();return}this.onArrowDown(n);break;default:}},onArrowUp:function(t){if(t>0){const e=this.aInputs[t-1];e.focus();this._selectInputText(e)}},onArrowDown:function(t){if(t<this.aInputs.length-1){const e=this.aInputs[t+1];e.focus();this._selectInputText(e)}},onIstLagereinheitSubmit:function(t){const e=t.getSource();const n=this.aInputs.indexOf(e);const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();this.requestBackendData();if(s==="text"){this.triggerInputMode("istLagereinheitBarcode")}},onIstLagerplatzSubmit:function(t){const e=t.getSource();const n=this.aInputs.indexOf(e);const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");this.aInputs[n+1].focus();if(s==="text"){this.triggerInputMode("istLagerplatzBarcode")}},onSollLagereinheitSubmit:function(t){const e=t.getSource();const n=this.byId("buchenButton");const o=e.getDomRef("inner");const s=o.getAttribute("inputmode");if(s==="text"){this.triggerInputMode("sollLagereinheitBarcode")}n.firePress();this.aInputs[0].focus()},requestBackendData:function(){const t={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const e=this.getModel("viewModel");e.setProperty("/TANummer",t.TANummer);e.setProperty("/anzahlPositionen",t.anzahlPositionen);e.setProperty("/sollLagerplatzBarcode",t.sollLagerplatzBarcode)},onBuchenPress:function(){n.show("Erfolgreich gebucht!");const t=this.getModel("viewModel");t.setProperty("/istLagereinheitBarcode","");t.setProperty("/sollLagerplatzBarcode","");t.setProperty("/istLagerplatzBarcode","");t.setProperty("/sollLagereinheitBarcode","");t.setProperty("/TANummer","");t.setProperty("/anzahlPositionen","")},onInputFocus:function(t){const e=t.srcElement;e.setSelectionRange(0,e.value.length)},onInputLiveChange:function(t){const e=500;let n;const o=t.getSource();const s=this.aInputs.indexOf(o);const i=o.getDomRef("inner");const r=i.getAttribute("inputmode");if(r==="none"){clearTimeout(n);n=setTimeout(()=>{if(this.aInputs[s+1]){this.aInputs[s+1].focus()}if(s===0&&this.aInputs[s+1]){this.requestBackendData()}},e)}},onIstLEKeyboardAction:function(){this.triggerInputMode("istLagereinheitBarcode")},onLPKeyboardAction:function(){this.triggerInputMode("istLagerplatzBarcode")},onSollLEKeyboardAction:function(){this.triggerInputMode("sollLagereinheitBarcode")},triggerInputMode:function(t){const e=this.byId(t);const n=e.getDomRef("inner");if(n){const t=n.getAttribute("inputmode");const o=t==="text"?"none":"text";n.setAttribute("inputmode",o);setTimeout(()=>{e.focus();n.select()},100)}},_getFocusedInputIndex:function(){const t=document.activeElement.id;return this.aInputs.findIndex(e=>e.getId()===t.replace(/-inner$/,""))},_selectInputText:function(t){setTimeout(()=>{const e=t.getDomRef("inner");if(e){e.setSelectionRange(0,e.value.length)}},0)},onResetApp:function(){location.reload()}})});
sap.ui.predefine("inw/le_scanner/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("inw/le_scanner/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"inw/le_scanner/i18n/i18n.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_de.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_en.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\n',
	"inw/le_scanner/manifest.json":'{"_version":"1.12.0","name":"Lagerverwaltung","short_name":"Lagerverwaltung","theme_color":"#2196f3","background_color":"#2196f3","display":"standalone","orientation":"portrait","sap.app":{"id":"inw.le_scanner","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.78"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"css":[{"uri":"css/style.css"}]},"rootView":{"viewName":"inw.le_scanner.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"inw.le_scanner.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"inw.le_scanner.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"inw/le_scanner/view/App.view.xml":'<mvc:View\n\tcontrollerName="inw.le_scanner.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"inw/le_scanner/view/Main.view.xml":'<mvc:View controllerName="inw.le_scanner.controller.Main" displayBlock="true" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:ndc="sap.ndc" core:require="{\n\t\tformatter: \'inw/le_scanner/model/formatter\'\n\t}"><Page title="{i18n>appTitle}" id="page" class="sapUiContentPadding"><headerContent><Button text="{viewModel>/appVersion}" enabled="false" type="Transparent" /></headerContent><content><Label text="{i18n>palletLabel}" required="true" class="sapUiSmallMarginTop" /><Input id="istLagereinheitBarcode" value="{viewModel>/istLagereinheitBarcode}" width="89%" submit="onIstLagereinheitSubmit" liveChange="onInputLiveChange"></Input><Button id="palletButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /><Text id="taPlaceholder" text="{i18n>TAPlaceholder}" width="50%" textAlign="Left" class="sapUiSmallMarginTop"></Text><Input id="TANummer" value="{viewModel>/TANummer}" visible="true" width="50%" editable="false" /><Text id="posPlaceholder" text="{i18n>PosPlaceholder}" width="50%" textAlign="Left" class="sapUiSmallMarginTop"></Text><Input id="anzahlPositionen" value="{viewModel>/anzahlPositionen}" visible="true" width="50%" editable="false" /><Text id="placeholder" class="sapUiLargeMarginTop" width="100%"></Text><Text text="{i18n>shouldstorageLocationLabel}" class="sapUiSmallMarginTop" width="50%" /><Input id="sollLagerplatz" value="{viewModel>/sollLagerplatzBarcode}" visible="true" width="50%" editable="false" /><Label text="{i18n>isstorageLocationLabel}" /><Input id="istLagerplatzBarcode" value="{viewModel>/istLagerplatzBarcode}" width="89%" submit="onIstLagerplatzSubmit" liveChange="onInputLiveChange" editable="{= ${viewModel>/TANummer}.length &gt; 0 }"></Input><Button id="lagerButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /><Label text="{i18n>storageUnitLabel}" required="true" class="sapUiLargeMarginTop" /><Input id="sollLagereinheitBarcode" value="{viewModel>/sollLagereinheitBarcode}" width="89%" submit="onSollLagereinheitSubmit" liveChange="onInputLiveChange" editable="{= ${viewModel>/istLagerplatzBarcode}.length &gt; 0 }"></Input><Button id="einheitButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onKeyboardAction" /></content><footer><Toolbar><Button id="resetButton" press="onResetApp" type="Reject" icon="sap-icon://refresh" /><ToolbarSpacer /><Button id="buchenButton" text="{i18n>postButton}" type="Emphasized" press="onBuchenPress" /></Toolbar></footer></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
