import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ca-runeword',
  styleUrl: 'ca-runeword.css',
  shadow: true,
})
export class CaRuneword {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
