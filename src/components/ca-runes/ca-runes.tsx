import { Component, h, Host, State } from '@stencil/core';
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

  componentWillLoad() {
    this.getRunes();
  }

  async getRunes() {
    fetchApi(ApisName.Runes)?.then(data => (this.runes = csvToJson(data)));
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
        &nbsp;Craft from :&nbsp; 3 {prevRune.letter} ({(Number(prevRune.value) * 300) / 100})
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div class="close"></div>
        <div class="header">HIGH + LOW Runes estimate value</div>
        {this.runes
          .filter(({ letter, value }) => letter && value)
          .map(({ id, letter, value }) => {
            return (
              <div key={id} class="rune">
                <div class="value">{value}</div>
                <div class="name">{letter}</div>

                {this.renderCraft(id)}
              </div>
            );
          })}
      </Host>
    );
  }
}
