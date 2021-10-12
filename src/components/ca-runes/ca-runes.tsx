import { Component, h, Host, Prop, State } from '@stencil/core';
import { ApisName, fetchApi } from '../../utils/services/fetchApi';
import { csvToJson } from '../../utils/utils';

interface Rune {
  id: string;
  name: string;
  value: string;
  letter: string;
}

@Component({
  tag: 'ca-runes',
  styleUrl: 'ca-runes.scss',
  shadow: true,
})
export class CaRunes {
  @State() runes: Rune[] = [];
  @Prop({ mutable: true }) hide = false;
  @State() runeCount: any[] = [];

  componentWillLoad() {
    this.getRunes();
  }

  async getRunes() {
    fetchApi(ApisName.Runes)?.then(data => (this.runes = csvToJson(data)));
  }

  getRuneCount() {
    const runeCount = localStorage.getItem('runeCount');
    if (!runeCount) return;

    try {
      this.runeCount = JSON.parse(runeCount);
    } catch (error) {
      console.log('WTF holy grail');
    }
  }

  addRune(itemId: string) {
    let holyItem = this.runeCount.find(({ id }) => itemId === id);
    if (!holyItem) {
      this.runeCount = [
        ...this.runeCount,
        {
          id: itemId,
          nb: 1,
        },
      ];
    } else {
      this.runeCount = this.runeCount.map(rune => {
        if (rune.id !== itemId) return rune;
        return { ...rune, nb: rune.nb + 1 };
      });
    }
    localStorage.setItem('runeCount', JSON.stringify(this.runeCount));
  }

  removeRune(itemId: string) {
    this.runeCount = this.runeCount.map(rune => {
      if (rune.id !== itemId) return rune;
      if (rune.nb < 1) return rune;
      return { ...rune, nb: rune.nb - 1 };
    });
    localStorage.setItem('runeCount', JSON.stringify(this.runeCount));
  }

  getCloseRune(id: Rune['id'], pos: number = -1): Rune | undefined {
    const nextRune = this.runes.find(({ id: runeKey }) => parseInt(runeKey.replace('r', '')) === parseInt(id.replace('r', '')) + pos);
    if (nextRune) {
      return nextRune;
    }
  }

  getPrice(rune: Rune): number {
    return (Number(rune.value) * 300) / 100;
  }

  renderCraft(id: Rune['id']) {
    const prevRune = this.getCloseRune(id);

    if (!prevRune?.value) return;
    return (
      <div class="craft">
        &nbsp;🔨&nbsp; 3 {prevRune.letter} ({(Number(prevRune.value) * 300) / 100})
      </div>
    );
  }

  render() {
    return (
      <Host class={{ hide: this.hide }}>
        <div class="close" onClick={() => (this.hide = !this.hide)}></div>
        <div class="header">Runes estimate value</div>

        <div class="list">
          {this.runes
            .filter(({ letter }) => letter)
            .reverse()
            // .sort((a, b) => {
            //   return !!a.value ? -1 : Number(b.value) - Number(a.value);
            // })
            .map(({ id, letter, value }) => {
              return (
                <div
                  key={id}
                  class="rune"
                  onContextMenu={ev => {
                    ev.preventDefault();
                    this.removeRune(letter);
                  }}
                  onClick={() => this.addRune(letter)}
                >
                  <div class="value">{value}</div>
                  <div class="nb">{this.runeCount.find(rune => rune.id === letter)?.nb}</div>
                  <div class="name">{letter}</div>

                  {this.renderCraft(id)}
                </div>
              );
            })}
        </div>
      </Host>
    );
  }
}
