'use strict';

import render from './server';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  const assetRegex = /(?:\/static\/)+|(?:\.png)+|(?:\.jpg)+|(?:\.svg)+|(?:\.ico)+/g;
  if (url.pathname.search(assetRegex) !== -1) {
    // Asset request: return to Cloudflare
    // Development workaround
    // return await fetch(
    //   new URL(`https://staging.suttoninformationhub.org.uk${url.pathname}${url.search}`).toString()
    // );
    return fetch(request);
  }

  return render(request);
}
