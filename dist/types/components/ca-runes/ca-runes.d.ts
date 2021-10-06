interface Rune {
  id: string;
  name: string;
  value: string;
  letter: string;
}
export declare class CaRunes {
  runes: Rune[];
  componentWillLoad(): void;
  getRunes(): Promise<void>;
  getCloseRune(id: Rune['id'], pos?: number): Rune | undefined;
  getPrice(rune: Rune): number;
  renderCraft(id: Rune['id']): any;
  render(): any;
}
export {};
