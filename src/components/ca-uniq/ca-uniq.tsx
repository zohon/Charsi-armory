import { Component, Element, getAssetPath, h, Host, State } from '@stencil/core';
import stringSimilarity from 'string-similarity';
import { ApisName, fetchApi } from '../../utils/services/fetchApi';
import { csvToJson } from '../../utils/utils';

interface Uniq {
  id: string;
  value: string;
  lvl: string;
  ['lvl req']: string;
  type: string;
  set?: string;
}

interface HolyGrail {
  id: Uniq['id'];
  ethereal: boolean;
  exist: boolean;
}

@Component({
  tag: 'ca-uniq',
  styleUrl: 'ca-uniq.scss',
  assetsDirs: ['assets'],
})
export class CaUniq {
  @Element() element: HTMLElement;
  @State() uniqs: Uniq[] = [];
  @State() holyGrail: HolyGrail[] = [];
  @State() search: string = '';

  @State() searchHoly: boolean = false;
  @State() searchEthereal: boolean = false;

  @State() listening: boolean = false;

  componentWillLoad() {
    this.getHolyGrail();
    this.getUniqs();
    this.manageVoice();
  }

  STEPNBELEMENT = 40;
  recognition: any;

  manageVoice() {
    /* La zone texte */

    /* Initialise la reconnaissance vocale */
    const SpeechRecognition = (window as any).speechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-EN';
    this.recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        this.manageCommand(event.results[i][0].transcript);
      }
    };
  }

  manageCommand(msg: string) {
    console.log(msg);
    if (msg.includes('search')) {
      this.search = msg.replace('search', '').trim();
      console.log(this.search);
    }
    if (msg.includes('select first')) {
      const list = this.filterList(this.uniqs);
      if (list?.[0]?.id) {
        this.setHolyGrail(list[0].id);
      }
    }
  }

  async getUniqs() {
    let uniqs = [];
    fetchApi(ApisName.Uniq)?.then(data => {
      uniqs = csvToJson(data);
      fetchApi(ApisName.Set)?.then(data => (this.uniqs = [...uniqs, ...csvToJson(data)]));
      // .then(data => {
      //   console.log(
      //     data.map(d => {
      //       if (d.type) {
      //         const target = d.type.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
      //         return {
      //           label: target,
      //           src: `https://diablo2.io/styles/zulu/theme/images/items/${target}_graphic.png`,
      //         };
      //       }
      //     }),
      //   );
      // });
    });
  }

  handleChange(event) {
    this.search = event.target.value;
    this.display = this.STEPNBELEMENT;
  }

  getHolyGrail() {
    const holyGrail = localStorage.getItem('holyGrail');
    if (!holyGrail) return;

    try {
      this.holyGrail = JSON.parse(holyGrail);
    } catch (error) {
      console.log('WTF holy grail');
    }
  }

  setHolyGrail(itemId: Uniq['id'], ethereal = false, exist = true) {
    let holyItem = this.holyGrail.find(({ id }) => itemId === id);
    if (!holyItem) {
      this.holyGrail = [
        ...this.holyGrail,
        {
          id: itemId,
          ethereal,
          exist,
        },
      ];
    } else if (holyItem.ethereal !== ethereal) {
      this.holyGrail = this.holyGrail.map(hg => {
        if (hg.id !== itemId) return hg;
        return { ...hg, ethereal };
      });
    } else {
      this.holyGrail = this.holyGrail.filter(({ id }) => id !== itemId);
    }

    localStorage.setItem('holyGrail', JSON.stringify(this.holyGrail));
  }

  reFocus() {
    this.element.querySelectorAll('input')?.[0]?.focus();
    this.element.querySelectorAll('input')?.[0]?.select();
  }

  percent = 0;
  @State() display = this.STEPNBELEMENT;

  filterList(list: Uniq[]): Uniq[] {
    return list
      .filter(({ id, ['lvl req']: lvl }) => {
        if (!id || !lvl) {
          return;
        }

        if (this.searchHoly && !this.isHolyGrail(id)) {
          return false;
        }

        if (this.searchEthereal && !this.isHolyGrail(id)?.ethereal) {
          return false;
        }

        id = this.manageId(id);

        if (!this.search) {
          return true;
        }

        if (stringSimilarity.compareTwoStrings(id, this.search) > this.percent) {
          return true;
        }
      })
      .sort((a, b) => {
        const aid = this.manageId(a.id);
        const bid = this.manageId(b.id);
        return stringSimilarity.compareTwoStrings(bid, this.search) - stringSimilarity.compareTwoStrings(aid, this.search);
      })
      .slice(0, this.display);
  }

  manageId(id: Uniq['id']): Uniq['id'] {
    return id.toLowerCase().replace('the', '');
  }

  isHolyGrail(itemId: Uniq['id']): HolyGrail {
    return this.holyGrail.find(({ id }) => id === itemId);
  }

  @State() listImg: any = [];

  getPercent() {
    if (!this.uniqs?.length) return;
    return (
      <div>
        <span>(🏆{Math.round((this.holyGrail.length / this.uniqs.length) * 10000) / 100}%)</span>
        <span>(👻{Math.round((this.holyGrail.filter(({ ethereal }) => ethereal).length / this.uniqs.length) * 10000) / 100}%)</span>
      </div>
    );
  }

  manageScroll(ev) {
    const element = ev.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.display += this.STEPNBELEMENT;
    }
  }

  render() {
    return (
      <Host>
        {/* <div class="close"></div> */}
        <div class="header">
          <div>
            HOLY GRAIL [{this.holyGrail.length}/{this.uniqs.length}]
          </div>
          {this.getPercent()}
        </div>
        <div class="actions">
          <input
            list="list-uniq"
            value={this.search}
            onInput={event => {
              this.handleChange(event);
            }}
            placeholder="Item name"
          ></input>
          <div
            class={{
              on: this.searchHoly,
              action: true,
            }}
            onClick={() => {
              this.display = this.STEPNBELEMENT;
              this.searchHoly = !this.searchHoly;
            }}
          >
            🏆 {this.holyGrail.length}
          </div>
          <div
            class={{
              on: this.searchEthereal,
              action: true,
            }}
            onClick={() => {
              this.display = this.STEPNBELEMENT;
              this.searchEthereal = !this.searchEthereal;
            }}
          >
            👻 {this.holyGrail.filter(({ ethereal }) => ethereal).length}
          </div>
          <div
            class={{
              on: this.listening,
              action: true,
            }}
            onClick={() => {
              if (this.listening) {
                this.recognition.stop();
                this.listening = false;
              } else {
                this.recognition.start();
                this.listening = true;
              }
            }}
          >
            🎤
          </div>
        </div>

        <div class="list" onScroll={ev => this.manageScroll(ev)}>
          {this.filterList(this.uniqs).map(uniq => {
            const { id, value, ['lvl req']: lvl, type } = uniq;
            const holyGrailed = this.isHolyGrail(id);
            return (
              <div
                key={id}
                class={{
                  grailed: !!holyGrailed,
                  uniq: true,
                  ethereal: holyGrailed && holyGrailed.ethereal,
                }}
                onClick={() => this.setHolyGrail(id)}
              >
                {this.displayimg(id, type)}

                <div class="infos">
                  <div
                    class={{
                      name: true,
                      set: !!uniq.set,
                    }}
                  >
                    {id}
                  </div>

                  <div class="type">{type}</div>
                  <div class="lvl">{lvl}</div>
                </div>

                <div class="stats">
                  <div
                    class={{
                      name: true,
                      set: !!uniq.set,
                    }}
                  >
                    {id}
                  </div>
                  {this.manageStats(uniq)}
                </div>

                <div class="value">{value}</div>
                <div
                  class="ethereal"
                  title="Ethereal"
                  onClick={ev => {
                    ev.stopPropagation();
                    this.setHolyGrail(id, true);
                  }}
                >
                  👻
                </div>
                <div class="holyGrail">{holyGrailed ? '🏆' : ''}</div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }

  manageStats(uniq: Uniq): any {
    let statIndex = 1;
    const listData = [];
    while (uniq && uniq[`prop${statIndex}`] !== undefined) {
      listData.push({
        label: uniq[`prop${statIndex}`],
        min: uniq[`min${statIndex}`],
        max: uniq[`max${statIndex}`],
      });
      statIndex++;
    }
    return listData.map(({ min, max, label }) => {
      if (min === max) {
        return (
          <div class="attr">
            <div class="val">{max}</div>
            <div class="label">{label}</div>
          </div>
        );
      }

      return (
        <div class="attr variable">
          <div class="val">
            {min}-{max}
          </div>
          <div class="label">{label}</div>
        </div>
      );
    });
  }

  baseItem = [
    {
      base: 'doubleaxe',
      other: ['doubleaxe', 'ettinaxe', 'twinaxe'],
    },
    {
      base: 'militarypick',
      other: ['warspike', 'crowbill', 'militarypick'],
    },
    {
      base: 'waraxe',
      other: ['naga', 'waraxe', 'berserkeraxe'],
    },
    {
      base: 'largeaxe',
      other: ['militaryaxe', 'largeaxe', 'feralaxe'],
    },
    {
      base: 'broadaxe',
      other: ['beardedaxe', 'broadaxe', 'silver-edgedaxe'],
    },
    {
      base: 'greataxe',
      other: ['gothicaxe', 'greataxe', 'championaxe'],
    },
    {
      base: 'wand',
      other: ['burntwand', 'polishedwand', 'wand'],
    },
    {
      base: 'bonewand',
      other: ['tombwand', 'lichwand', 'bonewand'],
    },
    {
      base: 'giantaxe',
      other: ['giantaxe', 'ancientaxe', 'gloriousaxe'],
    },
    {
      base: 'yewwand',
      other: ['yewwand', 'ghostwand', 'petrifiedwand'],
    },
    {
      base: 'grandscepter',
      other: ['grandscepter', 'holywatersprinkler', 'seraphrod'],
    },
    {
      base: 'warscepter',
      other: ['warscepter', 'caduceus', 'divinescepter'],
    },
    {
      base: 'spikedclub',
      other: ['spikedclub', 'recipe:magicshieldofspikes', 'barbedclub'],
    },
    {
      base: 'mace',
      other: ['mace', 'flangedmace', 'reinforcedmace'],
    },
    {
      base: 'morningstar',
      other: ['morningstar', 'devilstar', 'jaggedstar'],
    },
    {
      base: 'flail',
      other: ['flail', 'knout', 'scourge'],
    },
    {
      base: 'warhammer',
      other: ['warhammer', 'battlehammer', 'legendarymallet'],
    },
    {
      base: 'maul',
      other: ['maul', 'ogremaul', 'warclub'],
    },
    {
      base: 'greatmaul',
      other: ['greatmaul', 'marteldefer', 'thundermaul'],
    },
    {
      base: 'shortsword',
      other: ['shortsword', 'falcata', 'gladius'],
    },
    {
      base: 'scimitar',
      other: ['scimitar', 'ataghan', 'cutlass'],
    },
    {
      base: 'crystalsword',
      other: ['crystalsword', 'dimensionalblade', 'phaseblade'],
    },
    {
      base: 'warsword',
      other: ['warsword', 'ancientsword', 'mythicalsword'],
    },
    {
      base: 'two-handedsword',
      other: ['two-handedsword', 'espadon', 'legendsword'],
    },
    {
      base: 'claymore',
      other: ['claymore', 'dacianfalx', 'highlandblade'],
    },
    {
      base: 'giantsword',
      other: ['giantsword', 'balrogblade', 'tusksword'],
    },
    {
      base: 'bastardsword',
      other: ['bastardsword', 'championsword', 'gothicsword'],
    },
    {
      base: 'dagger',
      other: ['dagger', 'boneknife', 'poignard'],
    },
    {
      base: 'dirk',
      other: ['dirk', 'mithrilpoint', 'rondel'],
    },
    {
      base: 'kriss',
      other: ['kriss', 'cinquedeas', 'fangedknife'],
    },
    {
      base: 'warspear',
      other: ['warspear', 'hyperionspear', 'spear'],
    },
    {
      base: 'fuscina',
      other: ['fuscina', 'stygianpike', 'trident'],
    },
    {
      base: 'brandistock',
      other: ['brandistock', 'mancatcher', 'warfork'],
    },
    {
      base: 'spear',
      other: ['spear', 'hyperionspear', 'warspear'],
    },
    {
      base: 'trident',
      other: ['trident', 'fuscina', 'stygianpike'],
    },
    {
      base: 'spetum',
      other: ['spetum', 'ghostspear', 'yari'],
    },
    {
      base: 'pike',
      other: ['pike', 'lance', 'warpike'],
    },
    {
      base: 'fuscina',
      other: ['fuscina', 'stygianpike', 'trident'],
    },
    {
      base: 'yari',
      other: ['yari', 'ghostspear', 'spetum'],
    },
    {
      base: 'saber',
      other: ['saber', 'elegantblade', 'shamshir'],
    },
    {
      base: 'scepter',
      other: ['scepter', 'mightyscepter', 'runescepter'],
    },
    {
      base: 'gnarledstaff',
      other: ['gnarledstaff', 'cedarstaff', 'elderstaff'],
    },
    {
      base: 'shortbow',
      other: ['shortbow', 'edgebow', 'spiderbow'],
    },
    {
      base: 'compositebow',
      other: ['compositebow', 'doublebow', 'greatbow'],
    },
  ];

  /*
let itemBlock = document.querySelector('.element-item');
let main = itemBlock.querySelector('h3').innerText.toLowerCase().replace(/ /g, "");
let others = [main];
itemBlock.querySelectorAll('.z-lh-usedin').forEach(d => {
if(!d.innerText.toLowerCase().replace(/ /g, "").includes('recipe')){
others.push(d.innerText.toLowerCase().replace(/ /g, ""))
}}
)
console.log({
      base: main,
      other: others.slice(0,3)
    });
    */

  reduceType(target: string): string {
    return target.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
  }

  getBaseType(type: string): string {
    const typetrim = this.reduceType(type);
    return this.baseItem.find(({ other }) => other.includes(typetrim))?.base || typetrim;
  }

  manageErrorImg(ev: any, type: string) {
    const typetrim = this.getBaseType(type);
    const typesrc = getAssetPath(`./assets/img/${typetrim}.png`);
    if (ev.target.src.includes(`/${typetrim}.png`)) {
      ev.target.remove();
    } else {
      ev.target.src = typesrc;
    }
  }

  displayimg(id: Uniq['id'], type: Uniq['type']) {
    const idTrim = id.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
    return (
      <div class="img">
        <img onError={ev => this.manageErrorImg(ev, type)} src={getAssetPath(`./assets/img/${idTrim}.png`)} loading="lazy"></img>
      </div>
    );
  }
}
