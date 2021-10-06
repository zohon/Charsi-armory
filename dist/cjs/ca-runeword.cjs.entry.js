'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a8905306.js');

const caRunewordCss = ":host{display:block}";

const CaRuneword = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
CaRuneword.style = caRunewordCss;

exports.ca_runeword = CaRuneword;
