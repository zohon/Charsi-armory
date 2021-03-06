import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ca-runeword',
  styleUrl: 'ca-runeword.scss',
  shadow: true,
})
export class CaRuneword {
  listArmor = [
    {
      name: 'Dusk Shroud',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/quilted.gif',
      min: 361,
      max: 467,
    },
    {
      name: 'Wyrmhide',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/leather.gif',
      min: 364,
      max: 470,
    },
    {
      name: 'Scarab Husk',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/hardleather.gif',
      min: 369,
      max: 474,
    },
    {
      name: 'Wire Fleece',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/studdedleather.gif',
      min: 375,
      max: 481,
    },
    {
      name: 'Great Hauberk',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/breastplate.gif',
      min: 395,
      max: 501,
    },
    {
      name: 'Archon Plate',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/armor/lightplate.gif',
      min: 410,
      max: 524,
    },
  ];

  listPolearm = [
    {
      name: 'Cryptic Axe',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/poleaxe.gif',
      min: 33,
      max: 150,
      avg: 91.5,
    },
    {
      name: 'Colossus Voulge',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/voulge.gif',
      min: 17,
      max: 165,
      avg: 91,
    },
    {
      name: 'Great poleaxe',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/halberd.gif',
      min: 46,
      max: 127,
      avg: 86.5,
    },
    {
      name: 'Ogre Axe',
      img: 'http://classic.battle.net/images/battle/diablo2exp/images/items/weapons/bardiche.gif',
      min: 28,
      max: 145,
      avg: 86.5,
    },
  ];

  render() {
    return (
      <Host>
        <div class="armors">
          <h3>Armor</h3>
          {this.listArmor.map(({ name, img, min, max }) => {
            return (
              <div class="armor">
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

        <div class="armors">
          <h3>Polearm</h3>
          {this.listPolearm.map(({ name, img, min, max }) => {
            return (
              <div class="armor">
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

        <div>
          <h3>END GAME</h3>
          <div class="runeword">
            <a class="name" href="https://d2runewizard.com/runewords/Infinity">
              Infinity
            </a>
            <div class="equip">Etheral Weapon</div>
            <div class="target">Merc</div>
            <div class="runes">
              <div class="rune">BER</div>
              <div class="rune">MAL</div>
              <div class="rune">BER</div>
              <div class="rune">IST</div>
            </div>
          </div>
          <div class="runeword">
            <a class="name" href="https://d2runewizard.com/runewords/Fortitude">
              Fortitude
            </a>
            <div class="target">Merc</div>
            <div class="equip">Etheral Armor</div>
            <div class="runes">
              <div class="rune">EL</div>
              <div class="rune">SOL</div>
              <div class="rune">DOL</div>
              <div class="rune">LO</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
