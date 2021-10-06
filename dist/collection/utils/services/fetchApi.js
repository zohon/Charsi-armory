export var ApisName;
(function (ApisName) {
  ApisName["Runes"] = "runes";
  ApisName["Uniq"] = "uniq";
  ApisName["Set"] = "set";
})(ApisName || (ApisName = {}));
const listUrls = [
  {
    name: ApisName.Runes,
    id: '2PACX-1vS2xluOJ3R_-Jkeq9ccg_DXLwu5zBBpkeoV-oBq32SQ1SSRp6SdPTJag9l5yQtKpy5oqkaqV6HW4k_s',
    gid: '1373699183',
    evolgid: '439801429',
  },
  {
    name: ApisName.Uniq,
    id: '2PACX-1vQNlcp78PZpjrinRpq-IJvaDQN7N3RVgm61ottyfR6cj8GBygUmaCQYpzFjIKkAXAGFfkr6hjnoMhP-',
    gid: '926954590',
    evolgid: '672145742',
  },
  {
    name: ApisName.Set,
    id: '2PACX-1vSEuZPcdmaSo_5bkerBUUjv4mcXRFGpvXTZwMLvw_8Wl0-ORxq1okk01WYfeysyy1Hoxcbd7U3XlLuh',
    gid: '706247009',
    evolgid: '',
  },
];
export function fetchApi(target, evolution = false) {
  const apiData = listUrls.find(({ name }) => name === target);
  if (!apiData)
    return;
  return fetch(`https://docs.google.com/spreadsheets/d/e/${apiData.id}/pub?gid=${evolution ? apiData.evolgid : apiData.gid}&single=true&output=csv`).then(response => response.text());
}
