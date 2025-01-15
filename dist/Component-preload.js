//@ui5-bundle inw/le_scanner/Component-preload.js
sap.ui.predefine("inw/le_scanner/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("inw.le_scanner.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("inw/le_scanner/controller/App.controller", ["./BaseController"],function(e){"use strict";return e.extend("inw.le_scanner.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("inw/le_scanner/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("inw/le_scanner/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,o){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",istLagerplatzBarcodeState:"None",istLagerplatzBarcodeStateText:"",sollLagereinheitBarcodeState:"None",sollLagereinheitBarcodeStateText:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const o=this.byId("istLagereinheitBarcode");const n=this.byId("istLagerplatzBarcode");const r=this.byId("sollLagereinheitBarcode");const s=[o,n,r];this.aInputs=[o,n,r];s.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none");t.addEventListener("focus",e=>{this.onInputFocus(e)})}})});document.addEventListener("keydown",this.onKeyDown.bind(this))},onKeyDown:function(e){const t=e.key;const o=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(o);break;case"ArrowUp":this.onArrowUp(o);break;case"DPAD_DOWN":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;case"ArrowDown":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onIstLagereinheitSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const r=n.getAttribute("inputmode");this.aInputs[o+1].focus();this.requestBackendData();if(r==="text"){this.triggerInputMode("istLagereinheitBarcode")}},onIstLagerplatzSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const r=n.getAttribute("inputmode");this.aInputs[o+1].focus();if(r==="text"){this.triggerInputMode("istLagerplatzBarcode")}},onSollLagereinheitSubmit:function(e){const t=e.getSource();const o=this.byId("buchenButton");const n=t.getDomRef("inner");const r=n.getAttribute("inputmode");if(r==="text"){this.triggerInputMode("sollLagereinheitBarcode")}this.aInputs[0].focus()},requestBackendData:function(){const e={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const t=this.getModel("viewModel");t.setProperty("/TANummer",e.TANummer);t.setProperty("/anzahlPositionen",e.anzahlPositionen);t.setProperty("/sollLagerplatzBarcode",e.sollLagerplatzBarcode)},onBuchenPress:function(){o.show("Erfolgreich gebucht!");const e=this.getModel("viewModel");e.setProperty("/istLagereinheitBarcode","");e.setProperty("/sollLagerplatzBarcode","");e.setProperty("/istLagerplatzBarcode","");e.setProperty("/sollLagereinheitBarcode","");e.setProperty("/TANummer","");e.setProperty("/anzahlPositionen","");e.setProperty("/istLagerplatzBarcodeState","None");e.setProperty("/istLagerplatzBarcodeStateText","");e.setProperty("/sollLagereinheitBarcodeState","None");e.setProperty("/sollLagereinheitBarcodeStateText","")},onInputFocus:function(e){const t=e.srcElement;t.setSelectionRange(0,t.value.length)},onIstLagerplatzChange:function(){const e=this.getView().getModel("viewModel");const t=e.getProperty("/istLagerplatzBarcode");const o=e.getProperty("/sollLagerplatzBarcode");const n=document.getElementById("successSound");const r=document.getElementById("warningSound");if(t===o){e.setProperty("/istLagerplatzBarcodeState","Success");e.setProperty("/istLagerplatzBarcodeStateText","Soll = Ist Nachlagerplatz");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");n.play()}else{e.setProperty("/istLagerplatzBarcodeState","Warning");e.setProperty("/istLagerplatzBarcodeStateText","Soll ≠ Ist Nachlagerplatz");r.play()}},onSollLagereinheitChange:function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");const o=e.getProperty("/sollLagereinheitBarcode");const n=document.getElementById("successSound");const r=document.getElementById("warningSound");if(t===o){e.setProperty("/sollLagereinheitBarcodeState","Success");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");n.play()}else{e.setProperty("/sollLagereinheitBarcodeState","Warning");e.setProperty("/sollLagereinheitBarcodeStateText","Soll ≠ Ist Lagereinheit");r.play()}},onIstLEKeyboardAction:function(){this.triggerInputMode("istLagereinheitBarcode")},onLPKeyboardAction:function(){this.triggerInputMode("istLagerplatzBarcode")},onSollLEKeyboardAction:function(){this.triggerInputMode("sollLagereinheitBarcode")},triggerInputMode:function(e){const t=this.byId(e);const o=t.getDomRef("inner");if(o){const e=o.getAttribute("inputmode");const n=e==="text"?"none":"text";o.setAttribute("inputmode",n);setTimeout(()=>{t.focus();o.select()},100)}},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},onResetApp:function(){location.reload()}})});
sap.ui.predefine("inw/le_scanner/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("inw/le_scanner/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"inw/le_scanner/i18n/i18n.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_de.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_en.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\n',
	"inw/le_scanner/manifest.json":'{"_version":"1.12.0","name":"Lagerverwaltung","short_name":"Lagerverwaltung","theme_color":"#2196f3","background_color":"#2196f3","display":"standalone","orientation":"portrait","sap.app":{"id":"inw.le_scanner","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.81"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"css":[{"uri":"css/style.css"}]},"rootView":{"viewName":"inw.le_scanner.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"inw.le_scanner.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"inw.le_scanner.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"inw/le_scanner/view/App.view.xml":'<mvc:View\n\tcontrollerName="inw.le_scanner.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"inw/le_scanner/view/Main.view.xml":'<mvc:View controllerName="inw.le_scanner.controller.Main" displayBlock="true" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns:ndc="sap.ndc" core:require="{\n\t\tformatter: \'inw/le_scanner/model/formatter\'\n\t}"><Page title="{i18n>appTitle}" id="page" class="sapUiContentPadding"><headerContent><Button text="{viewModel>/appVersion}" enabled="false" type="Transparent" /></headerContent><content><Label text="{i18n>palletLabel}" required="true" class="sapUiSmallMarginTop" /><Input id="istLagereinheitBarcode" value="{viewModel>/istLagereinheitBarcode}" width="89%" submit="onIstLagereinheitSubmit" liveChange="onIstLagereinheitLiveChange"></Input><Text id="taPlaceholder" text="{i18n>TAPlaceholder}" width="50%" textAlign="Left" class="sapUiSmallMarginTop"></Text><Input id="TANummer" value="{viewModel>/TANummer}" visible="true" width="50%" editable="false" /><Text id="posPlaceholder" text="{i18n>PosPlaceholder}" width="50%" textAlign="Left" class="sapUiSmallMarginTop"></Text><Input id="anzahlPositionen" value="{viewModel>/anzahlPositionen}" visible="true" width="50%" editable="false" /><Text id="placeholder" class="sapUiLargeMarginTop" width="100%"></Text><Text text="{i18n>shouldstorageLocationLabel}" class="sapUiSmallMarginTop" width="50%" /><Input id="sollLagerplatz" value="{viewModel>/sollLagerplatzBarcode}" visible="true" width="50%" editable="false" /><Label text="{i18n>isstorageLocationLabel}" /><Input id="istLagerplatzBarcode" valueState="{viewModel>/istLagerplatzBarcodeState}" valueStateText="{viewModel>/istLagerplatzBarcodeStateText}" value="{viewModel>/istLagerplatzBarcode}" width="89%" submit="onIstLagerplatzSubmit" change="onIstLagerplatzChange" liveChange="onIstLagerplatzLiveChange" editable="{= ${viewModel>/TANummer}.length &gt; 0 }"></Input><Label text="{i18n>storageUnitLabel}" required="true" class="sapUiLargeMarginTop" /><Input id="sollLagereinheitBarcode"  valueState="{viewModel>/sollLagereinheitBarcodeState}" valueStateText="{viewModel>/sollLagereinheitBarcodeStateText}" value="{viewModel>/sollLagereinheitBarcode}" width="89%" submit="onSollLagereinheitSubmit" change="onSollLagereinheitChange" liveChange="onSollLagereinheitLiveChange" editable="{= ${viewModel>/istLagerplatzBarcode}.length &gt; 0 }"></Input></content><footer><Toolbar><Button id="resetButton" press="onResetApp" type="Reject" icon="sap-icon://refresh" /><ToolbarSpacer /><Button id="keyBoardButton" type="Default" icon="sap-icon://keyboard-and-mouse" press="onIstLEKeyboardAction" /><ToolbarSpacer /><Button id="buchenButton" text="{i18n>postButton}" type="Emphasized" press="onBuchenPress" /></Toolbar></footer></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
