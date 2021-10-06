export declare enum ApisName {
  Runes = "runes",
  Uniq = "uniq",
  Set = "set"
}
export declare function fetchApi(target: ApisName, evolution?: boolean): Promise<any>;
