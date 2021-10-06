import { r as registerInstance, h, e as Host } from './index-bf4310d4.js';

const caRunewordCss = ":host{display:block}";

const CaRuneword = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
CaRuneword.style = caRunewordCss;

export { CaRuneword as ca_runeword };
