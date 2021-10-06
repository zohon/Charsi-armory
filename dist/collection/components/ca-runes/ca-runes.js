import { Component, h, Host, State } from '@stencil/core';
import { ApisName, fetchApi } from '../../utils/services/fetchApi';
import { csvToJson } from '../../utils/utils';
export class CaRunes {
  constructor() {
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
    return (h("div", { class: "craft" },
      "\u00A0Craft from :\u00A0 3 ",
      prevRune.letter,
      " (",
      (Number(prevRune.value) * 300) / 100,
      ")"));
  }
  render() {
    return (h(Host, null,
      h("div", { class: "close" }),
      h("div", { class: "header" }, "HIGH + LOW Runes estimate value"),
      this.runes
        .filter(({ letter, value }) => letter && value)
        .map(({ id, letter, value }) => {
        return (h("div", { key: id, class: "rune" },
          h("div", { class: "value" }, value),
          h("div", { class: "name" }, letter),
          this.renderCraft(id)));
      })));
  }
  static get is() { return "ca-runes"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ca-runes.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["ca-runes.css"]
  }; }
  static get states() { return {
    "runes": {}
  }; }
}
