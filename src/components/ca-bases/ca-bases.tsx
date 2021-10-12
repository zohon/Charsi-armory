import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'ca-bases',
  styleUrl: 'ca-bases.scss',
  shadow: true,
})
export class CaBases {
  @Prop({ mutable: true }) hide = false;

  listArmor = [
    {
      name: 'Dusk Shroud',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/quilted.gif',
      min: 361,
      max: 467,
      socket: 4,
    },
    {
      name: 'Wyrmhide',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/leather.gif',
      min: 364,
      max: 470,
      socket: 4,
    },
    {
      name: 'Scarab Husk',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/hardleather.gif',
      min: 369,
      max: 474,
      socket: 4,
    },
    {
      name: 'Wire Fleece',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/studdedleather.gif',
      min: 375,
      max: 481,
      socket: 4,
    },
    {
      name: 'Great Hauberk',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/breastplate.gif',
      min: 395,
      max: 501,
      socket: 4,
    },
    {
      name: 'Archon Plate',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/lightplate.gif',
      min: 410,
      max: 524,
      socket: 4,
    },
  ];

  listPolearm = [
    {
      name: 'Thresher',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif',
      min: 12,
      max: 141,
      avg: 76.5,
      socket: 5,
    },
    {
      name: 'Giant Thresher',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif',
      min: 40,
      max: 114,
      avg: 77,
      socket: 6,
    },
    {
      name: 'Colossus Voulge',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/voulge.gif',
      min: 17,
      max: 165,
      avg: 91,
      socket: 4,
    },
    {
      name: 'Cryptic Axe',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/poleaxe.gif',
      min: 33,
      max: 150,
      avg: 91.5,
      socket: 5,
    },
    {
      name: 'Great poleaxe',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif',
      min: 46,
      max: 127,
      avg: 86.5,
      socket: 5,
    },
    // {
    //   name: 'Ogre Axe',
    //   img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/bardiche.gif',
    //   min: 28,
    //   max: 145,
    //   avg: 86.5,
    //   socket: 3,
    // },
  ];

  render() {
    return (
      <Host class={{ hide: this.hide }}>
        <div class="close" onClick={() => (this.hide = !this.hide)}></div>
        <div class="header">
          <div>Bases</div>
        </div>
        <div class="items">
          <h3>Armor</h3>
          {this.listArmor.map(({ name, img, min, max }) => {
            return (
              <div class="item">
                <img src={img} />
                <div class="data">
                  <div class="name">{name}</div>
                  <div class="range">
                    {min * 1.5}-{max * 1.5}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="items">
          <h3>Polearm</h3>
          {this.listPolearm.map(({ name, img, min, max, avg, socket }) => {
            return (
              <div class="item">
                <img src={img} />
                <div class="data">
                  <div class="name">{name}</div>
                  <div class="range">
                    {min * 1.5}-{max * 1.5} ({avg}) [{socket}]
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
