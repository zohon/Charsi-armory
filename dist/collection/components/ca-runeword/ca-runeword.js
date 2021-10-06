import { Component, Host, h } from '@stencil/core';
export class CaRuneword {
  render() {
    return (h(Host, null,
      h("slot", null)));
  }
  static get is() { return "ca-runeword"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["ca-runeword.css"]
  }; }
  static get styleUrls() { return {
    "$": ["ca-runeword.css"]
  }; }
}
