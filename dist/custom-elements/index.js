import { attachShadow, h, Host, getAssetPath, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const caCharmCss = ":host{display:block}";

const list = [
  {
    type: 'small',
    suffix: [
      {
        label: 'life',
        min: 16,
        max: 20,
      },
      {
        label: 'magic find',
        min: 6,
        max: 7,
      },
      {
        label: 'magic find',
        min: 6,
        max: 7,
      },
    ],
  },
];
const CaCharm$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    console.log(list);
    return (h(Host, null, h("slot", null, "Charm"), h("div", null)));
  }
  static get style() { return caCharmCss; }
};

var ApisName;
(function (ApisName) {
  ApisName["Runes"] = "runes";
  ApisName["Uniq"] = "uniq";
  ApisName["Set"] = "set";
})(ApisName || (ApisName = {}));
const listUrls = [
  {
    name: ApisName.Runes,
    id: '2PACX-1vS2xluOJ3R_-Jkeq9ccg_DXLwu5zBBpkeoV-oBq32SQ1SSRp6SdPTJag9l5yQtKpy5oqkaqV6HW4k_s',
    gid: '1373699183',
    evolgid: '439801429',
  },
  {
    name: ApisName.Uniq,
    id: '2PACX-1vQNlcp78PZpjrinRpq-IJvaDQN7N3RVgm61ottyfR6cj8GBygUmaCQYpzFjIKkAXAGFfkr6hjnoMhP-',
    gid: '926954590',
    evolgid: '672145742',
  },
  {
    name: ApisName.Set,
    id: '2PACX-1vSEuZPcdmaSo_5bkerBUUjv4mcXRFGpvXTZwMLvw_8Wl0-ORxq1okk01WYfeysyy1Hoxcbd7U3XlLuh',
    gid: '706247009',
    evolgid: '',
  },
];
function fetchApi(target, evolution = false) {
  const apiData = listUrls.find(({ name }) => name === target);
  if (!apiData)
    return;
  return fetch(`https://docs.google.com/spreadsheets/d/e/${apiData.id}/pub?gid=${evolution ? apiData.evolgid : apiData.gid}&single=true&output=csv`).then(response => response.text());
}

function csvToJson(csv) {
  // Convert the data to String and
  // split it in an array
  var array = csv.toString().split('\r');
  // All the rows of the CSV will be
  // converted to JSON objects which
  // will be added to result in an array
  let result = [];
  // The array[0] contains all the
  // header columns so we store them
  // in headers array
  let headers = array[0].split(',');
  // Since headers are separated, we
  // need to traverse remaining n-1 rows.
  for (let i = 1; i < array.length; i++) {
    let obj = {};
    let str = array[i];
    const replaceComma = '###';
    var r = str.replace(/"[^"]+"/g, function (v) {
      return v.replace(/,/g, replaceComma);
    });
    // Split the string using pipe delimiter |
    // and store the values in a properties array
    let properties = r.split(',');
    // For each header, if the value contains
    // multiple comma separated data, then we
    // store it in the form of array otherwise
    // directly the value is stored
    for (let j in headers) {
      if (properties[j]) {
        if (properties[j].includes(replaceComma)) {
          obj[headers[j]] = properties[j]
            .split(replaceComma)
            .map(item => item.trim())
            .join('.')
            .replace(/"/g, '');
        }
        else
          obj[headers[j]] = properties[j];
      }
    }
    // Add the generated object to our
    // result array
    result.push(obj);
  }
  return result;
}

const caRunesCss = "@charset \"UTF-8\";:host{display:block;color:#8c8875;font-family:\"formal\";border:1px solid #8c8875;padding:0 15px;position:relative}:host .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}:host .close:hover{filter:brightness(1.75)}:host .close:before{content:\"X\";text-shadow:1px 1px 1px black}:host .header{font-family:\"exocet_big\";font-size:24px;height:45px;display:flex;align-items:center}:host .rune{display:flex;height:20px;cursor:pointer;transition:font-size 0.3s ease;padding:5px;display:flex}:host .rune:hover{background-color:#8c8875;color:black}:host .rune:hover .name{font-size:18px}:host .rune .name{min-width:250px}:host .rune .value{margin:0 5px 0 0;min-width:50px;position:relative}:host .rune .value:not(:empty):after{position:absolute;right:0;content:\"💰\"}";

