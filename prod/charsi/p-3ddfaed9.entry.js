import{r as t,h as e,H as i,g as a,a as s}from"./p-3827736f.js";const n=class{constructor(e){t(this,e),this.hide=!1,this.listArmor=[{name:"Dusk Shroud",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/quilted.gif",min:361,max:467,socket:4},{name:"Wyrmhide",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/leather.gif",min:364,max:470,socket:4},{name:"Scarab Husk",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/hardleather.gif",min:369,max:474,socket:4},{name:"Wire Fleece",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/studdedleather.gif",min:375,max:481,socket:4},{name:"Great Hauberk",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/breastplate.gif",min:395,max:501,socket:4},{name:"Archon Plate",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/armor/lightplate.gif",min:410,max:524,socket:4}],this.listPolearm=[{name:"Thresher",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif",min:12,max:141,avg:76.5,socket:5},{name:"Giant Thresher",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif",min:40,max:114,avg:77,socket:6},{name:"Colossus Voulge",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/voulge.gif",min:17,max:165,avg:91,socket:4},{name:"Cryptic Axe",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/poleaxe.gif",min:33,max:150,avg:91.5,socket:5},{name:"Great poleaxe",img:"http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif",min:46,max:127,avg:86.5,socket:5}]}render(){return e(i,{class:{hide:this.hide}},e("div",{class:"close",onClick:()=>this.hide=!this.hide}),e("div",{class:"header"},e("div",null,"Bases")),e("div",{class:"items"},e("h3",null,"Armor"),this.listArmor.map((({name:t,img:i,min:a,max:s})=>e("div",{class:"item"},e("img",{src:i}),e("div",{class:"data"},e("div",{class:"name"},t),e("div",{class:"range"},1.5*a,"-",1.5*s)))))),e("div",{class:"items"},e("h3",null,"Polearm"),this.listPolearm.map((({name:t,img:i,min:a,max:s,avg:n,socket:o})=>e("div",{class:"item"},e("img",{src:i}),e("div",{class:"data"},e("div",{class:"name"},t),e("div",{class:"range"},1.5*a,"-",1.5*s," (",n,") [",o,"]")))))))}};var o;n.style=':host{display:block;font-family:"formal";color:#8c8875;position:relative}:host .header{font-family:"exocet_big";font-size:24px;min-height:40px;display:flex;align-items:center;padding:0 15px 5px}:host .header div{height:100%;display:flex;justify-content:center;align-items:flex-end}:host h3{margin:20px 15px}:host .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}:host .close:hover{filter:brightness(1.75)}:host .close:before{content:"X";text-shadow:1px 1px 1px black}:host a{color:#8c8875}:host .item{display:flex;position:relative;white-space:nowrap;background-color:black;margin:0;padding:10px 15px}:host .item img{height:45px;margin-right:5px}',function(t){t.Runes="runes",t.Uniq="uniq",t.Set="set"}(o||(o={}));const l=[{name:o.Runes,id:"2PACX-1vS2xluOJ3R_-Jkeq9ccg_DXLwu5zBBpkeoV-oBq32SQ1SSRp6SdPTJag9l5yQtKpy5oqkaqV6HW4k_s",gid:"1373699183",evolgid:"439801429"},{name:o.Uniq,id:"2PACX-1vQNlcp78PZpjrinRpq-IJvaDQN7N3RVgm61ottyfR6cj8GBygUmaCQYpzFjIKkAXAGFfkr6hjnoMhP-",gid:"926954590",evolgid:"672145742"},{name:o.Set,id:"2PACX-1vSEuZPcdmaSo_5bkerBUUjv4mcXRFGpvXTZwMLvw_8Wl0-ORxq1okk01WYfeysyy1Hoxcbd7U3XlLuh",gid:"706247009",evolgid:""}];function r(t,e=!1){const i=l.find((({name:e})=>e===t));if(i)return fetch(`https://docs.google.com/spreadsheets/d/e/${i.id}/pub?gid=${e?i.evolgid:i.gid}&single=true&output=csv`).then((t=>t.text()))}function c(t){var e=t.toString().split("\r");let i=[],a=e[0].split(",");for(let t=1;t<e.length;t++){let s={};const n="###";let o=e[t].replace(/"[^"]+"/g,(function(t){return t.replace(/,/g,n)})).split(",");for(let t in a)o[t]&&(s[a[t]]=o[t].includes(n)?o[t].split(n).map((t=>t.trim())).join(".").replace(/"/g,""):o[t]);i.push(s)}return i}const h=class{constructor(e){t(this,e),this.runes=[],this.hide=!1,this.runeCount=[]}componentWillLoad(){this.getRunes()}async getRunes(){var t;null===(t=r(o.Runes))||void 0===t||t.then((t=>this.runes=c(t)))}getRuneCount(){const t=localStorage.getItem("runeCount");if(t)try{this.runeCount=JSON.parse(t)}catch(t){console.log("WTF holy grail")}}addRune(t){let e=this.runeCount.find((({id:e})=>t===e));this.runeCount=e?this.runeCount.map((e=>e.id!==t?e:Object.assign(Object.assign({},e),{nb:e.nb+1}))):[...this.runeCount,{id:t,nb:1}],localStorage.setItem("runeCount",JSON.stringify(this.runeCount))}removeRune(t){this.runeCount=this.runeCount.map((e=>e.id!==t||e.nb<1?e:Object.assign(Object.assign({},e),{nb:e.nb-1}))),localStorage.setItem("runeCount",JSON.stringify(this.runeCount))}getCloseRune(t,e=-1){const i=this.runes.find((({id:i})=>parseInt(i.replace("r",""))===parseInt(t.replace("r",""))+e));if(i)return i}getPrice(t){return 300*Number(t.value)/100}renderCraft(t){const i=this.getCloseRune(t);if(null==i?void 0:i.value)return e("div",{class:"craft"}," 🔨  3 ",i.letter," (",300*Number(i.value)/100,")")}render(){return e(i,{class:{hide:this.hide}},e("div",{class:"close",onClick:()=>this.hide=!this.hide}),e("div",{class:"header"},"Runes estimate value"),e("div",{class:"list"},this.runes.filter((({letter:t})=>t)).reverse().map((({id:t,letter:i,value:a})=>{var s;return e("div",{key:t,class:"rune",onContextMenu:t=>{t.preventDefault(),this.removeRune(i)},onClick:()=>this.addRune(i)},e("div",{class:"value"},a),e("div",{class:"nb"},null===(s=this.runeCount.find((t=>t.id===i)))||void 0===s?void 0:s.nb),e("div",{class:"name"},i),this.renderCraft(t))}))))}};h.style='@charset "UTF-8";:host{display:block;color:#8c8875;font-family:"formal";border:1px solid #8c8875;position:relative;min-width:400px;padding:0 0 0 15px;display:flex;flex-direction:column}:host .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}:host .close:hover{filter:brightness(1.75)}:host .close:before{content:"X";text-shadow:1px 1px 1px black}:host .header{font-family:"exocet_big";font-size:24px;height:45px;display:flex;align-items:center}:host .list{height:auto;overflow:auto;}:host .list::-webkit-scrollbar{width:10px}:host .list::-webkit-scrollbar-track{background:#8c8875}:host .list::-webkit-scrollbar-thumb{background:#24150b}:host .list::-webkit-scrollbar-thumb:hover{background:#555}:host .rune{display:flex;height:20px;cursor:pointer;transition:font-size 0.3s ease;padding:5px;display:flex}:host .rune:hover{background-color:#8c8875;color:black}:host .rune:hover .name{font-size:18px}:host .rune .nb{font-family:"exocet_big";font-size:18px;color:white;width:40px;text-align:right;margin-right:5px}:host .rune .name{min-width:50px;user-select:none}:host .rune .value{margin:0 5px 0 0;min-width:50px;position:relative}:host .rune .value:not(:empty):after{position:absolute;right:0;content:"💰"}';var d={compareTwoStrings:p,findBestMatch:function(t,e){if(!function(t,e){return"string"==typeof t&&!!Array.isArray(e)&&!!e.length&&!e.find((function(t){return"string"!=typeof t}))}(t,e))throw new Error("Bad arguments: First argument should be a string, second should be an array of strings");const i=[];let a=0;for(let s=0;s<e.length;s++){const n=e[s],o=p(t,n);i.push({target:n,rating:o}),o>i[a].rating&&(a=s)}return{ratings:i,bestMatch:i[a],bestMatchIndex:a}}};function p(t,e){if((t=t.replace(/\s+/g,""))===(e=e.replace(/\s+/g,"")))return 1;if(t.length<2||e.length<2)return 0;let i=new Map;for(let e=0;e<t.length-1;e++){const a=t.substring(e,e+2),s=i.has(a)?i.get(a)+1:1;i.set(a,s)}let a=0;for(let t=0;t<e.length-1;t++){const s=e.substring(t,t+2),n=i.has(s)?i.get(s):0;n>0&&(i.set(s,n-1),a++)}return 2*a/(t.length+e.length-2)}const u=class{constructor(e){t(this,e),this.uniqs=[],this.holyGrail=[],this.search="",this.searchHoly=!1,this.searchEthereal=!1,this.listening=!1,this.STEPNBELEMENT=40,this.percent=0,this.display=this.STEPNBELEMENT,this.listImg=[],this.baseItem=[{base:"doubleaxe",other:["doubleaxe","ettinaxe","twinaxe"]},{base:"militarypick",other:["warspike","crowbill","militarypick"]},{base:"waraxe",other:["naga","waraxe","berserkeraxe"]},{base:"largeaxe",other:["militaryaxe","largeaxe","feralaxe"]},{base:"broadaxe",other:["beardedaxe","broadaxe","silver-edgedaxe"]},{base:"greataxe",other:["gothicaxe","greataxe","championaxe"]},{base:"wand",other:["burntwand","polishedwand","wand"]},{base:"bonewand",other:["tombwand","lichwand","bonewand"]}]}componentWillLoad(){this.getHolyGrail(),this.getUniqs(),this.manageVoice()}manageVoice(){const t=window.speechRecognition||window.webkitSpeechRecognition;this.recognition=new t,this.recognition.continuous=!0,this.recognition.lang="en-EN",this.recognition.onresult=t=>{for(let e=t.resultIndex;e<t.results.length;e++)this.manageCommand(t.results[e][0].transcript)}}manageCommand(t){var e;if(console.log(t),t.includes("search")&&(this.search=t.replace("search","").trim(),console.log(this.search)),t.includes("select first")){const t=this.filterList(this.uniqs);(null===(e=null==t?void 0:t[0])||void 0===e?void 0:e.id)&&this.setHolyGrail(t[0].id)}}async getUniqs(){var t;let e=[];null===(t=r(o.Uniq))||void 0===t||t.then((t=>{var i;e=c(t),null===(i=r(o.Set))||void 0===i||i.then((t=>this.uniqs=[...e,...c(t)]))}))}handleChange(t){this.search=t.target.value,this.display=this.STEPNBELEMENT}getHolyGrail(){const t=localStorage.getItem("holyGrail");if(t)try{this.holyGrail=JSON.parse(t)}catch(t){console.log("WTF holy grail")}}setHolyGrail(t,e=!1,i=!0){let a=this.holyGrail.find((({id:e})=>t===e));this.holyGrail=a?a.ethereal!==e?this.holyGrail.map((i=>i.id!==t?i:Object.assign(Object.assign({},i),{ethereal:e}))):this.holyGrail.filter((({id:e})=>e!==t)):[...this.holyGrail,{id:t,ethereal:e,exist:i}],localStorage.setItem("holyGrail",JSON.stringify(this.holyGrail))}reFocus(){var t,e,i,a;null===(e=null===(t=this.element.querySelectorAll("input"))||void 0===t?void 0:t[0])||void 0===e||e.focus(),null===(a=null===(i=this.element.querySelectorAll("input"))||void 0===i?void 0:i[0])||void 0===a||a.select()}filterList(t){return t.filter((({id:t,"lvl req":e})=>{var i;if(t&&e)return!(this.searchHoly&&!this.isHolyGrail(t))&&!(this.searchEthereal&&!(null===(i=this.isHolyGrail(t))||void 0===i?void 0:i.ethereal))&&(t=this.manageId(t),!this.search||d.compareTwoStrings(t,this.search)>this.percent||void 0)})).sort(((t,e)=>{const i=this.manageId(t.id),a=this.manageId(e.id);return d.compareTwoStrings(a,this.search)-d.compareTwoStrings(i,this.search)})).slice(0,this.display)}manageId(t){return t.toLowerCase().replace("the","")}isHolyGrail(t){return this.holyGrail.find((({id:e})=>e===t))}getPercent(){var t;if(null===(t=this.uniqs)||void 0===t?void 0:t.length)return e("div",null,e("span",null,"(🏆",Math.round(this.holyGrail.length/this.uniqs.length*1e4)/100,"%)"),e("span",null,"(👻",Math.round(this.holyGrail.filter((({ethereal:t})=>t)).length/this.uniqs.length*1e4)/100,"%)"))}manageScroll(t){const e=t.target;e.scrollHeight-e.scrollTop===e.clientHeight&&(this.display+=this.STEPNBELEMENT)}render(){return e(i,null,e("div",{class:"header"},e("div",null,"HOLY GRAIL [",this.holyGrail.length,"/",this.uniqs.length,"]"),this.getPercent()),e("div",{class:"actions"},e("input",{list:"list-uniq",value:this.search,onInput:t=>{this.handleChange(t)},placeholder:"Item name"}),e("div",{class:{on:this.searchHoly,action:!0},onClick:()=>{this.display=this.STEPNBELEMENT,this.searchHoly=!this.searchHoly}},"🏆 ",this.holyGrail.length),e("div",{class:{on:this.searchEthereal,action:!0},onClick:()=>{this.display=this.STEPNBELEMENT,this.searchEthereal=!this.searchEthereal}},"👻 ",this.holyGrail.filter((({ethereal:t})=>t)).length),e("div",{class:{on:this.listening,action:!0},onClick:()=>{this.listening?(this.recognition.stop(),this.listening=!1):(this.recognition.start(),this.listening=!0)}},"🎤")),e("div",{class:"list",onScroll:t=>this.manageScroll(t)},this.filterList(this.uniqs).map((({id:t,value:i,"lvl req":a,type:s})=>{const n=this.isHolyGrail(t);return e("div",{key:t,class:{grailed:!!n,uniq:!0,ethereal:n&&n.ethereal},onClick:()=>this.setHolyGrail(t)},this.displayimg(t,s),e("div",{class:"infos"},e("div",{class:"name"},t),e("div",{class:"type"},s),e("div",{class:"lvl"},a)),e("div",{class:"value"},i),e("div",{class:"ethereal",title:"Ethereal",onClick:e=>{e.stopPropagation(),this.setHolyGrail(t,!0)}},"👻"),e("div",{class:"holyGrail"},n?"🏆":""))}))))}reduceType(t){return t.toLowerCase().replace(/'/g,"").replace(/ /g,"").trim()}getBaseType(t){var e;const i=this.reduceType(t);return(null===(e=this.baseItem.find((({other:t})=>t.includes(i))))||void 0===e?void 0:e.base)||i}manageErrorImg(t,e){const i=this.getBaseType(e),s=a(`./assets/img/${i}.png`);t.target.src.includes(`/${i}.png`)?t.target.remove():t.target.src=s}displayimg(t,i){const s=t.toLowerCase().replace(/'/g,"").replace(/ /g,"").trim();return e("div",{class:"img"},e("img",{onError:t=>this.manageErrorImg(t,i),src:a(`./assets/img/${s}.png`),loading:"lazy"}))}static get assetsDirs(){return["assets"]}get element(){return s(this)}};u.style='@charset "UTF-8";ca-uniq{display:block;color:#8c8875;font-family:"formal";border:1px solid #8c8875;padding:0 1px;position:relative;width:calc(100% - 4px)}ca-uniq .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}ca-uniq .close:hover{filter:brightness(1.75)}ca-uniq .close:before{content:"X";text-shadow:1px 1px 1px black}ca-uniq .header{font-family:"exocet_big";font-size:24px;min-height:40px;display:flex;align-items:center;padding:0 15px 5px}ca-uniq .header div{height:100%;display:flex;justify-content:center;align-items:flex-end}ca-uniq .actions{margin:10px 0px;display:flex;padding:0 15px}ca-uniq .action{border:1px solid #8c8875;color:#8c8875;display:flex;justify-content:center;align-items:center;padding:5px;margin:0 5px;cursor:pointer;user-select:none}ca-uniq .action.on{background-color:#8c8875;color:black}ca-uniq input{border:1px solid #8c8875;background:none;color:#8c8875;font-family:"exocet_big";font-size:16px;padding:5px 10px;max-width:calc(70% - 11px);outline:none;width:auto}ca-uniq input:focus{border:2px solid #8c8875}ca-uniq input option{background-color:red}ca-uniq .list{grid-template-columns:repeat(8, minmax(150px, 1fr));height:calc(100% - 99px);flex-wrap:wrap;justify-content:space-around;overflow:auto;display:flex;}@media (max-width: 1280px){ca-uniq .list{grid-template-columns:repeat(7, minmax(150px, 1fr))}}@media (max-width: 1080px){ca-uniq .list{grid-template-columns:repeat(6, minmax(150px, 1fr))}}@media (max-width: 700px){ca-uniq .list{grid-template-columns:repeat(4, minmax(150px, 1fr))}}@media (max-width: 500px){ca-uniq .list{grid-template-columns:repeat(3, minmax(120px, 1fr))}}@media (max-width: 400px){ca-uniq .list{grid-template-columns:repeat(2, minmax(110px, 1fr))}}ca-uniq .list::-webkit-scrollbar{width:10px}ca-uniq .list::-webkit-scrollbar-track{background:#8c8875}ca-uniq .list::-webkit-scrollbar-thumb{background:#24150b}ca-uniq .list::-webkit-scrollbar-thumb:hover{background:#555}ca-uniq .uniq{display:flex;cursor:pointer;transition:font-size 0.3s ease;flex-direction:column;height:250px;align-items:center;border:1px solid #000;text-align:center;position:relative;filter:grayscale(1);background:#2c2c2c;align-items:center;box-shadow:inset 0px 0px 6px 6px #0000001c;width:170px;margin:5px;z-index:100}ca-uniq .uniq.ethereal .name{color:white;text-shadow:0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e60073, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073}ca-uniq .uniq.ethereal img{filter:drop-shadow(16px 16px 20px red) invert(75%)}ca-uniq .uniq.ethereal .ethereal{filter:grayscale(0)}@keyframes myOrbit{from{transform:rotate(0deg) translateX(0) rotate(0deg)}to{transform:rotate(0deg) translateX(100%) rotate(0deg)}}ca-uniq .uniq .ethereal{position:absolute;top:5px;left:5px;filter:grayscale(1);opacity:0.8}ca-uniq .uniq.grailed{border:1px solid #8c8875;filter:grayscale(0)}ca-uniq .uniq .img{transition:all 0.3s ease-in-out;height:100%;margin-bottom:30px;display:flex;align-items:center}ca-uniq .uniq .img img{object-fit:contain}ca-uniq .uniq .infos{background-color:rgba(0, 0, 0, 0.2);position:absolute;bottom:0;width:100%;padding:15px 0}ca-uniq .uniq .lvl{display:none}ca-uniq .uniq .holyGrail{position:absolute;text-align:right;top:5px;right:5px}ca-uniq .uniq .type{min-width:120px;color:#6a6a6a}ca-uniq .uniq:hover{background-color:black}ca-uniq .uniq .value{margin:0 5px}ca-uniq .uniq .value:not(:empty):after{content:"💰"}';export{n as ca_bases,h as ca_runes,u as ca_uniq}