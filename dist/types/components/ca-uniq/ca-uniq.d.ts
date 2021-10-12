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
  searchEthereal: boolean;
  listening: boolean;
  componentWillLoad(): void;
  STEPNBELEMENT: number;
  recognition: any;
  manageVoice(): void;
  manageCommand(msg: string): void;
  getUniqs(): Promise<void>;
  handleChange(event: any): void;
  getHolyGrail(): void;
  setHolyGrail(itemId: Uniq['id'], ethereal?: boolean, exist?: boolean): void;
  reFocus(): void;
  percent: number;
  display: number;
  filterList(list: Uniq[]): Uniq[];
  manageId(id: Uniq['id']): Uniq['id'];
  isHolyGrail(itemId: Uniq['id']): HolyGrail;
  listImg: any;
  getPercent(): any;
  manageScroll(ev: any): void;
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
