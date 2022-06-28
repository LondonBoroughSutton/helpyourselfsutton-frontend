'use strict';

/**
 * API Token: zcUbKt6iUtFagG3isEDiL5ROmrypO5KF62TW7ltw
 */
import render from './server';

const originUri = 'https://staging.suttoninformationhub.org.uk';

addEventListener('fetch', (event) => {
  console.log(event.request.url);
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const path = request.url.slice(request.url.indexOf('/', 8));

  console.log(path);

  if (
    path.includes('.js') ||
    path.includes('.css') ||
    path.includes('.png') ||
    path.includes('.jpg') ||
    path.includes('.svg')
  ) {
    // Asset request: return to Cloudflare
    const originalResponse = await fetch(`${originUri}${path}`);
    return originalResponse;
  }

  return render(request);

  // const originalResponse = await fetch(`${originUri}/index.html`);

  // let response = new Response(originalResponse.body, {
  //   headers: originalResponse.headers,
  //   status: originalResponse.status,
  //   statusText: originalResponse.statusText,
  // });

  // return response;
}
