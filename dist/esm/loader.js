import { p as promiseResolve, b as bootstrapLazy } from './index-55a52670.js';

/*
 Stencil Client Patch Esm v2.8.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["ca-charm",[[1,"ca-charm"]]],["ca-runes",[[1,"ca-runes",{"runes":[32]}]]],["ca-runeword",[[1,"ca-runeword"]]],["ca-uniq",[[0,"ca-uniq",{"uniqs":[32],"holyGrail":[32],"search":[32],"searchHoly":[32],"listening":[32],"listImg":[32]}]]]], options);
  });
};

export { defineCustomElements };
