//@ui5-bundle inw/le_scanner/Component-preload.js
sap.ui.predefine("inw/le_scanner/Component", ["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(t,e,i){"use strict";return t.extend("inw.le_scanner.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.call(this);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!e.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
sap.ui.predefine("inw/le_scanner/controller/App.controller", ["./BaseController"],function(e){"use strict";return e.extend("inw.le_scanner.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
sap.ui.predefine("inw/le_scanner/controller/BaseController", ["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";return e.extend("inw.le_scanner.controller.BaseController",{getOwnerComponent:function(){return e.prototype.getOwnerComponent.call(this)},getRouter:function(){return t.getRouterFor(this)},getResourceBundle:function(){const e=this.getOwnerComponent().getModel("i18n");return e.getResourceBundle()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){this.getView().setModel(e,t);return this},navTo:function(e,t,n){this.getRouter().navTo(e,t,undefined,n)},onNavBack:function(){const e=n.getInstance().getPreviousHash();if(e!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}}})});
sap.ui.predefine("inw/le_scanner/controller/Main.controller", ["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast"],function(e,t,o){"use strict";return e.extend("inw.le_scanner.controller.Main",{onInit:function(){const e=new t({istLagereinheitBarcode:"",sollLagerplatzBarcode:"",istLagerplatzBarcode:"",sollLagereinheitBarcode:"",TANummer:"",anzahlPositionen:"",istLagerplatzBarcodeState:"None",istLagerplatzBarcodeStateText:"",sollLagereinheitBarcodeState:"None",sollLagereinheitBarcodeStateText:"",appVersion:this.getOwnerComponent().getManifestEntry("sap.app").applicationVersion.version});this.setModel(e,"viewModel");const o=this.byId("istLagereinheitBarcode");const n=this.byId("istLagerplatzBarcode");const s=this.byId("sollLagereinheitBarcode");const i=[o,n,s];this.aInputs=[o,n,s];i.forEach(e=>{e.addEventDelegate({onAfterRendering:()=>{const t=e.getDomRef("inner");if(!t)return;t.setAttribute("inputmode","none");t.addEventListener("focus",t=>{this.onInputFocus(t);this._lastFocusedInputId=e.getId()})}})});document.addEventListener("keydown",this.onKeyDown.bind(this));this.successSound=new Audio("./sounds/success.mp3");this.warningSound=new Audio("./sounds/warning.mp3");this.firstsubmit=false},onKeyDown:function(e){const t=e.key;const o=this._getFocusedInputIndex();switch(t){case"DPAD_UP":this.onArrowUp(o);break;case"ArrowUp":this.onArrowUp(o);break;case"DPAD_DOWN":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;case"ArrowDown":if(o===-1){this.aInputs[0].focus();return}this.onArrowDown(o);break;default:}},onArrowUp:function(e){if(e>0){const t=this.aInputs[e-1];t.focus();this._selectInputText(t)}},onArrowDown:function(e){if(e<this.aInputs.length-1){const t=this.aInputs[e+1];t.focus();this._selectInputText(t)}},onIstLagereinheitSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");if(s==="text"){this.onKeyboardAction("istLagereinheitBarcode")}this.aInputs[o+1].focus();this.requestBackendData()},onIstLagerplatzSubmit:function(e){const t=e.getSource();const o=this.aInputs.indexOf(t);const n=t.getDomRef("inner");const s=n.getAttribute("inputmode");if(s==="text"){this.onKeyboardAction("istLagerplatzBarcode")}this.aInputs[o+1].focus()},onSollLagereinheitSubmit:function(e){const t=e.getSource();const o=t.getDomRef("inner");const n=o.getAttribute("inputmode");if(n==="text"){this.onKeyboardAction("sollLagereinheitBarcode")}if(this.firstsubmit){const e=this.byId("buchenButton");e.firePress();this.aInputs[0].focus();this.firstsubmit=false}else{this.firstsubmit=true}},requestBackendData:function(){const e={TANummer:"390",anzahlPositionen:3,sollLagerplatzBarcode:"101-02-B-1"};const t=this.getModel("viewModel");t.setProperty("/TANummer",e.TANummer);t.setProperty("/anzahlPositionen",e.anzahlPositionen);t.setProperty("/sollLagerplatzBarcode",e.sollLagerplatzBarcode)},onBuchenPress:function(){o.show("Erfolgreich gebucht!");const e=this.getModel("viewModel");e.setProperty("/istLagereinheitBarcode","");e.setProperty("/sollLagerplatzBarcode","");e.setProperty("/istLagerplatzBarcode","");e.setProperty("/sollLagereinheitBarcode","");e.setProperty("/TANummer","");e.setProperty("/anzahlPositionen","");e.setProperty("/istLagerplatzBarcodeState","None");e.setProperty("/istLagerplatzBarcodeStateText","");e.setProperty("/sollLagereinheitBarcodeState","None");e.setProperty("/sollLagereinheitBarcodeStateText","")},onInputFocus:function(e){const t=e.srcElement;t.setSelectionRange(0,t.value.length)},onIstLagerplatzChange:function(){const e=this.getView().getModel("viewModel");const t=e.getProperty("/istLagerplatzBarcode");const o=e.getProperty("/sollLagerplatzBarcode");if(t===o){e.setProperty("/istLagerplatzBarcodeState","Success");e.setProperty("/istLagerplatzBarcodeStateText","Soll = Ist Nachlagerplatz");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");this.successSound.play()}else{e.setProperty("/istLagerplatzBarcodeState","Warning");e.setProperty("/istLagerplatzBarcodeStateText","Soll ≠ Ist Nachlagerplatz");this.warningSound.play()}},onSollLagereinheitChange:function(){const e=this.getModel("viewModel");const t=e.getProperty("/istLagereinheitBarcode");const o=e.getProperty("/sollLagereinheitBarcode");if(t===o){e.setProperty("/sollLagereinheitBarcodeState","Success");e.setProperty("/sollLagereinheitBarcodeStateText","Soll = Ist Lagereinheit");this.successSound.play()}else{e.setProperty("/sollLagereinheitBarcodeState","Warning");e.setProperty("/sollLagereinheitBarcodeStateText","Soll ≠ Ist Lagereinheit");this.warningSound.play()}},onKeyboardAction:function(e){let t=null;if(typeof e==="string"){t=this.byId(e)}if(!t){t=this._lastFocusedInputId}const o=this.byId(t);const n=o.getDomRef("inner");if(n){const e=n.getAttribute("inputmode");const t=e==="text"?"none":"text";n.setAttribute("inputmode",t);setTimeout(()=>{o.focus();n.select()},100)}},_getFocusedInputIndex:function(){const e=document.activeElement.id;return this.aInputs.findIndex(t=>t.getId()===e.replace(/-inner$/,""))},_selectInputText:function(e){setTimeout(()=>{const t=e.getDomRef("inner");if(t){t.setSelectionRange(0,t.value.length)}},0)},onResetApp:function(){location.reload()}})});
sap.ui.predefine("inw/le_scanner/model/formatter", function(){"use strict";return{formatValue:function(e){return e&&e.toUpperCase()}}});
sap.ui.predefine("inw/le_scanner/model/models", ["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,n,i){"use strict";return{createDeviceModel:function(){const o=new e(i);o.setDefaultBindingMode(n.OneWay);return o}}});
sap.ui.require.preload({
	"inw/le_scanner/i18n/i18n.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\nresetButton=Reset\nkeyboardButton=Tastatur\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_de.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\nbtnText=Say Hello\npalletLabel=Lagereinheit Transport:\nTAPlaceholder=Transportauftrag:\nPosPlaceholder=Anzahl der Positionen:\nshouldstorageLocationLabel=Soll-Nachlagerplatz:\nisstorageLocationLabel=Ist-Nachlagerplatz:\nstorageUnitLabel=Lagereinheit Bestand:\nresetButton=Reset\nkeyboardButton=Tastatur\npostButton=Buchen',
	"inw/le_scanner/i18n/i18n_en.properties":'appTitle=LE-Scanner\nappDescription=UI5 Application inw.le_scanner\n',
	"inw/le_scanner/manifest.json":'{"_version":"1.12.0","name":"Lagerverwaltung","short_name":"Lagerverwaltung","theme_color":"#2196f3","background_color":"#2196f3","display":"standalone","orientation":"portrait","sap.app":{"id":"inw.le_scanner","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.98"}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"css":[{"uri":"css/style.css"}]},"rootView":{"viewName":"inw.le_scanner.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.ui.core":{},"sap.m":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"inw.le_scanner.i18n.i18n"}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"inw.le_scanner.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"main","target":"main"}],"targets":{"main":{"viewId":"main","viewName":"Main"}}}}}',
	"inw/le_scanner/view/App.view.xml":'<mvc:View\n\tcontrollerName="inw.le_scanner.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"inw/le_scanner/view/Main.view.xml":'<mvc:View\n    controllerName="inw.le_scanner.controller.Main"\n    displayBlock="true"\n    xmlns="sap.m"\n    xmlns:f="sap.f"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:core="sap.ui.core"\n    xmlns:ndc="sap.ndc"\n    core:require="{\n\t\tformatter: \'inw/le_scanner/model/formatter\'\n\t}"\n><Page\n        title="{i18n>appTitle}"\n        id="page"\n        class="sapUiContentPadding"\n    ><headerContent><Button\n                text="{viewModel>/appVersion}"\n                enabled="false"\n                type="Transparent"\n            /></headerContent><content><FlexBox\n                direction="Row"\n                alignItems="Center"\n                alignContent="Center"\n                justifyContent="SpaceBetween"\n            ><core:Icon\n                    src="sap-icon://shipping-status"\n                    size="2.8rem"\n                    class="sapUiTinyMarginEnd"\n                    color="black"\n                /><FlexBox\n                    direction="Column"\n                    width="85%"\n                ><Label\n                        text="{i18n>palletLabel}"\n                        required="true"\n                        width="100%"\n                    /><Input\n                        id="istLagereinheitBarcode"\n                        value="{viewModel>/istLagereinheitBarcode}"\n                        width="100%"\n                        submit="onIstLagereinheitSubmit"\n                        liveChange="onIstLagereinheitLiveChange"\n                    /></FlexBox></FlexBox><Text\n                id="taPlaceholder"\n                text="{i18n>TAPlaceholder}"\n                width="50%"\n                textAlign="Left"\n                class="sapUiSmallMarginTop"\n            /><Input\n                id="TANummer"\n                value="{viewModel>/TANummer}"\n                visible="true"\n                width="50%"\n                editable="false"\n            /><Text\n                id="posPlaceholder"\n                text="{i18n>PosPlaceholder}"\n                width="50%"\n                textAlign="Left"\n                class="sapUiSmallMarginTop"\n            /><Input\n                id="anzahlPositionen"\n                value="{viewModel>/anzahlPositionen}"\n                visible="true"\n                width="50%"\n                editable="false"\n            /><Text\n                id="placeholder"\n                class="sapUiLargeMarginTop"\n                width="100%"\n            /><Text\n                text="{i18n>shouldstorageLocationLabel}"\n                class="sapUiSmallMarginTop"\n                width="50%"\n            /><Input\n                id="sollLagerplatz"\n                value="{viewModel>/sollLagerplatzBarcode}"\n                visible="true"\n                width="50%"\n                editable="false"\n            /><FlexBox\n                direction="Row"\n                alignItems="Center"\n                class="sapUiSmallMarginTop"\n                justifyContent="SpaceBetween"\n            ><core:Icon\n                    src="sap-icon://map-2"\n                    size="2.8rem"\n                    class="sapUiTinyMarginEnd"\n                    color="blue"\n                /><FlexBox\n                    direction="Column"\n                    width="85%"\n                ><Label\n                        text="{i18n>isstorageLocationLabel}"\n                        width="100%"\n                    /><Input\n                        id="istLagerplatzBarcode"\n                        valueState="{viewModel>/istLagerplatzBarcodeState}"\n                        valueStateText="{viewModel>/istLagerplatzBarcodeStateText}"\n                        value="{viewModel>/istLagerplatzBarcode}"\n                        width="100%"\n                        submit="onIstLagerplatzSubmit"\n                        change="onIstLagerplatzChange"\n                        liveChange="onIstLagerplatzLiveChange"\n                        editable="{= ${viewModel>/TANummer}.length &gt; 0 }"\n                    /></FlexBox></FlexBox><FlexBox\n                direction="Row"\n                alignItems="Center"\n                class="sapUiLargeMarginTop"\n                justifyContent="SpaceBetween"\n            ><core:Icon\n                    src="sap-icon://add-product"\n                    size="2.8rem"\n                    class="sapUiTinyMarginEnd"\n                    color="brown"\n                /><FlexBox\n                    direction="Column"\n                    width="85%"\n                ><Label\n                        text="{i18n>storageUnitLabel}"\n                        required="true"\n                        width="100%"\n                    /><Input\n                        id="sollLagereinheitBarcode"\n                        valueState="{viewModel>/sollLagereinheitBarcodeState}"\n                        valueStateText="{viewModel>/sollLagereinheitBarcodeStateText}"\n                        value="{viewModel>/sollLagereinheitBarcode}"\n                        width="100%"\n                        submit="onSollLagereinheitSubmit"\n                        change="onSollLagereinheitChange"\n                        liveChange="onSollLagereinheitLiveChange"\n                        editable="{= ${viewModel>/istLagerplatzBarcode}.length &gt; 0 }"\n                    /></FlexBox></FlexBox></content><footer><Toolbar><Button\n                    id="resetButton"\n                    press="onResetApp"\n                    type="Ghost"\n                    text="{i18n>resetButton}"\n                /><Button\n                    id="keyBoardButton"\n                    type="Ghost"\n                    text="{i18n>keyboardButton}"\n                    press="onKeyboardAction"\n                /><ToolbarSpacer /><Button\n                    id="buchenButton"\n                    text="{i18n>postButton}"\n                    type="Emphasized"\n                    press="onBuchenPress"\n                /></Toolbar></footer></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
