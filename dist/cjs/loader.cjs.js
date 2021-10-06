'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a8905306.js');

/*
 Stencil Client Patch Esm v2.8.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["ca-charm.cjs",[[1,"ca-charm"]]],["ca-runes.cjs",[[1,"ca-runes",{"runes":[32]}]]],["ca-runeword.cjs",[[1,"ca-runeword"]]],["ca-uniq.cjs",[[0,"ca-uniq",{"uniqs":[32],"holyGrail":[32],"search":[32],"searchHoly":[32],"listening":[32],"listImg":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