const CaRunes$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.runes = [];
  }
  componentWillLoad() {
    this.getRunes();
  }
  async getRunes() {
    var _a;
    (_a = fetchApi(ApisName.Runes)) === null || _a === void 0 ? void 0 : _a.then(data => (this.runes = csvToJson(data)));
  }
  getCloseRune(id, pos = -1) {
    const nextRune = this.runes.find(({ id: runeKey }) => parseInt(runeKey.replace('r', '')) === parseInt(id.replace('r', '')) + pos);
    if (nextRune) {
      return nextRune;
    }
  }
  getPrice(rune) {
    return (Number(rune.value) * 300) / 100;
  }
  renderCraft(id) {
    const prevRune = this.getCloseRune(id);
    if (!(prevRune === null || prevRune === void 0 ? void 0 : prevRune.value))
      return;
    return (h("div", { class: "craft" }, "\u00A0Craft from :\u00A0 3 ", prevRune.letter, " (", (Number(prevRune.value) * 300) / 100, ")"));
  }
  render() {
    return (h(Host, null, h("div", { class: "close" }), h("div", { class: "header" }, "HIGH + LOW Runes estimate value"), this.runes
      .filter(({ letter, value }) => letter && value)
      .map(({ id, letter, value }) => {
      return (h("div", { key: id, class: "rune" }, h("div", { class: "value" }, value), h("div", { class: "name" }, letter), this.renderCraft(id)));
    })));
  }
  static get style() { return caRunesCss; }
};

const caRunewordCss = ":host{display:block}";

const CaRuneword$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get style() { return caRunewordCss; }
};

var src = {
	compareTwoStrings:compareTwoStrings,
	findBestMatch:findBestMatch
};

function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '');
	second = second.replace(/\s+/g, '');

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	}
	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString);
		ratings.push({target: currentTargetString, rating: currentRating});
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i;
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex];
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}

const caUniqCss = "@charset \"UTF-8\";ca-uniq{display:block;color:#8c8875;font-family:\"formal\";border:1px solid #8c8875;padding:0 1px;position:relative}ca-uniq .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}ca-uniq .close:hover{filter:brightness(1.75)}ca-uniq .close:before{content:\"X\";text-shadow:1px 1px 1px black}ca-uniq .header{font-family:\"exocet_big\";font-size:24px;height:45px;display:flex;align-items:center;padding:0 15px}ca-uniq .actions{margin:10px 0px;display:flex;padding:0 15px}ca-uniq .action{border:1px solid #8c8875;color:#8c8875;display:flex;justify-content:center;align-items:center;padding:5px;margin:0 5px;cursor:pointer;user-select:none}ca-uniq .action.on{background-color:#8c8875;color:black}ca-uniq input{border:1px solid #8c8875;background:none;color:#8c8875;font-family:\"exocet_big\";font-size:16px;padding:5px 10px;outline:none;width:auto}ca-uniq input:focus{border:2px solid #8c8875}ca-uniq input option{background-color:red}ca-uniq .list{height:calc(100% - 99px);overflow:auto;display:grid;grid-template-columns:repeat(5, 1fr);grid-column-gap:15px;padding:0 15px;grid-row-gap:15px;}ca-uniq .list::-webkit-scrollbar{width:10px}ca-uniq .list::-webkit-scrollbar-track{background:#8c8875}ca-uniq .list::-webkit-scrollbar-thumb{background:#24150b}ca-uniq .list::-webkit-scrollbar-thumb:hover{background:#555}ca-uniq .uniq{display:flex;cursor:pointer;transition:font-size 0.3s ease;flex-direction:column;height:250px;align-items:center;border:1px solid #000;text-align:center;position:relative;filter:grayscale(1);background:#2c2c2c;align-items:center;box-shadow:inset 0px 0px 6px 6px #0000001c;z-index:100}ca-uniq .uniq.grailed{border:1px solid #8c8875;filter:grayscale(0)}ca-uniq .uniq .img{transition:all 0.3s ease-in-out;height:100%;margin-bottom:30px;display:flex;align-items:center}ca-uniq .uniq .img img{object-fit:contain}ca-uniq .uniq .infos{background-color:rgba(0, 0, 0, 0.2);position:absolute;bottom:0;width:100%;padding:15px 0}ca-uniq .uniq .lvl{display:none}ca-uniq .uniq .holyGrail{position:absolute;text-align:right;width:100%;top:5px;right:5px}ca-uniq .uniq .type{min-width:120px;color:#6a6a6a}ca-uniq .uniq:hover{background-color:black}ca-uniq .uniq .value{margin:0 5px}ca-uniq .uniq .value:not(:empty):after{content:\"💰\"}";

