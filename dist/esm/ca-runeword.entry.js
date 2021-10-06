import { r as registerInstance, h, H as Host } from './index-55a52670.js';

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
