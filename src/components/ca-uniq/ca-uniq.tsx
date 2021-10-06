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
  @State() listening: boolean = false;

  componentWillLoad() {
    this.getHolyGrail();
    this.getUniqs();
    this.manageVoice();
  }

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
    fetchApi(ApisName.Uniq)?.then(data => {
      this.uniqs = csvToJson(data);
      fetchApi(ApisName.Set)?.then(data => (this.uniqs = [...this.uniqs, ...csvToJson(data)]));
      // .then(data => {
      //   // data.map(d => {
      //   //   //({
      //   //   //   label: d.id.trim(),
      //   //   //   src: `https://diablo2.io/styles/zulu/theme/images/items/${d.id.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim()}_graphic.png`,
      //   //   // })),
      //   // });
      // });
    });
  }

  handleChange(event) {
    this.search = event.target.value;
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
      this.holyGrail.push({
        id: itemId,
        ethereal,
        exist,
      });
    } else if (holyItem.ethereal !== ethereal) {
      holyItem = {
        ...holyItem,
        ethereal,
      };
    } else {
      this.holyGrail = this.holyGrail.filter(({ id }) => id !== itemId);
    }

    this.holyGrail = [...this.holyGrail];

    localStorage.setItem('holyGrail', JSON.stringify(this.holyGrail));

    this.element.querySelectorAll('input')?.[0]?.focus();
    this.element.querySelectorAll('input')?.[0]?.select();
  }

  percent = 0;

  filterList(list: Uniq[]): Uniq[] {
    return list
      .filter(({ id, ['lvl req']: lvl }) => {
        if (!id || !lvl) {
          return;
        }

        if (this.searchHoly && !this.isHolyGrail(id)) {
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
      });
  }

  manageId(id: Uniq['id']): Uniq['id'] {
    return id.toLowerCase().replace('the', '');
  }

  isHolyGrail(itemId: Uniq['id']): HolyGrail {
    return this.holyGrail.find(({ id }) => id === itemId);
  }

  @State() listImg: any = [];

  render() {
    return (
      <Host>
        <div class="close"></div>
        <div class="header">
          HOLY GRAIL [{this.holyGrail.length}/{this.uniqs.length}] (🏆{Math.round((this.holyGrail.length / this.uniqs.length) * 10000) / 100}%)
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
            onClick={() => (this.searchHoly = !this.searchHoly)}
          >
            🏆
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

        <div class="list">
          {this.filterList(this.uniqs).map(({ id, value, ['lvl req']: lvl, type }) => {
            const holyGrailed = this.isHolyGrail(id);
            return (
              <div
                key={id}
                class={{
                  grailed: !!holyGrailed,
                  uniq: true,
                }}
                onClick={() => this.setHolyGrail(id)}
              >
                {this.displayimg(id, type)}
                <div class="infos">
                  <div class="name">{id}</div>
                  <div class="type">{type}</div>
                  <div class="lvl">{lvl}</div>
                </div>
                <div class="value">{value}</div>
                <div class="holyGrail">{holyGrailed ? (holyGrailed.ethereal ? '🏆<Ethereal>' : '🏆') : ''}</div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }

  manageErrorImg(ev, type) {
    const typetrim = type.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
    const typesrc = getAssetPath(`./assets/img/${typetrim}.png`);
    if (ev.target.src.includes(`/${typetrim}.png`)) {
      ev.target.remove();
    } else {
      ev.target.src = typesrc;
    }
  }

  displayimg(id, type) {
    const idTrim = id.toLowerCase().replace(/'/g, '').replace(/ /g, '').trim();
    return (
      <div class="img">
        <img onError={ev => this.manageErrorImg(ev, type)} src={getAssetPath(`./assets/img/${idTrim}.png`)} loading="lazy"></img>
      </div>
    );
  }
}
