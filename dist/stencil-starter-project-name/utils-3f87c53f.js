var ApisName;
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
function fetchApi(target, evolution = false) {
  const apiData = listUrls.find(({ name }) => name === target);
  if (!apiData)
    return;
  return fetch(`https://docs.google.com/spreadsheets/d/e/${apiData.id}/pub?gid=${evolution ? apiData.evolgid : apiData.gid}&single=true&output=csv`).then(response => response.text());
}

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
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
function similarity(a, b) {
  var equivalency = 0;
  var minLength = a.length > b.length ? b.length : a.length;
  var maxLength = a.length < b.length ? b.length : a.length;
  for (var i = 0; i < minLength; i++) {
    if (a[i] == b[i]) {
      equivalency++;
    }
  }
  var weight = equivalency / maxLength;
  return weight;
}
function similarityOld(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export { ApisName as A, csvToJson as c, fetchApi as f };