import { Component, Element, getAssetPath, h, Host, State } from '@stencil/core';
import stringSimilarity from 'string-similarity';
import { ApisName, fetchApi } from '../../utils/services/fetchApi';
import { csvToJson } from '../../utils/utils';
export class CaUniq {
  constructor() {
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
      if (stringSimilarity.compareTwoStrings(id, this.search) > this.percent) {
        return true;
      }
    })
      .sort((a, b) => {
      const aid = this.manageId(a.id);
      const bid = this.manageId(b.id);
      return stringSimilarity.compareTwoStrings(bid, this.search) - stringSimilarity.compareTwoStrings(aid, this.search);
    });
  }
  manageId(id) {
    return id.toLowerCase().replace('the', '');
  }
  isHolyGrail(itemId) {
    return this.holyGrail.find(({ id }) => id === itemId);
  }
  render() {
    return (h(Host, null,
      h("div", { class: "close" }),
      h("div", { class: "header" },
        "HOLY GRAIL [",
        this.holyGrail.length,
        "/",
        this.uniqs.length,
        "] (\uD83C\uDFC6",
        Math.round((this.holyGrail.length / this.uniqs.length) * 10000) / 100,
        "%)"),
      h("div", { class: "actions" },
        h("input", { list: "list-uniq", value: this.search, onInput: event => {
            this.handleChange(event);
          }, placeholder: "Item name" }),
        h("div", { class: {
            on: this.searchHoly,
            action: true,
          }, onClick: () => (this.searchHoly = !this.searchHoly) }, "\uD83C\uDFC6"),
        h("div", { class: {
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
          } }, "\uD83C\uDFA4")),
      h("div", { class: "list" }, this.filterList(this.uniqs).map(({ id, value, ['lvl req']: lvl, type }) => {
        const holyGrailed = this.isHolyGrail(id);
        return (h("div", { key: id, class: {
            grailed: !!holyGrailed,
            uniq: true,
          }, onClick: () => this.setHolyGrail(id) },
          this.displayimg(id, type),
          h("div", { class: "infos" },
            h("div", { class: "name" }, id),
            h("div", { class: "type" }, type),
            h("div", { class: "lvl" }, lvl)),
          h("div", { class: "value" }, value),
          h("div", { class: "holyGrail" }, holyGrailed ? (holyGrailed.ethereal ? '🏆<Ethereal>' : '🏆') : '')));
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
    return (h("div", { class: "img" },
      h("img", { onError: ev => this.manageErrorImg(ev, type), src: getAssetPath(`./assets/img/${idTrim}.png`), loading: "lazy" })));
  }
  static get is() { return "ca-uniq"; }
  static get originalStyleUrls() { return {
    "$": ["ca-uniq.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["ca-uniq.css"]
  }; }
  static get assetsDirs() { return ["assets"]; }
  static get states() { return {
    "uniqs": {},
    "holyGrail": {},
    "search": {},
    "searchHoly": {},
    "listening": {},
    "listImg": {}
  }; }
  static get elementRef() { return "element"; }
}
