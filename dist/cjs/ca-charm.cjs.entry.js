'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a8905306.js');

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
const CaCharm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    console.log(list);
    return (index.h(index.Host, null, index.h("slot", null, "Charm"), index.h("div", null)));
  }
};
CaCharm.style = caCharmCss;

exports.ca_charm = CaCharm;
