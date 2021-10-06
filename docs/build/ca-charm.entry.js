import { r as registerInstance, h, e as Host } from './index-bf4310d4.js';

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
    registerInstance(this, hostRef);
  }
  render() {
    console.log(list);
    return (h(Host, null, h("slot", null, "Charm"), h("div", null)));
  }
};
CaCharm.style = caCharmCss;

export { CaCharm as ca_charm };
