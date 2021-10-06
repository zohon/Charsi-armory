'use strict';

exports.ApisName = void 0;
(function (ApisName) {
  ApisName["Runes"] = "runes";
  ApisName["Uniq"] = "uniq";
  ApisName["Set"] = "set";
})(exports.ApisName || (exports.ApisName = {}));
const listUrls = [
  {
    name: exports.ApisName.Runes,
    id: '2PACX-1vS2xluOJ3R_-Jkeq9ccg_DXLwu5zBBpkeoV-oBq32SQ1SSRp6SdPTJag9l5yQtKpy5oqkaqV6HW4k_s',
    gid: '1373699183',
    evolgid: '439801429',
  },
  {
    name: exports.ApisName.Uniq,
    id: '2PACX-1vQNlcp78PZpjrinRpq-IJvaDQN7N3RVgm61ottyfR6cj8GBygUmaCQYpzFjIKkAXAGFfkr6hjnoMhP-',
    gid: '926954590',
    evolgid: '672145742',
  },
  {
    name: exports.ApisName.Set,
    id: '2PACX-1vSEuZPcdmaSo_5bkerBUUjv4mcXRFGpvXTZwMLvw_8Wl0-ORxq1okk01WYfeysyy1Hoxcbd7U3XlLuh',
    gid: '706247009',
    evolgid: '',
  },
];
function fetchApi(target, evolution = false) {
  const apiData = listUrls.find(({ name }) => name === target);
  if (!apiData)
    return;
  return fetch(`https://docs.google.com/spreadsheets/d/e/${apiData.id}/pub?gid=${evolution ? apiData.evolgid : apiData.gid}&single=true&output=csv`).then(response => response.text());
}

function csvToJson(csv) {
  // Convert the data to String and
  // split it in an array
  var array = csv.toString().split('\r');
  // All the rows of the CSV will be
  // converted to JSON objects which
  // will be added to result in an array
  let result = [];
  // The array[0] contains all the
  // header columns so we store them
  // in headers array
  let headers = array[0].split(',');
  // Since headers are separated, we
  // need to traverse remaining n-1 rows.
  for (let i = 1; i < array.length; i++) {
    let obj = {};
    let str = array[i];
    const replaceComma = '###';
    var r = str.replace(/"[^"]+"/g, function (v) {
      return v.replace(/,/g, replaceComma);
    });
    // Split the string using pipe delimiter |
    // and store the values in a properties array
    let properties = r.split(',');
    // For each header, if the value contains
    // multiple comma separated data, then we
    // store it in the form of array otherwise
    // directly the value is stored
    for (let j in headers) {
      if (properties[j]) {
        if (properties[j].includes(replaceComma)) {
          obj[headers[j]] = properties[j]
            .split(replaceComma)
            .map(item => item.trim())
            .join('.')
            .replace(/"/g, '');
        }
        else
          obj[headers[j]] = properties[j];
      }
    }
    // Add the generated object to our
    // result array
    result.push(obj);
  }
  return result;
}

exports.csvToJson = csvToJson;
exports.fetchApi = fetchApi;
