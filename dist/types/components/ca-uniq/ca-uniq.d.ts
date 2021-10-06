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
export declare class CaUniq {
  element: HTMLElement;
  uniqs: Uniq[];
  holyGrail: HolyGrail[];
  search: string;
  searchHoly: boolean;
  listening: boolean;
  componentWillLoad(): void;
  recognition: any;
  manageVoice(): void;
  manageCommand(msg: string): void;
  getUniqs(): Promise<void>;
  handleChange(event: any): void;
  getHolyGrail(): void;
  setHolyGrail(itemId: Uniq['id'], ethereal?: boolean, exist?: boolean): void;
  percent: number;
  filterList(list: Uniq[]): Uniq[];
  manageId(id: Uniq['id']): Uniq['id'];
  isHolyGrail(itemId: Uniq['id']): HolyGrail;
  listImg: any;
  render(): any;
  baseItem: {
    base: string;
    other: string[];
  }[];
  reduceType(target: string): string;
  getBaseType(type: string): string;
  manageErrorImg(ev: any, type: string): void;
  displayimg(id: Uniq['id'], type: Uniq['type']): any;
}
export {};
