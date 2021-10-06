'use strict';

const index = require('./index-a8905306.js');

/*
 Stencil Client Patch Browser v2.8.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('stencil-starter-project-name.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["ca-charm.cjs",[[1,"ca-charm"]]],["ca-runes.cjs",[[1,"ca-runes",{"runes":[32]}]]],["ca-runeword.cjs",[[1,"ca-runeword"]]],["ca-uniq.cjs",[[0,"ca-uniq",{"uniqs":[32],"holyGrail":[32],"search":[32],"searchHoly":[32],"listening":[32],"listImg":[32]}]]]], options);
});