const CaUniq$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uniqs = [];
    this.holyGrail = [];
    this.search = '';
    this.searchHoly = false;
    this.listening = false;
    this.percent = 0;
    this.listImg = [];
    this.baseItem = [
      {
        base: 'doubleaxe',
        other: ['doubleaxe', 'ettinaxe', 'twinaxe'],
      },
      {
        base: 'militarypick',
        other: ['warspike', 'crowbill', 'militarypick'],
      },
      {
        base: 'waraxe',
        other: ['naga', 'waraxe', 'berserkeraxe'],
      },
      {
        base: 'largeaxe',
        other: ['militaryaxe', 'largeaxe', 'feralaxe'],
      },
      {
        base: 'broadaxe',
        other: ['beardedaxe', 'broadaxe', 'silver-edgedaxe'],
      },
      {
        base: 'greataxe',
        other: ['gothicaxe', 'greataxe', 'championaxe'],
      },
      {
        base: 'wand',
        other: ['burntwand', 'polishedwand', 'wand'],
      },
      {
        base: 'bonewand',
        other: ['tombwand', 'lichwand', 'bonewand'],
      },
    ];
  }
  componentWillLoad() {
    this.getHolyGrail();
    this.getUniqs();
    this.manageVoice();
  }
  manageVoice() {
    /* La zone texte */
    /* Initialise la reconnaissance vocale */
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-EN';
    this.recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        this.manageCommand(event.results[i][0].transcript);
      }
    };
  }
  manageCommand(msg) {
    var _a;
    console.log(msg);
    if (msg.includes('search')) {
      this.search = msg.replace('search', '').trim();
      console.log(this.search);
    }
    if (msg.includes('select first')) {
      const list = this.filterList(this.uniqs);
      if ((_a = list === null || list === void 0 ? void 0 : list[0]) === null || _a === void 0 ? void 0 : _a.id) {
        this.setHolyGrail(list[0].id);
      }
    }
  }
  async getUniqs() {
    var _a;
    (_a = fetchApi(ApisName.Uniq)) === null || _a === void 0 ? void 0 : _a.then(data => {
      var _a;
      this.uniqs = csvToJson(data);
      (_a = fetchApi(ApisName.Set)) === null || _a === void 0 ? void 0 : _a.then(data => (this.uniqs = [...this.uniqs, ...csvToJson(data)])).then(data => {
        console.log(data.map(d => {
          if (d.type) {
            const target = d.type.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
            return {
              label: target,
              src: `https://diablo2.io/styles/zulu/theme/images/items/${target}_graphic.png`,
            };
          }
        }));
      });
    });
  }
  handleChange(event) {
    this.search = event.target.value;
  }
  getHolyGrail() {
    const holyGrail = localStorage.getItem('holyGrail');
    if (!holyGrail)
      return;
    try {
      this.holyGrail = JSON.parse(holyGrail);
    }
    catch (error) {
      console.log('WTF holy grail');
    }
  }
  setHolyGrail(itemId, ethereal = false, exist = true) {
    var _a, _b, _c, _d;
    let holyItem = this.holyGrail.find(({ id }) => itemId === id);
    if (!holyItem) {
      this.holyGrail.push({
        id: itemId,
        ethereal,
        exist,
      });
    }
    else if (holyItem.ethereal !== ethereal) {
      holyItem = Object.assign(Object.assign({}, holyItem), { ethereal });
    }
    else {
      this.holyGrail = this.holyGrail.filter(({ id }) => id !== itemId);
    }
    this.holyGrail = [...this.holyGrail];
    localStorage.setItem('holyGrail', JSON.stringify(this.holyGrail));
    (_b = (_a = this.element.querySelectorAll('input')) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.focus();
    (_d = (_c = this.element.querySelectorAll('input')) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.select();
  }
  filterList(list) {
    return list
      .filter(({ id, ['lvl req']: lvl }) => {
      if (!id || !lvl) {
        return;
      }
      if (this.searchHoly && !this.isHolyGrail(id)) {
        return false;
      }
      id = this.manageId(id);
      if (!this.search) {
        return true;
      }
      if (src.compareTwoStrings(id, this.search) > this.percent) {
        return true;
      }
    })
      .sort((a, b) => {
      const aid = this.manageId(a.id);
      const bid = this.manageId(b.id);
      return src.compareTwoStrings(bid, this.search) - src.compareTwoStrings(aid, this.search);
    });
  }
  manageId(id) {
    return id.toLowerCase().replace('the', '');
  }
  isHolyGrail(itemId) {
    return this.holyGrail.find(({ id }) => id === itemId);
  }
  render() {
    return (h(Host, null, h("div", { class: "close" }), h("div", { class: "header" }, "HOLY GRAIL [", this.holyGrail.length, "/", this.uniqs.length, "] (\uD83C\uDFC6", Math.round((this.holyGrail.length / this.uniqs.length) * 10000) / 100, "%)"), h("div", { class: "actions" }, h("input", { list: "list-uniq", value: this.search, onInput: event => {
        this.handleChange(event);
      }, placeholder: "Item name" }), h("div", { class: {
        on: this.searchHoly,
        action: true,
      }, onClick: () => (this.searchHoly = !this.searchHoly) }, "\uD83C\uDFC6"), h("div", { class: {
        on: this.listening,
        action: true,
      }, onClick: () => {
        if (this.listening) {
          this.recognition.stop();
          this.listening = false;
        }
        else {
          this.recognition.start();
          this.listening = true;
        }
      } }, "\uD83C\uDFA4")), h("div", { class: "list" }, this.filterList(this.uniqs).map(({ id, value, ['lvl req']: lvl, type }) => {
      const holyGrailed = this.isHolyGrail(id);
      return (h("div", { key: id, class: {
          grailed: !!holyGrailed,
          uniq: true,
        }, onClick: () => this.setHolyGrail(id) }, this.displayimg(id, type), h("div", { class: "infos" }, h("div", { class: "name" }, id), h("div", { class: "type" }, type), h("div", { class: "lvl" }, lvl)), h("div", { class: "value" }, value), h("div", { class: "holyGrail" }, holyGrailed ? (holyGrailed.ethereal ? '🏆<Ethereal>' : '🏆') : '')));
    }))));
  }
  reduceType(target) {
    return target.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
  }
  getBaseType(type) {
    var _a;
    const typetrim = this.reduceType(type);
    return ((_a = this.baseItem.find(({ other }) => other.includes(typetrim))) === null || _a === void 0 ? void 0 : _a.base) || typetrim;
  }
  manageErrorImg(ev, type) {
    const typetrim = this.getBaseType(type);
    const typesrc = getAssetPath(`./assets/img/${typetrim}.png`);
    if (ev.target.src.includes(`/${typetrim}.png`)) {
      ev.target.remove();
    }
    else {
      ev.target.src = typesrc;
    }
  }
  displayimg(id, type) {
    const idTrim = id.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
    return (h("div", { class: "img" }, h("img", { onError: ev => this.manageErrorImg(ev, type), src: getAssetPath(`./assets/img/${idTrim}.png`), loading: "lazy" })));
  }
  static get assetsDirs() { return ["assets"]; }
  get element() { return this; }
  static get style() { return caUniqCss; }
};

const CaCharm = /*@__PURE__*/proxyCustomElement(CaCharm$1, [1,"ca-charm"]);
const CaRunes = /*@__PURE__*/proxyCustomElement(CaRunes$1, [1,"ca-runes",{"runes":[32]}]);
const CaRuneword = /*@__PURE__*/proxyCustomElement(CaRuneword$1, [1,"ca-runeword"]);
const CaUniq = /*@__PURE__*/proxyCustomElement(CaUniq$1, [0,"ca-uniq",{"uniqs":[32],"holyGrail":[32],"search":[32],"searchHoly":[32],"listening":[32],"listImg":[32]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      CaCharm,
  CaRunes,
  CaRuneword,
  CaUniq
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { CaCharm, CaRunes, CaRuneword, CaUniq, defineCustomElements };
