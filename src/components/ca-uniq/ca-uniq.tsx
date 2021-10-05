import { Component, h, Host, State } from '@stencil/core';
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
  assetsDirs: ['../../assets'],
  shadow: true,
})
export class CaUniq {
  @State() uniqs: Uniq[] = [];
  @State() holyGrail: HolyGrail[] = [];
  @State() search: string = '';
  @State() searchHoly: boolean = false;

  componentWillLoad() {
    this.getHolyGrail();
    this.getUniqs();
  }

  async getUniqs() {
    fetchApi(ApisName.Uniq)?.then(data => {
      this.uniqs = csvToJson(data);
      fetchApi(ApisName.Set)?.then(data => (this.uniqs = [...this.uniqs, ...csvToJson(data)]));
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

    console.log(this.holyGrail);

    localStorage.setItem('holyGrail', JSON.stringify(this.holyGrail));
  }

  percent = 0;

  filterList(list: Uniq[]): Uniq[] {
    console.log(list);
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

  render() {
    return (
      <Host>
        <div class="close"></div>
        <div class="header">
          HOLY GRAIL [{this.holyGrail.length}/{this.uniqs.length}] (🏆{Math.round((this.holyGrail.length / this.uniqs.length) * 10000) / 100}%)
        </div>
        <div class="actions">
          <input list="list-uniq" value={this.search} onInput={event => this.handleChange(event)} placeholder="Item name"></input>
          <div
            class={{
              on: this.searchHoly,
              action: true,
            }}
            onClick={() => (this.searchHoly = !this.searchHoly)}
          >
            🏆
          </div>
        </div>

        <div class="list">
          {this.filterList(this.uniqs).map(({ id, value, ['lvl req']: lvl, type }) => {
            const holyGrailed = this.isHolyGrail(id);

            return (
              <div key={id} class="uniq" onClick={() => this.setHolyGrail(id)}>
                <div class="name">{id}</div>
                <div class="lvl">{lvl}</div>
                <div class="type">{type}</div>
                <div class="value">{value}</div>
                <div class="holyGrai">{holyGrailed ? (holyGrailed.ethereal ? '<Ethereal>' : '🏆 <Aquired>') : ''}</div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
