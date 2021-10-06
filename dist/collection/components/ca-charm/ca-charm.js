import { Component, h, Host } from '@stencil/core';
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
// small charm =>
// + 16-20 life
// + 6-7% magic item
// + 2 strength
// + 2 Dext
// + 3-5% All Resistances
// + 10-11% Res
// + 175 poison damage
// + 25-36 AR
// + (3 to Maximum Damage + 20 AR)
export class CaCharm {
  render() {
    console.log(list);
    return (h(Host, null,
      h("slot", null, "Charm"),
      h("div", null)));
  }
  static get is() { return "ca-charm"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ca-charm.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ca-charm.css"]
  }; }
}
