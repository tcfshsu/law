//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"80d3e14f5e08b4888f464e3cd0d0b2445b63ec46",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "law",
  "resources": {
    "hash": "sha256-XVzqV5W9tF0wSEn6SQG8EOZnyJODNEidrLSOlzdvZ7I=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.4xbsgn06op.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.zj9dll5ffg.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.gxid1jnzlg.wasm",
        "integrity": "sha256-7GGgE/xC8VPxoauPHCELdkCxfHORbzK0Au3Y25vPeIY=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.dvobepeq33.wasm",
        "integrity": "sha256-qYT945KbcO1/EyQ9ylrbPNK8doTLparCrfvQ3/I5lAs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.0l48jusrce.wasm",
        "integrity": "sha256-zIsJOJK/7tagHMgO9hQW9Gfk8l5XqFqQyL6iP/1fnj0=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Azure.Core.wasm",
        "name": "Azure.Core.8xk79iv8nh.wasm",
        "integrity": "sha256-VHkkFYKYsVX/ZTjRxW7egFcHCk1KjpB9tl7Gwdo37/M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Azure.Identity.wasm",
        "name": "Azure.Identity.q3kp98qd6v.wasm",
        "integrity": "sha256-+iQf3yduYHqsIbO5lcB9t6jQxHAjKTlfWKHrm/nJn1U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Humanizer.wasm",
        "name": "Humanizer.oqup3v7t3k.wasm",
        "integrity": "sha256-4NbSboZzzP9nikRtXapUZNzOyITt7ht9TNqCIQHr5OE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.4kpbdj2if9.wasm",
        "integrity": "sha256-JE9RH0fxAmASLoZHPlsNOhfMa1h9ioeq8inRhd9IyOs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.c5gvt2up7c.wasm",
        "integrity": "sha256-gPfdVM2TO3Ogx+np2tbIJjNTb6naiPVUMnr+w1260ts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wi9je5kznu.wasm",
        "integrity": "sha256-+Lhok3gY+m8FR5B0XbD2wr15T2JzhrXBWslPKMWoWsE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Razor.Language.wasm",
        "name": "Microsoft.AspNetCore.Razor.Language.xtef4vafxt.wasm",
        "integrity": "sha256-1bhsc6uUIsElEgbuoDI8OLXAZQbnsNjO4N4rEr6iekk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.wasm",
        "name": "Microsoft.AspNetCore.WebUtilities.u79q76o5ud.wasm",
        "integrity": "sha256-KrC4YI1DDmlFgq3Qkb9b4kcHYt5BxeF2SwvbYKkWbWw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Build.wasm",
        "name": "Microsoft.Build.lzb64imr9e.wasm",
        "integrity": "sha256-Ma532ud/SbV/7WCep5j5VoYgHNUdBLxybe1R3BaXAZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Build.Framework.wasm",
        "name": "Microsoft.Build.Framework.z1two6g647.wasm",
        "integrity": "sha256-6TRbpMfIZY3A+ONJ7ShwVux0bwWnb2tFsFa06wZf3Uk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.wasm",
        "name": "Microsoft.CodeAnalysis.erp1n29u9n.wasm",
        "integrity": "sha256-VvgzZZPZ5B7lUxBoceWqgqrawKs/BElsjRu+YB9hkIk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.CSharp.wasm",
        "name": "Microsoft.CodeAnalysis.CSharp.df8hfd5o8z.wasm",
        "integrity": "sha256-F6hjB2uObN+teOfptznqaUCTmIDykWUjqqGeeis7Rjw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.wasm",
        "name": "Microsoft.CodeAnalysis.CSharp.Features.jvfjezgoi3.wasm",
        "integrity": "sha256-4e4hTv7aTv3Jyt3DQ6DWGMupePQ4poaigP7Ivvz7/ZE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.wasm",
        "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.nnmcno2xng.wasm",
        "integrity": "sha256-szRxBE0pVPoPByitWVImsT5ZNVzI1WotxWc8ElzLKWc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Elfie.wasm",
        "name": "Microsoft.CodeAnalysis.Elfie.6dt0yknqsb.wasm",
        "integrity": "sha256-VkmO4woyJqa7TDcQ9e+kuZEdNoHkFA3Nd/d9RXWVxa0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Features.wasm",
        "name": "Microsoft.CodeAnalysis.Features.rrzy9p7ant.wasm",
        "integrity": "sha256-aXkTT4F7+lbKNxPMKAk3fz/2aJkzxEx8+Btptqfd30Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Razor.wasm",
        "name": "Microsoft.CodeAnalysis.Razor.g02a31l0q3.wasm",
        "integrity": "sha256-UACfDr+gjP6pJuAn7cpfpTHOvcAuxg3ZwacHWFfngc8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Scripting.wasm",
        "name": "Microsoft.CodeAnalysis.Scripting.7mj8kwd5c2.wasm",
        "integrity": "sha256-TznqVz+skMph6sCKJ4KOTh3BMnCH+88LkH8v3tUnQzg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Workspaces.wasm",
        "name": "Microsoft.CodeAnalysis.Workspaces.c3dihulv86.wasm",
        "integrity": "sha256-yAu2rqqQvhof4W5kbWNInCtLmYIYPbm/0vHEJfVe6h8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.ExternalAccess.RazorCompiler.wasm",
        "name": "Microsoft.CodeAnalysis.ExternalAccess.RazorCompiler.f9fsjlob2f.wasm",
        "integrity": "sha256-Q+Mu55Bv5Bpgom+FKMzZFjkepZvuxMcLKzP1JIvp20U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.wasm",
        "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.cqwobfb9uu.wasm",
        "integrity": "sha256-tDK3Pd/sdv9ft1mwli0KRXKpcJvt1ZNIOxd556QdjjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Data.SqlClient.wasm",
        "name": "Microsoft.Data.SqlClient.3806qc8pna.wasm",
        "integrity": "sha256-Xe9VStEe3aONRlO3BZMB/VDCNJHsw1TCMsZ+z6lcCzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Data.Sqlite.wasm",
        "name": "Microsoft.Data.Sqlite.ymq5q3rfmn.wasm",
        "integrity": "sha256-5jNj/oBL2ZnsBVbIXQgupnBY+3hemZyzqxSc7c3IVRA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DiaSymReader.wasm",
        "name": "Microsoft.DiaSymReader.n7aozp74g0.wasm",
        "integrity": "sha256-s8A+LIZPdelFgqksm2voS6oVrorJuL2xM+/mgQHThnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DotNet.Scaffolding.Shared.wasm",
        "name": "Microsoft.DotNet.Scaffolding.Shared.vj4ik89quy.wasm",
        "integrity": "sha256-i6uy3B9id8llOms9KawZ3N1vUNKI1nEWUKOTVZCf0gw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.wasm",
        "name": "Microsoft.EntityFrameworkCore.gn18w6er8a.wasm",
        "integrity": "sha256-pK0yGIWN2RryxkLfKocEEPXUtC3wKaympWwiJaoIFc4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Abstractions.wasm",
        "name": "Microsoft.EntityFrameworkCore.Abstractions.t9zwh4pzfi.wasm",
        "integrity": "sha256-b/T3I5OpEv+ii2ltxvMWGCG24q9KJ9CFYb2Fnxo/7c8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Relational.wasm",
        "name": "Microsoft.EntityFrameworkCore.Relational.oxrsm5s9bc.wasm",
        "integrity": "sha256-lHnh5rG3QyeeycI5TVanSk6XttBW0VdUJviMfJiHqJc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.Sqlite.wasm",
        "name": "Microsoft.EntityFrameworkCore.Sqlite.uhliwt57xi.wasm",
        "integrity": "sha256-UgFOFjLN6XZpHkaGcmGD86Aza5BwsEhUFge6V8Us4LY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.EntityFrameworkCore.SqlServer.wasm",
        "name": "Microsoft.EntityFrameworkCore.SqlServer.z2xb7pl6kt.wasm",
        "integrity": "sha256-O7c/5eMqRcUcIUhJNFwCoKr7Yk3DMiYFA0pJODkhD2o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.86agchezon.wasm",
        "integrity": "sha256-gKctp6G8/0hSGpgFHunrU5/P7e2w8tr9FaaiZJw6SD4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Memory.wasm",
        "name": "Microsoft.Extensions.Caching.Memory.cs72xw4ajd.wasm",
        "integrity": "sha256-7JS1NRcheOY+QGQVvL3Ezsnmw6BqlGa0FOA1UNGOcpg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.pryhu4b95g.wasm",
        "integrity": "sha256-RSiDnwPY+BBS2aX8ytLdKhW/0OOX+Zda8O8CP45ZG2s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.lp5g5yxjj9.wasm",
        "integrity": "sha256-6T2cX908EUQrUvFqSLh6f3sKjXBdVsfWRgn/oJDTZG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.kaj8eppjjq.wasm",
        "integrity": "sha256-VMrWC8sWoLTG7hDHK/Ayv1YL17beJdSbieuySCjz7zY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.8b1wg4imo7.wasm",
        "integrity": "sha256-XPGXZATdVov/T4Qei/zlLk0LbOCLjET+tCB/HBwusQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.z3p8geehqp.wasm",
        "integrity": "sha256-4abHX2vq8wqdZoF1cwomxLxLhNUi7tB7rXsviXPVJlE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.o6hj4q68fy.wasm",
        "integrity": "sha256-QJaD2pelfFX+YIK5oL/YeDxj54JzMZA35fdfIUsC5lM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.xcslyy3nju.wasm",
        "integrity": "sha256-L2P/tLhZ6FSR1KG27vIE/jer8JBjOAPRMf7D9eFEUNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.cst08p31m4.wasm",
        "integrity": "sha256-NO2WDuRQrRDatFem6hoZiMZOlVzQvjbLJUC/pfS4+VU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.w5e0fz4d9c.wasm",
        "integrity": "sha256-tKIDFBgMhuV4NlMmB6qbHiKjygif0eCxt8LcgJQrFdo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.wt9o79ujgk.wasm",
        "integrity": "sha256-xBJ3GKy2TI0rOH8Q/vXa9h/6blaHEuO5geXCw2g+eL0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.k2zp8warra.wasm",
        "integrity": "sha256-zGXe8lBT741k0F0weuFdKxfmtUe8lgR0vWMm1QWLp2k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.w0n0fvm1ql.wasm",
        "integrity": "sha256-cKBtC4QYWFm3lOTh2qJIr7RoMT2ZHCGUiBcHfcLLqrU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.wasm",
        "name": "Microsoft.Identity.Client.2ommbwr64t.wasm",
        "integrity": "sha256-QreywwtBpF9cd8NYgnYA9kKTL53T41w0apKhB7qXrEM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.Extensions.Msal.wasm",
        "name": "Microsoft.Identity.Client.Extensions.Msal.ks83314uaf.wasm",
        "integrity": "sha256-RJYXAvD3aph/JuaxKK4rxebMm8FZcEvnd8JMBd/d5hE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Abstractions.wasm",
        "name": "Microsoft.IdentityModel.Abstractions.0m6h741tyv.wasm",
        "integrity": "sha256-SH0rUt6k82z9Cz4KOL4WFMA29XasrcRmSmTq4rxmhjQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "name": "Microsoft.IdentityModel.JsonWebTokens.cxyxl1fpw4.wasm",
        "integrity": "sha256-EDjT0oUctyIFx92oz/BslCa3kmLMKgUoNbKvEHaadg8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Logging.wasm",
        "name": "Microsoft.IdentityModel.Logging.sh90tggp8e.wasm",
        "integrity": "sha256-8BLJOclzuhb6NG21DK6eyfBDr99iHUktqw0hKVCOkEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.wasm",
        "name": "Microsoft.IdentityModel.Protocols.homtf5mctj.wasm",
        "integrity": "sha256-ERvqChyVYiFjNDbPkS0sOag9BFOOIe8nWTEiBVLRbeA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.OpenIdConnect.wasm",
        "name": "Microsoft.IdentityModel.Protocols.OpenIdConnect.45hz3ik893.wasm",
        "integrity": "sha256-iOxZiIbSNsoZ8tto2rBtzh77EzkRa0YcPb36KYr6IdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Tokens.wasm",
        "name": "Microsoft.IdentityModel.Tokens.2wpk0uxouu.wasm",
        "integrity": "sha256-7vcEr6jIbsLxtJsjKqRaUjlXzJK74GyMDqcqitijPxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.tkdtcliwht.wasm",
        "integrity": "sha256-/QlUS8KHS7UrcNOtE19a+aOr9GsolX3Obp7bdOA7Jls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.s5f1glpht3.wasm",
        "integrity": "sha256-AKlxBNSGgaujQlZBLHCptAZb8WnLxhfrMDpXYlXsvvo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.NET.StringTools.wasm",
        "name": "Microsoft.NET.StringTools.lo1ab3mhnt.wasm",
        "integrity": "sha256-BZ7JEotjjpZj39o5xpOYXb0S1oZwK73fljbedivJnGY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.SqlServer.Server.wasm",
        "name": "Microsoft.SqlServer.Server.yamodpu5qp.wasm",
        "integrity": "sha256-Fig+5hq00gGQlXAgSnyFlUlWyhlx9f+yPJb4INt3gNc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.SolutionPersistence.wasm",
        "name": "Microsoft.VisualStudio.SolutionPersistence.0wkvikablu.wasm",
        "integrity": "sha256-gP2ogJoWUYxg5fxwgrjuTFfjEPz0U1AHT0c25JBnxBU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGeneration.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGeneration.qykagkg939.wasm",
        "integrity": "sha256-oqguzCB3/BE9R7P2HfZe6XCZJg9u/r8Jp7Afmm6IeFU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGeneration.Core.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGeneration.Core.rf94xu4ni5.wasm",
        "integrity": "sha256-Of5FoN0DkuXL45ofzEOsx17s5Ap88fsQOZ2D0KjpsPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "dotnet-aspnet-codegenerator-design.wasm",
        "name": "dotnet-aspnet-codegenerator-design.aslvm605wd.wasm",
        "integrity": "sha256-9pGaMFRqMd/Zph4g6vUfVq97uhYibV2yow3srdzuU98=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore.isfzqkf9h4.wasm",
        "integrity": "sha256-TmsU/+BkDp2TfAX367VaHsAU990n6p/kkUyjtkqD+uc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGeneration.Templating.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGeneration.Templating.83lbsx118v.wasm",
        "integrity": "sha256-fLAJ7PGWwgfaCGRTlgue/+11yiigx52IFxALXWfvCTQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGeneration.Utils.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGeneration.Utils.r5j05qrtj3.wasm",
        "integrity": "sha256-AeLXyErkww/at1ltyZGTPK4k3KnvxU0W9v8+d24ZTG8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualStudio.Web.CodeGenerators.Mvc.wasm",
        "name": "Microsoft.VisualStudio.Web.CodeGenerators.Mvc.f115b0yc7s.wasm",
        "integrity": "sha256-fWAwL9vMqQGvLUPfgTID/UvfflVaz/3rOt6g41P7riQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Mono.TextTemplating.wasm",
        "name": "Mono.TextTemplating.kzb422hul9.wasm",
        "integrity": "sha256-UNDfdehUq+nBEhST6P/jpyMNO7rLZiAm4bgDkhGlQ6A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.qkbufwhni2.wasm",
        "integrity": "sha256-GlXMWKvDs45M2pACoR3Y4Qh8mcrOZGljqmvJY+6JZ5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Common.wasm",
        "name": "NuGet.Common.lh3sqd12ve.wasm",
        "integrity": "sha256-V8F0IOonTOP40j2Cr1EjZYB9Os+sBpHFLoqTgM+2QXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Configuration.wasm",
        "name": "NuGet.Configuration.z9hl3znwma.wasm",
        "integrity": "sha256-SfYu4faPgsvrxIa4NJKpYw7QdG1Dt8uP2hYqVryUiOQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.DependencyResolver.Core.wasm",
        "name": "NuGet.DependencyResolver.Core.e9y8asbivu.wasm",
        "integrity": "sha256-csm9BGUqWa4wAJoTg0BMe7fp7kQbM4B9UW8lqJptKBk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Frameworks.wasm",
        "name": "NuGet.Frameworks.hgo5vjoid7.wasm",
        "integrity": "sha256-70nESGPUBTS8J7UunWMarPnNXz34vSDncwMjkgdQrFU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.LibraryModel.wasm",
        "name": "NuGet.LibraryModel.4f3rg2sso6.wasm",
        "integrity": "sha256-EGKHbq/rxoYupJSnF9YNr3lI2If0Rrf2lP3wtfr9xyE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Packaging.wasm",
        "name": "NuGet.Packaging.lapfk9wruf.wasm",
        "integrity": "sha256-M7onI3MStczSqKGRveqFVyyQM1YEkLJlv0GU5g8jxkA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.ProjectModel.wasm",
        "name": "NuGet.ProjectModel.wish9urxqm.wasm",
        "integrity": "sha256-WISebSFS8y3eAK0WyFtPPgO124sR2u9hlZVxXBnwWZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Protocol.wasm",
        "name": "NuGet.Protocol.pamp67d2ow.wasm",
        "integrity": "sha256-Ic9eD2n6sJkzPquoZYhx/0EWt8DN+ViyVoHvtnhk5/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NuGet.Versioning.wasm",
        "name": "NuGet.Versioning.fkvjml5q63.wasm",
        "integrity": "sha256-j0BBxVnLL4FNZ5tzp9NWdsbjzBWaR11YqUeXjMdEzOE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SQLitePCLRaw.batteries_v2.wasm",
        "name": "SQLitePCLRaw.batteries_v2.vh9uet5yp4.wasm",
        "integrity": "sha256-bUL22xPcTDXGgCAJmi59APb3Vn5OsBBoX0rPDSfHcTI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SQLitePCLRaw.core.wasm",
        "name": "SQLitePCLRaw.core.xkz8xl2v4t.wasm",
        "integrity": "sha256-34SMrsayL0bhoZ4JGGWjN0gYAqZotemwzF8evivgz8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SQLitePCLRaw.provider.e_sqlite3.wasm",
        "name": "SQLitePCLRaw.provider.e_sqlite3.cidb3ql7by.wasm",
        "integrity": "sha256-3EuT9kGxKjK50Qkss/AuRYuEc5IbUEhy3mC1Zid492w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ClientModel.wasm",
        "name": "System.ClientModel.dhw1jmor6y.wasm",
        "integrity": "sha256-T1pFREfxhQaqFL6Vw2apj9rx9kFq+3Z3Ogf2bplL0hw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.CodeDom.wasm",
        "name": "System.CodeDom.d9ed66qd5a.wasm",
        "integrity": "sha256-cQdhJKvu05R+Hld7jJ/zrF8Q63+E29jjQZiyaW9uGek=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Composition.AttributedModel.wasm",
        "name": "System.Composition.AttributedModel.8rzqainyyq.wasm",
        "integrity": "sha256-fAb0jTGrDRb/Ly1IXvoEnYJfrz8MBye4zFjt02nMo2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Composition.Convention.wasm",
        "name": "System.Composition.Convention.jf1zeek5hf.wasm",
        "integrity": "sha256-AciZSrESYwC4KU2/d9UJqwTgDDmOQA5hpmg50sDqHac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Composition.Hosting.wasm",
        "name": "System.Composition.Hosting.e34d2g66uz.wasm",
        "integrity": "sha256-+rdwoU5P89ph2WqlaceKN8T/2juughU2SDidAHby32w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Composition.Runtime.wasm",
        "name": "System.Composition.Runtime.bsv1yrn43f.wasm",
        "integrity": "sha256-1YrFeJPimTz+LDr3jkZmn801FZ3MnrqSgipdwqTdIz8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Composition.TypedParts.wasm",
        "name": "System.Composition.TypedParts.oz2ut0mn5s.wasm",
        "integrity": "sha256-pMd0NDsJG6d31aN31kU1bpOuZDEG7RaYleALWz38k98=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.ConfigurationManager.wasm",
        "name": "System.Configuration.ConfigurationManager.h4r5q8xowu.wasm",
        "integrity": "sha256-b12tS5PK3J7aZQf8ndpxprZkG3L77KegByXvugeqqlc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.EventLog.wasm",
        "name": "System.Diagnostics.EventLog.yy9ehxokrt.wasm",
        "integrity": "sha256-BoHdJ8SQpDvjLLQgL0QaF0swZpTPczHyn3YSE7GnG2c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IdentityModel.Tokens.Jwt.wasm",
        "name": "System.IdentityModel.Tokens.Jwt.28de5g3cun.wasm",
        "integrity": "sha256-jjAptokOXSXKs5qsKrmqiqE1SuTQT3MMuEZf2+qUlgc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.Data.wasm",
        "name": "System.Memory.Data.0l4fa57vc1.wasm",
        "integrity": "sha256-9HJzi9HTlbVv4UJOpWjMcL4XHstwjkbQdwxxP+dUHfQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.MetadataLoadContext.wasm",
        "name": "System.Reflection.MetadataLoadContext.nnw8wlhm55.wasm",
        "integrity": "sha256-U3u8gydOZUoc6SoESSmzZ2WYW8eswfgsNSmoiocshVY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.n50xl8q608.wasm",
        "integrity": "sha256-C/SjRaq6PaUEpF+brzyk2/T4V2T1gzFBtfO94mqVIrI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.ProtectedData.wasm",
        "name": "System.Security.Cryptography.ProtectedData.lqfmzyh7ta.wasm",
        "integrity": "sha256-02v8roui+7f6Snn5FDmsP3YCsgxNX3ITLVLhv2JyEp0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.2j7iu3v556.wasm",
        "integrity": "sha256-Yg/LZxAAi0WIUC0UEPJ/HYew8URFjw3jPyFqpdFhu1c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.clfk6slqt1.wasm",
        "integrity": "sha256-8BES0gaFBf41JDP23l0Md//1h/xQD04B8gRlFpSOZ54=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.2q6vxj10dm.wasm",
        "integrity": "sha256-Ns+N0UpZlenHWtRiOBa3cfz1IjR52iQxUFptPt0HSYU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.3kdfchpnkj.wasm",
        "integrity": "sha256-nU1s3tXGnjWEBH9uAPEwKRz6HODiCacGHaVLiz3gOFM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.aqafta8jk6.wasm",
        "integrity": "sha256-7jagzItR07GSN5uF5NQcIXHvPQ/bGeIM7WHBbKY3jEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.mbm5712a01.wasm",
        "integrity": "sha256-QqtSaj7/hTpMQAL7wEmMCAZoalt+O92Of2mf8rQ7NZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.btrafj4p2z.wasm",
        "integrity": "sha256-T8aweduQz0MboOmGCwI06V/zVvi0oEgAV/ghJ59JUQg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.cnmdi1wh13.wasm",
        "integrity": "sha256-6OnCBg5db4Me0QJB24fgVW8ecVF9Aj71Qi0zh7LWbSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.ecrf7yenj1.wasm",
        "integrity": "sha256-LgeKsJU3wrJkK4+SixdpKRPH2nweJyinE04cvIYrEIY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.lis3txj41h.wasm",
        "integrity": "sha256-47uKIk2q4eaNVUCnuUENNV6VJZX8erAP26oN335O7lw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.ergbhkd7sn.wasm",
        "integrity": "sha256-ZsV/yl7ObDHVV0w2Ws1J8zT1hjpQwcr38wamRef901Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.ygrqigm6f8.wasm",
        "integrity": "sha256-boC1GeUAbLHpcVYxT/t8w+1ThX2xx5yKp931ZDODxsg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.qzwm1sewun.wasm",
        "integrity": "sha256-ej5HHVlvZi+kMTBNwclXdqjsKchLqAD6K4mFCtASsfY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.n4jsqik6ld.wasm",
        "integrity": "sha256-KQ42XEGVTPTCwGDRDQK3gIRVYjXAFDoCgEZYxVLq3Xk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.d0yw4c6x6p.wasm",
        "integrity": "sha256-07fHDsuFydO+OLo+nVbKC/e+A4s4ZcYXpp69/ZAH01s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.0n47g3kbqq.wasm",
        "integrity": "sha256-xPCE3CSkKODYADPJCxg1uLYC9IxEYUS/7Eo2DRAnW/0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.qilz3cjd1j.wasm",
        "integrity": "sha256-sloqd2XGEcFgxi+Mfn8MoRrKyuoeg+lBFUzYFjwq2og=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.suqsao72mt.wasm",
        "integrity": "sha256-DO/ry/6QZAPigngckeuucGwBRm58deeyjb6eaVwgzNg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.qooi6x3ol0.wasm",
        "integrity": "sha256-hpjxcMW4S+aN2JwZ5qa8aHaOTvc6vJ13yccgNllpV1w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.onh3aaersc.wasm",
        "integrity": "sha256-JM7c6ZOIEOAq2/aiBW1SxL275QCxUd7ED0u0ESdlAeA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.8msq42ektn.wasm",
        "integrity": "sha256-oECYVWe+ugLyVPHFESSpF+jFdhBuFRGBGwrbyqsryLk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.5v3o09lxp8.wasm",
        "integrity": "sha256-kX3cgOwzanQzybR6Cqf0HO/xPbA3ffpVGUubzq+Osk0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.8m6gmyla3i.wasm",
        "integrity": "sha256-gAwxomLYnmGlhSfzS3ZkbowpMn5tHu9ampSeDmV+j/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.k99e8vafas.wasm",
        "integrity": "sha256-mJV4p/1uN9DJImFjVikzbSjr09I7UJ5kmFHRQQnHuws=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.q5yvstg5mh.wasm",
        "integrity": "sha256-ri67dc2/A54iNW9+jVh74KF3V8+rgZOtHJk60PP7J6o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.e73pxrxquv.wasm",
        "integrity": "sha256-hoZTb3EOqI/UYR37lmCzTa89kJZiMwtdB7jT3svluOU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.913r8l32wl.wasm",
        "integrity": "sha256-44uipHfSA7Os3yNCt3CfC5Jx2cP/5iK5fqOr/RxysvA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.mgc4wpnhjd.wasm",
        "integrity": "sha256-6hOLgxY/s7WOQJPfNWayVOowwjIl/Ih9QwFMzUpxB9g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.4xxttodojy.wasm",
        "integrity": "sha256-CEL/PkooR9qpSCZBYyAfjDcDY/QcJzhjU19q+9YdQ04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.pxvxlndqsf.wasm",
        "integrity": "sha256-7WAV1fsQ8S4LbcS34jOshEBMbgw5LAMy1N2RFs7xk04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.qxnc8fbjll.wasm",
        "integrity": "sha256-LhjzeoJ2uGpYq6BzzlCoewWVeXdx8pd9X2TK7IHPjwg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.2ywb420641.wasm",
        "integrity": "sha256-djjO3gGW+uyGxVRyl4mzdCb+PjefzhNk3ds3iThQ8Hk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.k6xvztfb61.wasm",
        "integrity": "sha256-RP9qF3ohsH+dAjdnv66pyQLXkVenkdYs7m3WBjm+sCI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.wjohnvfhs5.wasm",
        "integrity": "sha256-jBno5eVmBv0T69ykBx1y2/3t/G2BDk0S36NpPQjiZu0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.d2mik0mq7j.wasm",
        "integrity": "sha256-y0uxbJ/7hUnqXNz+y9Ii13KebLACg/QUPSyfs4MDnwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.qdotd0xiu9.wasm",
        "integrity": "sha256-rt21+gmvwfRtgu5lpAV5sIm3bMK82zJLV5Oy5XhxlkM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.6qget6et58.wasm",
        "integrity": "sha256-0n7Z4shKDl6FIdoQjXsIaF5o16dRPpuFITrHeCyMt10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.ax4gdc0lg8.wasm",
        "integrity": "sha256-EmYshwtlavqvhw3fX1UEdRksZJbjQUvrxrQBzxXRe84=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.g5b0wo79xl.wasm",
        "integrity": "sha256-dGjSoUE0690cAY9J+KH+y1xXY1luRupIPWhdRVi3g9U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.r8fxzsp2ij.wasm",
        "integrity": "sha256-a86FVZCrSB4eX19/LYgcqu+uyNrTANO9msZhE45R8V4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.thg79xn7s2.wasm",
        "integrity": "sha256-QUwdExAwEENl8Q+YcbjOsWRwx0gc6/X2SlCREUh7e2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.qltag2qy7e.wasm",
        "integrity": "sha256-Xizy3tkrVZU0bUd9cCTftjmH/8GWQ5O/zS57+/5bdiw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.4zwxjykq16.wasm",
        "integrity": "sha256-MKARGYiARUAgJWDMELjUN00+68LHdlZ3oBsVRFLm5mY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.ojr7i6a6c8.wasm",
        "integrity": "sha256-NNHKdyYX+5wqdrUX0knOKq3ps31/FPtbxxVEWURy0G8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.fcsb2riizv.wasm",
        "integrity": "sha256-P5JZhSD6V3xvQXuovwz2MM5tT4SfnCb5IK+AYyU2UZQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.beigppa3ku.wasm",
        "integrity": "sha256-I97j4/kS5jMAxrjpJ1qaTX8tnKJ7TlLqlqA8agiNbUg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.1pmwtgpj8z.wasm",
        "integrity": "sha256-5QdETHRmIkti+fpXoaYQ40tuOnPVrTHUUYW2w5yy5v0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.qg43g6mo25.wasm",
        "integrity": "sha256-pn5MtD2tZKTPQH51bqgh7XyMy8qG+yTQjtXFyQOwq3E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.w6ud80pw8z.wasm",
        "integrity": "sha256-6I3kkgddyTjCXIvyZhQOYeaigfKdQwSzezCZA639uEE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.k5jdqmthd1.wasm",
        "integrity": "sha256-OCR2ym/X7Vsi/oNBKJE6J5kn+WRnwnRXWN4B6jdTKik=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.lj3x9l0y1t.wasm",
        "integrity": "sha256-z9J4s3dRaQmoc4CRnFdDV4zZwE81IMABLyVz/NsZU5I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.3qre6nae3l.wasm",
        "integrity": "sha256-JdrB5htytwmUpPatKOMGCQhQol0O3WIprbDHNaro90M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.zh2z1s5v2w.wasm",
        "integrity": "sha256-Z5gDW+AxwDV6Sz91ZBWoDPEIs1U/uaNgi/6GDvl0Ogc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.h60o88zk05.wasm",
        "integrity": "sha256-F5GM/Wi7TpOb1td0Yyvw9VMOmIVH+CiP9Cp5orugGZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.674opc9gz7.wasm",
        "integrity": "sha256-QiTcBYDF4bQd4WvMFo5OODII8j7TrbWRVagxpxkqlro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.dg4cn6yb2p.wasm",
        "integrity": "sha256-jdB4kfJXj2F7zAsPhOWaeGxy60fXFQbCjSWeRm1u7CI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.am87xwi0vg.wasm",
        "integrity": "sha256-YohVTBk4Vjh595TvBGpVy5sm5DcGWV2gusVOcU8tOHo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.44ynb87tog.wasm",
        "integrity": "sha256-jDhR/00Uwwas7aXAVuxDcE7Os1D7MZQ3iibt6zgY0pU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.l20znemtly.wasm",
        "integrity": "sha256-HfoQnO+Y3hQ1g3gmd64oDNLuYCi8kwmdHcBjLQ/LTNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.ap9jg0gri8.wasm",
        "integrity": "sha256-3ocLWCdiSp4ExTFuWq4qAoWtQGGY52ccF0Vi0421CDI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.ls47umv4wy.wasm",
        "integrity": "sha256-+wUMtZPZ8OKQYUqmTPp0i3kzvjgNGi6JBGzuN7vb4NE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.9bsmgjny35.wasm",
        "integrity": "sha256-1WTKHyV/sTo8+Qd6LAyhtDPAYe01Mkjb/qmEBsu5Zco=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.5qj9xl4ll8.wasm",
        "integrity": "sha256-HYHgKMTTioo94zi8V7/FJxun9JjyttkEZs1T4ZZWFxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.ai6opwa1f7.wasm",
        "integrity": "sha256-DrApYluaeIShlJtmSt8sMb7775WbHuHb5g6CJeyg1OQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.bp0rq1txtg.wasm",
        "integrity": "sha256-sbW/uG1u/qCO/LDO2+oSv84H9YA/XjonGrfZlEJCWl0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.xy4zz52762.wasm",
        "integrity": "sha256-6RrffVY651knNCENsYXwFvHwE0Ulmh5DY8UY4siBXeE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.qpeqiwh8li.wasm",
        "integrity": "sha256-AlHcpSYdeLiZs8hcII8hRmdNWpfex4Or4kUS1VOZdHo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.55ix8xx7x6.wasm",
        "integrity": "sha256-5ymu5Lu5bdzla2p/kaHf0mNFNskk8OW6lzJoOxDHGoQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.8yxt4cyzg7.wasm",
        "integrity": "sha256-IGVK1hhbRAoh9ueO28UjjxGbFYXQvDGYV52ElKB6DE0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.0sleczorbh.wasm",
        "integrity": "sha256-wJ2rFMCES01DAAO+TrpTajlNYv0feWZI374Gq2SBOTQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.2hrv0oy9y4.wasm",
        "integrity": "sha256-1lwYFef+pKFlgRcdHfehQ07d0hoGGyqEIraZo/2w5zA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.kj03xa93qu.wasm",
        "integrity": "sha256-gJ6eE/tt7UgExQu6QB6PTjLfaQ064LyLnAa1qYaRTYI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wl4imsj6qj.wasm",
        "integrity": "sha256-LKKrLrvGkDu8pRP9UwRawmo0P6sN2bEATjJaZOGa2EA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.tfv3brxe7e.wasm",
        "integrity": "sha256-F3dcjKnTOzTxMndyVI6VQxd3Yep5dvkmd+5vB31xUWY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.gqvrdsx216.wasm",
        "integrity": "sha256-aIZh2JwhTzZzZhK4bIFSzM/4eGw0qjlY/UHlEl22Mv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.t2rn08tun5.wasm",
        "integrity": "sha256-1ViBNLEdZQtjtwXb10eRbTWlmBHF5VC8/2K2Zb4DndU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.5aqsp31qai.wasm",
        "integrity": "sha256-81YHmdtsT/vgIEKEIPt5qI2s85wXW1HPRdXGkAS+hbs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.eaa4knv6c1.wasm",
        "integrity": "sha256-Fs1A0+mub9d+ZStmK89lUcuVhfmo9ENjURVcQ/ETAHQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.dxxd0et5u1.wasm",
        "integrity": "sha256-AfXMn2F7AOcGdahKEaXyzC2eyorWtVLbe+5PuLFrYr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.y11zk3etmg.wasm",
        "integrity": "sha256-FpCvUG0ZrCQwBZXb8Y229cpqTLV2DM5cHUn/R391pF4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.xvlwz0ng0g.wasm",
        "integrity": "sha256-zan2mMegdY8NCiHjsVGDwtMffMMLt0BogBWTKXmJTfU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.ibettuegv2.wasm",
        "integrity": "sha256-vkJZda/rNuV14Trdy8w/Ef9+4zJKiv/TmETemiP5VYA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.w4e30iqaus.wasm",
        "integrity": "sha256-sO0piiO8AN+S4mjckxCxp1I9VWtmN1SMAp4ks8CUlig=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.jrlxrwocpm.wasm",
        "integrity": "sha256-b+cFnyKEbX1encopuo63znb16F1d9bC/d8E3VpNdTZw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.9ktwntvi8p.wasm",
        "integrity": "sha256-VyeXwOCX663blqbSl4mq2l8y8d86eTpxFX2ZnVXJr48=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.cz2ltdm4gy.wasm",
        "integrity": "sha256-WPO8td7q9uos/c/Ws+oonW65lC1y7g1FRhFi5C6kvvU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.w2gew8zq0b.wasm",
        "integrity": "sha256-GMfOla7ylgXgyIjTJoB0MRYcPMzeeL0lSJwcGcWX+DM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.iraup2now7.wasm",
        "integrity": "sha256-/gIo6qCL+Nx0JBPNadYGHIZPEhkRk45VfdBFqa/sHOg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.dgagfdz6f0.wasm",
        "integrity": "sha256-E/TVeWqhsi/z+RF168faQB/dxl1RSA9nxzO5H8fScDA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.mr23zx9usd.wasm",
        "integrity": "sha256-wmfFf+5xIpE7hpoKi4gRjMw2V6hnNZUNps2rJsAhHIY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.s50lpzuqqe.wasm",
        "integrity": "sha256-EHksQ512d41qID72cSl5gDq8QlxA37xzefa8/ALMEZw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.e7y4spbwi1.wasm",
        "integrity": "sha256-1ilRcA+m5wSD2zKmzK5jL4nVwRhzoaR+mosvXFLzno4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.9hj5iinubm.wasm",
        "integrity": "sha256-3bv5biavw2U7fCZ28ikIEYUz1znd0tc49xhudOiD+UY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.gi1mrnrqow.wasm",
        "integrity": "sha256-KJip3oT4XDha4Kl8XsT0I+yTsPkqnFW4xQWGCDnVB6U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.v33j2z85l1.wasm",
        "integrity": "sha256-ewRuTVBvvXZcI3Y9bGavS+qYxztmOrFp01wsHWyvURM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.044xtlpgb9.wasm",
        "integrity": "sha256-8CuWgRPRvfu+GhyyqQjsziWy784XL8Pg4n60r7q/qK8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "law.wasm",
        "name": "law.bwcpwm0fi7.wasm",
        "integrity": "sha256-iwV0sqdreJEngP0T225PKSmAoqNeGIz325QKvJQIpaU=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "af": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ywrwvesg23.wasm",
          "integrity": "sha256-UozObN/nJbtHBJtAq/hmLsMYu3TgQT/EtRkjm3pnXk0=",
          "cache": "force-cache"
        }
      ],
      "ar": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.08lwhm08x4.wasm",
          "integrity": "sha256-cPz3C4+g2MIAQsM6g0bJZbFXmyBvQbUKHR1aYj2qgPY=",
          "cache": "force-cache"
        }
      ],
      "az": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.5zb07tir5k.wasm",
          "integrity": "sha256-X+gSZsKwqWPDYlMh9HLYz3XWj/7mNUvfkMPzP2sjzHs=",
          "cache": "force-cache"
        }
      ],
      "bg": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.keu2vgecoa.wasm",
          "integrity": "sha256-bKXkMdf5H0Q1iWXwwysS4+K1bHW7Ylmgp79RzavSekY=",
          "cache": "force-cache"
        }
      ],
      "bn-BD": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.yd1vj196sf.wasm",
          "integrity": "sha256-OkDz+ggtD1zsA+dTwOXlLFZSZ2tZNEkZPZFol7uqL2Q=",
          "cache": "force-cache"
        }
      ],
      "cs": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.q8y6o11u5x.wasm",
          "integrity": "sha256-2j5qMd6I9xtUS56KMyVt8L4ACT3DDA793yDsw30eyvU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.k2w3mhwa07.wasm",
          "integrity": "sha256-5AAoE+VEEKjOKppvnO0NXWR+FfDFviAAz6dirSZXXkc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.xfa6pu1alu.wasm",
          "integrity": "sha256-owSBVY320uiTlbt4DYYZnH4X76tZBdbWYGhiA1Sd9jo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.qdpcnisecd.wasm",
          "integrity": "sha256-fkozBDhThIJa1b00rGb1QEtpoyZlMCJaeMxPpBUS0Ao=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.twnsm9mflg.wasm",
          "integrity": "sha256-DSK+odmVy4U/72dM+VWe5ACOHs/qFWWexAJ7BtbT7Mg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.c15zqhjgro.wasm",
          "integrity": "sha256-QHIFWSKIetlEKjnePN9plbRjbtO30jBSp0FslbQeBFQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.sn2qvr1i9g.wasm",
          "integrity": "sha256-+Orkw1MAJlormfgJIWPW3nWqOe5H92vpuSK/P8uLqSM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.19kzaraf2j.wasm",
          "integrity": "sha256-RUdTeKysikZvzJmLdfWhz8xz2vsYBT+WxCvM+zxhA+k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.cv3kkqekbn.wasm",
          "integrity": "sha256-aJMlky3rCH+E8QzfzD5h+omqNpeqePcCFn/NLFbdfSg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.vjudo1cua3.wasm",
          "integrity": "sha256-FSi+F84+H7Hk1z5JPe82Px+mBi/k8J0Ycv+hMzsJ+fc=",
          "cache": "force-cache"
        }
      ],
      "da": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.5dv2k4sndm.wasm",
          "integrity": "sha256-t1Dgu6lg4D34lt1M+ia8HgcknKi0hhm+Ngpe59TmHUs=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.t03mf22q2d.wasm",
          "integrity": "sha256-zQ+8ml5PSWZJ1RvDWwJ7O3F3IN5yaBst5FXEzVNCi5A=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.jrul1nigrc.wasm",
          "integrity": "sha256-/ws8akfgIPA946chWhnykIj60oqzui+aI7PiBvYc9gc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.f2gywvfjln.wasm",
          "integrity": "sha256-Kc4HSwAO5vK29dkOuhT//RP6bv4RFv5x3JbDaYRe/OE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.cwvz2fex1f.wasm",
          "integrity": "sha256-xHVd3+fRb9+PgutNWNQMKp1RloWgN6zbKb03FAIrrW8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.qiezfgxkoi.wasm",
          "integrity": "sha256-vgzOC83AWxeAvx6JfW8Rfzx9rVDUdiGaKmSCEvAu0f0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.kbpj3as98k.wasm",
          "integrity": "sha256-EK4MorC7cYn/ouTGIbD7HrXRVgRpX+E+RlSfbn4250E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.40nghs6zcy.wasm",
          "integrity": "sha256-jGZ1FRGzpV7RU2cmjVempuqMWWvA8h5MlDPkdkGwYfM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.fr7rfz9kts.wasm",
          "integrity": "sha256-9TRG9OgsETX0LzlmmYw2KTrimnBR/pVdD4nTm983eC8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.crodqlhbge.wasm",
          "integrity": "sha256-mFz4OFvSRwVBIfF18k6cVve6te8oGA6xRvut3/CDkGs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.nfz5myq13k.wasm",
          "integrity": "sha256-o8BKau5ps7cf4itFVzwtUT76WXP3XehZw+lbFpr9iUk=",
          "cache": "force-cache"
        }
      ],
      "el": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.nih12fs4d0.wasm",
          "integrity": "sha256-76zvto6/sqg5KHOLMs/iqLiFs00dUcbxI83PebcFYyc=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.jrq89ok150.wasm",
          "integrity": "sha256-gT0zPjc1y7LDuYPgk2A8/Ekof4ONr+29X3oZtc56oGk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.gs17fo235q.wasm",
          "integrity": "sha256-0LPqXNHrSpxy0auus32GhLiEWOrSpOk4X3dLIi0IdWo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.hxim79cv9u.wasm",
          "integrity": "sha256-VbQC1BlGdcNw7OQRzt+hyN9vno7v9vZ6MmmFONV9Zhk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.5hqg541ube.wasm",
          "integrity": "sha256-CS/0HxUCgTAOEOnv3/pEUX3yFN7reSQv481H4Yy1uRQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.2fps4apfsm.wasm",
          "integrity": "sha256-rqsHaOyox/ciiTtZo5xV+9xkznWGPKgVf1p4PITQ8zQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.ijw6gm6ae9.wasm",
          "integrity": "sha256-PvIzqI4Ztd5fL+HMdZ9TLD1j25CC9DcjzqS7vGgwSOg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.65evez8pg4.wasm",
          "integrity": "sha256-pqwhiBSc56v4s6BZuJiwjhTgWaVS77uYlvtgN3rGZUY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.8txpr7w59n.wasm",
          "integrity": "sha256-lNHQdm2nofay47a5HX+Q5H/bT4EtLg4uOVIEilIPB0Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.k7jxpqmyw5.wasm",
          "integrity": "sha256-gCBBkh8ifP1TrupN52BkuP49aCAujO3ngIfodEpqum4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.7e021n5o5n.wasm",
          "integrity": "sha256-fxsSpnxfv3Yd0i8pFwbWiPXpOjKQXTQM49O4G9kn5a4=",
          "cache": "force-cache"
        }
      ],
      "fa": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.fxz7ce5yoa.wasm",
          "integrity": "sha256-XfrxsHd1I7zwCMVM0STl8pS48PZ9+b1zKmHUpvzn77k=",
          "cache": "force-cache"
        }
      ],
      "fi-FI": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.6pkyhabkma.wasm",
          "integrity": "sha256-tpn4OXPdO7i6qTfnBvbLzgvrpABUKvz60gY19yH+kh0=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.jld8u0ff47.wasm",
          "integrity": "sha256-KXuhfaGwrbfw/UBqrDIZtwJbyqmPHApO2gTmPTXqGfs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.mw7bxyd1cx.wasm",
          "integrity": "sha256-OmpuoghrvMmkX6qg0xZBDL/zieLnPaiUNXC537v5M7w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.nxyt3ca9i7.wasm",
          "integrity": "sha256-5Tb5QIBz1A7O5D8ZZXkNEEHVO4aP/QXTkWSdh6nuiRs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.7pdyt8fhgw.wasm",
          "integrity": "sha256-2wYp2b6fFgNxI1qft7Rj30+uXkgmy//zQy7NCL+Dax4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.1jmchu9kgf.wasm",
          "integrity": "sha256-DXYc6cSMnYEKjjlU10z4ZDKIR3rJw24PNkFQjVAg/Rc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.b7ms7pcwbx.wasm",
          "integrity": "sha256-mXVSoQG7BAaGo0AL+87c6NUnOZBG0z0cGtxS1JAqgBA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.3nx1b6own8.wasm",
          "integrity": "sha256-cVysxdjgvEORl2+0/Ab4R1GvF3VnIyODSUoBkqlGBrM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.0lbw7v84lk.wasm",
          "integrity": "sha256-pMUK2zqFZZojYeHAO+2dCWPDbz1/hNlDhbqZHoCZYkk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.yowv0tuo2u.wasm",
          "integrity": "sha256-QivPJ/YezckRb6Fcjb1jHz7bXKxTAN0PaJd20Q/aCuU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.vd5zj5snlp.wasm",
          "integrity": "sha256-/VLEHLeiBKmN2SECeotijHB0LOt4P9s+4CIgotkcGlQ=",
          "cache": "force-cache"
        }
      ],
      "fr-BE": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.f8dcc3l1ov.wasm",
          "integrity": "sha256-ASp1TcDgNDn6OMz8uNSkB6JVwMm5rFjbNNT6Z5/5vZY=",
          "cache": "force-cache"
        }
      ],
      "he": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ukpui6v0i8.wasm",
          "integrity": "sha256-AgmIPoEjsy+/L65Lv4yixlVNUO+mIF++2Y32TuzE8Vk=",
          "cache": "force-cache"
        }
      ],
      "hr": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.3g8wygbks1.wasm",
          "integrity": "sha256-w0RLaGQfx8kdEcOqGu7sft5+gtJjXRNcghKgRepEpds=",
          "cache": "force-cache"
        }
      ],
      "hu": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.vwflxailoo.wasm",
          "integrity": "sha256-z8yp3y66FEsFRrpAZigkc+7v0HzNrPHXy3wq8DP8puI=",
          "cache": "force-cache"
        }
      ],
      "hy": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.3qkyq6ys76.wasm",
          "integrity": "sha256-a++gj4S26zxWAtjz5lChhrebzBeC4nlgB3I4iwsYPGo=",
          "cache": "force-cache"
        }
      ],
      "id": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.r6xg1jjvkb.wasm",
          "integrity": "sha256-/Tb4pfzLla+kwJHZrDW42keI3m4CmbLyl9Gtd74gBWQ=",
          "cache": "force-cache"
        }
      ],
      "is": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.oord4j94xg.wasm",
          "integrity": "sha256-aA08IGvcbcl1pHPs7v5oXu4rfD0I/BfooSbzn2NXpsE=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.oymmm1g2un.wasm",
          "integrity": "sha256-wBf2up+MSjxgBgNG09dUzHqgTssCGQO76VOgAvIpG+U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.k2wkf7t3s8.wasm",
          "integrity": "sha256-XFqlyThLxHRA7uL2blMZ5Y6Sl7Ftz8JOdtg+GTy8ItY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.iq2tgsxh7r.wasm",
          "integrity": "sha256-5vygcBxPavXTsMvG3TIBjKY16wX9SXdB+1IpyMYqxE4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.4ny8oz3evk.wasm",
          "integrity": "sha256-oGpafQqKRZSf++HK7zIunyT2kvmFZzqCD+ZJYi7bRwk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.puwdb4kxhw.wasm",
          "integrity": "sha256-bx3tYLvEpOfMviXmUR9pUTILukdj+VBodw40bBvf7ks=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.t4eilw3q16.wasm",
          "integrity": "sha256-84IbSmJMvoPdOmHsoJXWByRyycGZs+EY+1GE/smN4yU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.121hjecb3x.wasm",
          "integrity": "sha256-Z3W/UmJjdN3ggsSO1OCxce6hdPTRRdW67ooqEHoSvwM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.zt36s7opzu.wasm",
          "integrity": "sha256-5zBFIBWPbjFeCLw7Xsd9ZB7wdNEGLrSeZMLM8g2G+Is=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.za7femydru.wasm",
          "integrity": "sha256-uxg4yabz4wJF9hdq+mqpF4Vbewns7FAATF/IYAe30Oo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.w99pdtvsr6.wasm",
          "integrity": "sha256-zFMHAWepw0f8oIc3z5BAPPmIYcGZ5KnB+JZSQLQi+Pg=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.6kpv4etoxu.wasm",
          "integrity": "sha256-Jt+1OoIGjy5v+Ab+cwlh2lPtM6ZaBLzyW+/5L2lsVug=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.6ydrix4n4z.wasm",
          "integrity": "sha256-XvVDR01x6RN6BdmeIa/vY/cGPgvqliwAHfqdDzSDJLk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.oqxcfypbpj.wasm",
          "integrity": "sha256-MEPSNbRhBo7LLZ0+q1/Tj1FxfRGb7r89FFzIcbtmdu4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.nri119slon.wasm",
          "integrity": "sha256-Q3pPAm69GcEubo75OTMN4hQ/5T0JsSe3GNWsPBvGBBc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.3kqyxpifwm.wasm",
          "integrity": "sha256-DaBi9Ajg2O6c13kHbmxP+7KbgS2pfZEcJnoHkoaouaY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.bqlj0ips7f.wasm",
          "integrity": "sha256-wwx4rE3ukrkkKXZdCbLBi5gRk6GIjRiixPJP2UCMfjs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.ovohcrzhso.wasm",
          "integrity": "sha256-zB9jX707d9a8s1VqqBYIrfRc2I1baqKz7Qfl2+jg6J4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.93fwyaqel7.wasm",
          "integrity": "sha256-Zf4YQmMVCxgYGqnkz9QvqZEg2kMJjsIhFEobDw/0Azk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.ou1ynflc69.wasm",
          "integrity": "sha256-IF95bXWBN0Xbq8IPia6WkOO6s/InX+Xe3orFp7/TW0M=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.d96ga19on9.wasm",
          "integrity": "sha256-T/6gpI0JikjkT84l4puHA/W2uiaVExbIZ68Lm12X3os=",
          "cache": "force-cache"
        }
      ],
      "ko-KR": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ex9kuvzipn.wasm",
          "integrity": "sha256-QtndGz3Vx/FWp9KQw917csUEYfk7azflnkQXBdDhvZA=",
          "cache": "force-cache"
        }
      ],
      "ku": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.nexaas4i8h.wasm",
          "integrity": "sha256-n8HaK3GxOMtG5jmwRoJJRwzfqxcYxqfLWMr1r/3ivf4=",
          "cache": "force-cache"
        }
      ],
      "lv": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.xdej2op4al.wasm",
          "integrity": "sha256-lQFQDjbbDr44faO7BHM7lYhQZm1d9nn1FlTuW1VMpZU=",
          "cache": "force-cache"
        }
      ],
      "ms-MY": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ufc4xb6t09.wasm",
          "integrity": "sha256-BnseVavWPi6n6D1AABnyd5GEOZJ6vkJ04f9wbO7RIQo=",
          "cache": "force-cache"
        }
      ],
      "mt": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ma6alnalht.wasm",
          "integrity": "sha256-Xg+d2/mQyQsJy/IwgR0fMm1mS6UjKn4ToA2fSJX5g24=",
          "cache": "force-cache"
        }
      ],
      "nb": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.98o8mk9dvy.wasm",
          "integrity": "sha256-V12pAdCWNaWzFBdxIfn02tFWeUWk49sYk4KlCVcrZOM=",
          "cache": "force-cache"
        }
      ],
      "nb-NO": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.rogm8n12qs.wasm",
          "integrity": "sha256-+1HXsYGRSfxjLXsXQyrTwR4Agix/wkupLRN45AReLeQ=",
          "cache": "force-cache"
        }
      ],
      "nl": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ws050cy5d6.wasm",
          "integrity": "sha256-UKNfhSyDO+oUNpLcNduXGzSnjC7DpEjsjB0H26CgDQQ=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.oqjjs4mojs.wasm",
          "integrity": "sha256-sHb69mSVx/Micfvhj0jTbVwZ+xy3gIH2EvqXsROd6ZQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.aozvshmubu.wasm",
          "integrity": "sha256-ptmMN4yy7w33vNswuxcAGfRZ3bU+fb+OPLTEYaDYWMc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.s5wqb5jumu.wasm",
          "integrity": "sha256-UPSZbnzGlFMo0zVa/HJFHpAMg71T7QXE2hJOzR3Phbs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.6i14gp0uq8.wasm",
          "integrity": "sha256-nnRsPh2qFAIQA76cNOA1XHRpCnYGkfUOkoyQa0yNiwA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.7vgwd3747g.wasm",
          "integrity": "sha256-nVkS/MOcBS6Titt62ZcZyufKaaRWMcD5O8R46llSvRo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.39v96ecik1.wasm",
          "integrity": "sha256-dwRjMvAflqAIr9Jy7U701pMffzI8+ozthVDNh46VGM8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.agdy2g0p6f.wasm",
          "integrity": "sha256-ZsUzzVU1VdeEicfI1CD1DpR9ifSTkzRMfCdznYeaSlc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.kddnrje2p6.wasm",
          "integrity": "sha256-eCr/kTEM/lEQgRTKfKtnQpXvPZM7RH7sFTQtP7yglW0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.pslgfowptw.wasm",
          "integrity": "sha256-WeH+jRFBsqh5WwAUktlesK0B4uWfAQMNgJhr7Cn66VM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.00y9kt52i4.wasm",
          "integrity": "sha256-YAxGdZY6uqxpWKQqOxqEREcPhpPL0Imhx9c6RneoW0Y=",
          "cache": "force-cache"
        }
      ],
      "pt": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.d8x2eywis5.wasm",
          "integrity": "sha256-vSpVrCLvpBRYUYufqzpQsERiNhS7u7va6ACxC+mt/Yc=",
          "cache": "force-cache"
        }
      ],
      "ro": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.glyxyqc2ju.wasm",
          "integrity": "sha256-ZHdwhCpZw9cgeRMQ8jPItEd9zl9KfWZNdGOpgG+JJRM=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.d1lu9fxbcr.wasm",
          "integrity": "sha256-AdvBXIOYDqEEVZ9oG+8byqzIRx0jWeKMq+WX8mrKr80=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.jrtuwdet4j.wasm",
          "integrity": "sha256-0Xnb8+I6FK+UeuOIXmECjBa2JXg6A242nqE/3WxwJ1k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.dpk6yazkd5.wasm",
          "integrity": "sha256-UaiTpeLfoLlZB7k+dztw4YOwh2R/yUY+LQ/4uE4LyDo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.c7wraty186.wasm",
          "integrity": "sha256-OOZ4XXlHDA2/A8nMWJJGpTgwigUXH7DuaGXBI+m5thI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.6o8h5a7s2a.wasm",
          "integrity": "sha256-2rw29vx+wnLc6ays+Dr4/MfOewDWP3wE0UEaTwyh3S8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.5zci3lfhwm.wasm",
          "integrity": "sha256-MZklHuHHVR0yXPI5GZxTN+ZjtfV98/Osr6v1X+QKrP0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.62rhgh8khm.wasm",
          "integrity": "sha256-wujFbyfrtSfMjLwlsqOl2mYl5Glq9BH4Rvdny5NN9hs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.5cfnmmqxmq.wasm",
          "integrity": "sha256-ZXvqXJrbrtpzoDczhp+ACXH8FidftfRPKcEArQwL3ko=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.4xnsxz9p24.wasm",
          "integrity": "sha256-6JorZnrOow/o6vfM1xO2oLvDkHCkSCMRmHk+Am6nlU8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.jqczzrbiuu.wasm",
          "integrity": "sha256-xVWqf+QUPN+Bo1s+GoMhlwlRy5P4SIB6Puny4fEc8IQ=",
          "cache": "force-cache"
        }
      ],
      "sk": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.w0gjf8tocm.wasm",
          "integrity": "sha256-IMm94ewOt2W6N13QDu7qY5xHX59RN4pTY7aS+4MGMXc=",
          "cache": "force-cache"
        }
      ],
      "sl": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.r2dfz2kgxi.wasm",
          "integrity": "sha256-DYWUlrjIA6ShaKLOWVI/DSjsKP1hrAQyj+PDjYoOCAk=",
          "cache": "force-cache"
        }
      ],
      "sr": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.0h2azbzz6z.wasm",
          "integrity": "sha256-BCpRmua2NzkdLnAsfHz/40Fz0VTEcB8XYBvCfHUNBKc=",
          "cache": "force-cache"
        }
      ],
      "sr-Latn": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.nn1os9gypk.wasm",
          "integrity": "sha256-nQFzXO2588P32NuMYf8oiUzL9leBncKlTiNYnQMoTaQ=",
          "cache": "force-cache"
        }
      ],
      "sv": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.iij93kdpgf.wasm",
          "integrity": "sha256-Co58RPWrW5pvV7W3rzMohq4LqPZihpkGyY8BMheZVK4=",
          "cache": "force-cache"
        }
      ],
      "th-TH": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.9uodhglzl9.wasm",
          "integrity": "sha256-/z/AEMPdo/Lof27+xwJFcVOsJaz4fI4gqWpJhjvyADA=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ne5gk0am3j.wasm",
          "integrity": "sha256-XzPbQCxog3IjkVWkQB1J+vv2dF/ZTfCbVGdZAzOVu/w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.supgpk80d0.wasm",
          "integrity": "sha256-HBDpI1dSfTKUI/LMl9LtFInbN7GMcHa0u+/Q26DeFGA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.uizefrs9ny.wasm",
          "integrity": "sha256-VmZv/UnPi7FPtmNb6KSyKSy/oT5u1RsDPKIkQNSgErg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.val0dn8noi.wasm",
          "integrity": "sha256-KWt9B2rVe9iCnY+3vWSx2mminViTFipV+4UPjoSngfE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.3cpfp24kxn.wasm",
          "integrity": "sha256-A29HTkgCyRY6F4NtY01GDQfQIIktLmWoluEWSyP+A6s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.iyr5wrepit.wasm",
          "integrity": "sha256-yqgkBYQLbr8S+m87VHUiXNhjAn6GHU8bvPn9MJPpbCI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.pfa9vggdi2.wasm",
          "integrity": "sha256-FZxf3BRmrSEGBd5FDXO16t3lLJBf/6USTyJ3ndV8MG8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.uphkrecjin.wasm",
          "integrity": "sha256-TvYmqtEe4SHWyXEOsAD3XkdfNFV4cvB0eac/AmDHE9Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.pxmvjwyvh6.wasm",
          "integrity": "sha256-Iye7Ik1JfaTcImWWIF//y9n6rNk/Te4HjFNhmpf9nBA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.jhesb0um5v.wasm",
          "integrity": "sha256-V4McUi1vbdwEu3qdlkXXm0kIT3L66LlMP182hmxG0Xw=",
          "cache": "force-cache"
        }
      ],
      "uk": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.4151316kki.wasm",
          "integrity": "sha256-uLb77VEPwwswHCjRDIhleORPsYG0Y932hwkQ+waIZLc=",
          "cache": "force-cache"
        }
      ],
      "uz-Cyrl-UZ": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.td864ka74i.wasm",
          "integrity": "sha256-8SMmyA3xR+NVD6ex9FdIIMZClXJdeGp+jkygmly90HU=",
          "cache": "force-cache"
        }
      ],
      "uz-Latn-UZ": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.cp8ql3zh50.wasm",
          "integrity": "sha256-cMDMwRTBdo/gKMJhFroozr9K3dHyfXGtW+CqU5oFW40=",
          "cache": "force-cache"
        }
      ],
      "vi": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.ir4sqco03g.wasm",
          "integrity": "sha256-4m6VXMY4wDb3zHuBEfQu9snJsx6k1uDwkoqmtlRTHLE=",
          "cache": "force-cache"
        }
      ],
      "zh-CN": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.uy7ybe2iww.wasm",
          "integrity": "sha256-1t91tAlrH/xAebujX3ICxUle4jFNxWVeC8sXELOc1A4=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.70a9vrmqxy.wasm",
          "integrity": "sha256-GbqYdsJ017u4dzOpc108MB+ZUDJu3Tl6CCr7lkL4HrA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.uoqbwu4d5d.wasm",
          "integrity": "sha256-3jN67QIzaCYlN25M3byvmhrUypuE8F57E786mKscmB8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.hx2jjh9mf9.wasm",
          "integrity": "sha256-a4OiCzt7JbjlbHS49JCgCY88sQLiif7HS9hKIfUKj7s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.vkvnc8hvty.wasm",
          "integrity": "sha256-YYQHPgl8RHGW9P7dOHT621HrbpndtkSfd+gxwSN9ofU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.fs88kym2we.wasm",
          "integrity": "sha256-geU/R390Fg/DPw4EbOze7yy5TVnti6+PVJmex0ZSbSo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.d83hf2af6h.wasm",
          "integrity": "sha256-Y77nXU60Sxr5ZdHJfTnTzFXdDwuP80g/AQ9AQQ8aMyI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.wcis26xolh.wasm",
          "integrity": "sha256-8HX3dKzWbY4lrANnUa1wSokZgJUBMk7vRgMPmfvLFKs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.7horqp1cux.wasm",
          "integrity": "sha256-Vd3bxvKNtYGElc5RwOQP4bi9g2XzFt6OAu0l1EhrE/Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.8mb1o5zwdm.wasm",
          "integrity": "sha256-8JI2eRWXzJqBVxlhn0D++Ybwkik7tWMRUDFKtBBPVG4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.utbpxdep3k.wasm",
          "integrity": "sha256-Ij0EJyXmEzkjeIBxPTxAvjF2BxeO39fVI8kdei3Ae/4=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "Humanizer.resources.wasm",
          "name": "Humanizer.resources.q9i86svuax.wasm",
          "integrity": "sha256-gsspeIJXoA6eVisryHyO6hXGq0jNTgw6XpCzvT4rLFA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.cw5kdl8sc3.wasm",
          "integrity": "sha256-3Hv6IJP0lj56wSIUL0jYPDINIz1sLup1I5Tt9uwIlGU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.nlbexjoxba.wasm",
          "integrity": "sha256-xSB7bMK5Y8KOYtZjBTJ+ysPnxrkmH/a0TcaQmldtABY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.cdhhs6ar0u.wasm",
          "integrity": "sha256-0Lk2imKEIWeyB0vGlc+BEJjl+hg54Z44TP4f0DOTKbc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.ra50fj1r2c.wasm",
          "integrity": "sha256-04XcBRjXn+IKppX5jACWNYk2wDXqH86RMNi7pcWjeEY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.nxporq94bz.wasm",
          "integrity": "sha256-tTPubffZ2JSG1aGTUcBuoxOe0OJpWQyObYzhcOt+jwg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.foj0h5m4eb.wasm",
          "integrity": "sha256-YVeIfGqAtwS6WJyxSzXaH1Kye5kxHij3p/SiN7dGsbQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.hz9zb8k7nm.wasm",
          "integrity": "sha256-s9fnrOJAkwfS27dcYcdKwBrg2SNKfPa97nG8zVjmqGU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.hqod611hs2.wasm",
          "integrity": "sha256-h4f8PPB3ybKDPh7B0KFrFgKf+VWKLyFSFjwWZILls+g=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.9forqk3e94.wasm",
          "integrity": "sha256-ZY6wmJdtCgsbTG9YTW04eGc14VVKhDdGXE7uqTIRSEo=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.b1sticklb0.wasm",
          "integrity": "sha256-L7VVAX3VTvIgZU474lTeBHgiuQxYl6NmSzRF+cmUjnk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.dqtqrrbrjm.wasm",
          "integrity": "sha256-BdBnJdWVGophql3s9sQzqW6bchfg8OjbbAZHnXGejmo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.uipdupglba.wasm",
          "integrity": "sha256-ihuMBYar4TrVrYyiBFugjrvi1JIin2+lV8of+lpO6lo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.bp234bdujy.wasm",
          "integrity": "sha256-ke8XtUf+4m25xP0Qs39ryCS235nJjz6WizZMBy7lNeM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.oblc4xhbwo.wasm",
          "integrity": "sha256-9G77J6tFWip23BpXV9lJksVHiGP3a4XJ8jUjyvCtIS0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.rvzrub8vpe.wasm",
          "integrity": "sha256-meei78KB2VXE8H6VIlbFOB/UBaGQFBhXsIrHad7slv8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.5ocsmx07ez.wasm",
          "integrity": "sha256-JelEuFlE08AMeqsWE1PR9+jwtieO38o8hEo9z/wC39s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.9chvrlwsm9.wasm",
          "integrity": "sha256-idh0Z+XXhxdWr9sBKIJnht/kRwQ4qX7vF/Xm2sVp/GU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.arkfoxc6k6.wasm",
          "integrity": "sha256-Km3YZBl53Xr0pyLJdPahjvATvXtU8F2dxzDz+tkxnBk=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.wasm",
          "name": "Microsoft.CodeAnalysis.resources.zv156ps1rf.wasm",
          "integrity": "sha256-MZ2Nk6Px9uy5e2UyGvLKtsWhfNoJpEhTF2kz0OiBbZ4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.1nstpkpk8i.wasm",
          "integrity": "sha256-PU9QBM0MrfNN5qb6TDaoyTpi4zH9mfqLq9qtsdPxjrc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Features.resources.zaj5nrgpz8.wasm",
          "integrity": "sha256-BQyH6/MUF2/0iqdycG/JrheOEuQwkL3SOyIfnrvysR8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.CSharp.Workspaces.resources.y8p7o1wypw.wasm",
          "integrity": "sha256-krd2UIEhG7t8HHty4nyHAljVnfn6gqzBn1We1gAFQLk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Features.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Features.resources.sv32o80tke.wasm",
          "integrity": "sha256-KPj2G2ZyXIB1B8fI/6pxkBxQwn6abg54ezm7jCCVacQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.6j73lkoesx.wasm",
          "integrity": "sha256-4k2yF3/xzj1P3kVsp6LX0VDGCzxXNRKSSeIq9+PbFh4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.resources.7y97jvbmw3.wasm",
          "integrity": "sha256-4dJOQ+FOZPLjj7cMIF6s5MlmNRJOjmLaUPO/Nn8MF7U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.wasm",
          "name": "Microsoft.CodeAnalysis.Workspaces.MSBuild.resources.87m72s17r4.wasm",
          "integrity": "sha256-3JFP7R5ZkaDiCxMAGyEly7gMBRnYgO0DkTzlaJKl6RM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.m3ku9s19ra.wasm",
          "integrity": "sha256-Qqo4wloD+eML9m33bDDEkuzedosZujF4ITrtwNtvoMU=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Reflection.NullabilityInfoContext.IsSupported": true,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
