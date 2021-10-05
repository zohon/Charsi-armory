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

@Component({
  tag: 'ca-charm',
  styleUrl: 'ca-charm.css',
  shadow: true,
})
export class CaCharm {
  render() {
    console.log(list);
    return (
      <Host>
        <slot>Charm</slot>
        <div></div>
      </Host>
    );
  }
}
