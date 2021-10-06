import { r as registerInstance, h, e as Host } from './index-bf4310d4.js';
import { f as fetchApi, A as ApisName, c as csvToJson } from './utils-3f87c53f.js';

const caRunesCss = "@charset \"UTF-8\";:host{display:block;color:#8c8875;font-family:\"formal\";border:1px solid #8c8875;padding:0 15px;position:relative}:host .close{position:absolute;top:1px;right:1px;height:24px;font-size:24px;width:23px;color:#cd0202;border:2px solid black;display:flex;background:#850707;justify-content:center;align-items:center;cursor:pointer}:host .close:hover{filter:brightness(1.75)}:host .close:before{content:\"X\";text-shadow:1px 1px 1px black}:host .header{font-family:\"exocet_big\";font-size:24px;height:45px;display:flex;align-items:center}:host .rune{display:flex;height:20px;cursor:pointer;transition:font-size 0.3s ease;padding:5px;display:flex}:host .rune:hover{background-color:#8c8875;color:black}:host .rune:hover .name{font-size:18px}:host .rune .name{min-width:250px}:host .rune .value{margin:0 5px 0 0;min-width:50px;position:relative}:host .rune .value:not(:empty):after{position:absolute;right:0;content:\"💰\"}";

const CaRunes = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
CaRunes.style = caRunesCss;

export { CaRunes as ca_runes };
