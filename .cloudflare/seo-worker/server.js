'use strict';

// Environment based endpoints
const envUris = {};

// Default meta content
let defaultTitle = '';
let defaultContent = '';

const pageMeta = () => {
  return {
    referral: [
      { name: '__PAGE_TITLE__', content: 'Referral | Sutton Information Hub' },
      {
        name: '__PAGE_META_DESCRIPTION__',
        content:
          'Sutton Information Hub is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton',
      },
      {
        name: '__PAGE_META_OG_DESCRIPTION__',
        content:
          'Sutton Information Hub is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton',
      },
      { name: '__PAGE_META_OG_TITLE__', content: 'Referral | Sutton Information Hub' },
      { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
      { name: '__PAGE_META_OG_IMAGE__', content: `${envUris.logoUrl}` },
    ],
    'duty-to-refer': [
      { name: '__PAGE_TITLE__', content: 'Duty to refer | Sutton Information Hub' },
      {
        name: '__PAGE_META_DESCRIPTION__',
        content:
          'Sutton Information Hub is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton',
      },
      {
        name: '__PAGE_META_OG_DESCRIPTION__',
        content:
          'Sutton Information Hub is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton',
      },
      { name: '__PAGE_META_OG_TITLE__', content: 'Duty to refer | Sutton Information Hub' },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: `${envUris.logoUrl}` },
    ],
    'privacy-policy': [
      { name: '__PAGE_TITLE__', content: 'Privacy policy | Sutton Information Hub' },
      {
        name: '__PAGE_META_DESCRIPTION__',
        content: 'We are committed to protecting and respecting your privacy',
      },
      {
        name: '__PAGE_META_OG_DESCRIPTION__',
        content: 'We are committed to protecting and respecting your privacy',
      },
      { name: '__PAGE_META_OG_TITLE__', content: 'Privacy policy | Sutton Information Hub' },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: `${envUris.logoUrl}` },
    ],
    'terms-and-conditions': [
      { name: '__PAGE_TITLE__', content: 'Terms and conditions | Sutton Information Hub' },
      {
        name: '__PAGE_META_DESCRIPTION__',
        content:
          'This page (together with the documents referred to on it) outlines the terms and conditions on which we and our partners offer services to you',
      },
      {
        name: '__PAGE_META_OG_DESCRIPTION__',
        content:
          'This page (together with the documents referred to on it) outlines the terms and conditions on which we and our partners offer services to you',
      },
      { name: '__PAGE_META_OG_TITLE__', content: 'Terms and conditions | Sutton Information Hub' },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: `${envUris.logoUrl}` },
    ],
  };
};

const getApi = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'NodeHttp',
    },
  });
  return response.json();
};

const fetchService = async (name) => {
  try {
    const response = await getApi(`${envUris.apiBase}/services/${name.trim()}`);
    return _get(response, 'data');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchOrganisation = async (name) => {
  try {
    const response = await getApi(`${envUris.apiBase}/organisations/${name.trim()}`);
    return _get(response, 'data');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchInformationPage = async (slug) => {
  try {
    const response = await getApi(`${envUris.apiBase}/pages/${slug.trim()}`);
    return _get(response, 'data');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchCategory = async (id) => {
  try {
    const response = await getApi(`${envUris.apiBase}/collections/categories/${id}`);
    return _get(response, 'data');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchPersona = async (id) => {
  try {
    const response = await getApi(`${envUris.apiBase}/collections/personas/${id}`);
    return _get(response, 'data');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchSettings = async (name) => {
  try {
    const response = await getApi(`${envUris.apiBase}/settings`);
    return _get(response, 'data.cms');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const removeMarkdown = (content) => {
  const h3 = /^### (.*\b)/gim;
  const h2 = /^## (.*\b)/gim;
  const h2Alt = /\n+-+\n+/gim;
  const h1 = /^# (.*\b)/gim;
  const h1Alt = /\n+=+\n+/gim;
  const bq = /^\> (.*\b)/gim;
  const bold = /\*\*(.*)\*\*/gim;
  const italics = /\*(.*)\*/gim;
  const image = /!\[(.*?)\]\((.*?)\)/gim;
  const link = /\[(.*?)\]\((.*?)\)/gim;
  const lineBreak = /\n+/gim;
  const quote = /\"+/gim;

  const text = content
    .replace(quote, '') // Double quotes
    .replace(h3, '$1') // h3
    .replace(h2, '$1') // h2
    .replace(h2Alt, ' ') // h2 Alt syntax
    .replace(h1, '$1') // h1
    .replace(h1Alt, ' ') // h1 Alt syntax
    .replace(bq, '$1') // blockquote
    .replace(bold, '$1') // bold
    .replace(italics, '$1') // italic
    .replace(image, '$1') // image alt text
    .replace(link, '$1') // link
    .replace(lineBreak, ' '); // linebreak

  return text.trim();
};

const iterable = (item) => {
  return item && typeof item === 'object' && (Array.isArray(item) || item.constructor === Object);
};

const _get = (data, path, defaultValue = null) => {
  if (iterable(data)) {
    const steps = path.split('.');
    let node = data;
    for (let i in steps) {
      const step = steps[i];
      if (i == steps.length - 1) {
        return node[step];
      }
      if (!iterable(node[step])) {
        return defaultValue;
      }
      node = node[step];
    }
  }
  return defaultValue;
};

const getUrlParameter = (name) => {
  if (!envUris.querystring) {
    return null;
  }
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]?' + name + '=([^&#]*)');
  var results = regex.exec(envUris.querystring);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const prepareDescription = (rawPageContent) => {
  if (rawPageContent === '') {
    rawPageContent = defaultContent;
  }
  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent);

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161);

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...');

  return metaDesc;
};

const renderServiceMeta = async (slug) => {
  const data = await fetchService(slug);

  const metaTitle = _get(data, 'name', defaultTitle);
  const serviceHasLogo = _get(data, 'has_logo', false);
  const orgHasLogo = _get(data, 'organisation.has_logo', false);
  const orgImageUrl = `${envUris.apiBase}/organisations/${data.organisation_id}/logo.png?v=${data.organisation_id}`;

  const rawPageContent = _get(data, 'intro', '');

  const metaDesc = prepareDescription(rawPageContent);

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}/services/${data.slug}` },
      {
        name: '__PAGE_META_OG_IMAGE__',
        content: serviceHasLogo
          ? `${envUris.apiBase}/services/${data.id}/logo.png?`
          : orgHasLogo
          ? orgImageUrl
          : envUris.logoUrl,
      },
    ];
  }

  return metas;
};

const renderOrganisationMeta = async (slug) => {
  const data = await fetchOrganisation(slug);

  const metaTitle = _get(data, 'name', defaultTitle);
  const orgHasLogo = _get(data, 'has_logo', false);
  const orgImageUrl = `${envUris.apiBase}/organisations/${data.id}/logo.png?v=${data.id}`;

  const rawPageContent = _get(data, 'description', '');

  const metaDesc = prepareDescription(rawPageContent);

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}/organisations/${data.slug}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: orgHasLogo ? orgImageUrl : envUris.logoUrl },
    ];
  }

  return metas;
};

const renderInformationPageMeta = async (slug) => {
  const data = await fetchInformationPage(slug);

  const metaTitle = _get(data, 'title', defaultTitle);
  const pageHasImage = !!_get(data, 'image.id', false);

  const rawPageContent = _get(data, 'content.introduction.copy', defaultContent);

  const metaDesc = prepareDescription(rawPageContent[0]);

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}/${data.id}` },
      {
        name: '__PAGE_META_OG_IMAGE__',
        content: pageHasImage ? `${envUris.apiBase}/pages/${data.id}/image.png?` : envUris.logoUrl,
      },
    ];
  }

  return metas;
};

const renderResultsMeta = async () => {
  const category = getUrlParameter('category');

  const persona = getUrlParameter('persona');

  let rawPageContent = '';
  let data = null;
  let collectionImage = '';

  if (category) {
    data = await fetchCategory(category);

    rawPageContent = _get(data, 'intro', '');

    collectionImage = `${envUris.apiBase}/collections/categories/${category}/image.svg`;
  }

  if (persona) {
    data = await fetchPersona(persona);

    rawPageContent = _get(data, 'intro', '');

    collectionImage = `${envUris.apiBase}/collections/personas/${persona}/image.png`;
  }

  const metaDesc = prepareDescription(rawPageContent);

  const metaTitle = _get(data, 'name', defaultTitle).concat(' in Sutton');

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: metaTitle },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: metaTitle },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}?${envUris.querystring}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: `${collectionImage}` },
    ];
  }

  return metas;
};

const renderCmsMeta = async (page) => {
  const data = await fetchSettings();

  const metaTitle = _get(data, `frontend.${page}.title`, defaultTitle);
  let rawPageContent = _get(data, `frontend.${page}.content`, '');

  const metaDesc = prepareDescription(rawPageContent);

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: envUris.logoUrl },
    ];
  }

  return metas;
};

const renderHomeMeta = async () => {
  const data = await fetchSettings();

  const metaTitle = _get(data, `frontend.banner.title`, '');

  let rawPageContent = _get(data, `frontend.banner.content`, '');

  const metaDesc = prepareDescription(rawPageContent);

  let metas = [];

  if (data) {
    metas = [
      { name: '__PAGE_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
      { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Sutton Information Hub` },
      {
        name: '__PAGE_META_OG_URL__',
        content: `${envUris.frontendBaseUrl}${envUris.originalPath}`,
      },
      { name: '__PAGE_META_OG_IMAGE__', content: envUris.logoUrl },
    ];
  }

  return metas;
};

const renderMeta = async () => {
  const data = await fetchSettings();
  defaultTitle = _get(data, `frontend.banner.title`, '');
  defaultContent = _get(data, `frontend.banner.content`, '');

  const urlElements = envUris.originalPath.split('/');

  let meta = [];
  let slug = '';
  switch (urlElements[1]) {
    case 'services':
      if (!urlElements[2] || urlElements[2] === '') {
        throw new Error('Missing slug');
      }
      slug = urlElements[2].trim();
      meta = await renderServiceMeta(slug);
      break;
    case 'organisations':
      if (!urlElements[2] || urlElements[2] === '') {
        throw new Error('Missing slug');
      }
      slug = urlElements[2].trim();
      meta = await renderOrganisationMeta(slug);
      break;
    case 'pages':
      if (!urlElements[2] || urlElements[2] === '') {
        throw new Error('Missing slug');
      }
      slug = urlElements[2].trim();
      meta = await renderInformationPageMeta(slug);
      break;
    case 'results':
      meta = await renderResultsMeta();
      break;
    case 'favourites':
    case 'about':
    case 'contact':
    case 'get-involved':
      const page = urlElements[1].trim().replace(/-/g, '_');
      meta = await renderCmsMeta(page);
      break;
    case 'privacy-policy':
    case 'terms-and-conditions':
    case 'duty-to-refer':
    case 'referral':
      meta = pageMeta()[urlElements[1]];
      break;
    default:
      meta = await renderHomeMeta();
  }
  return meta;
};

const renderPage = async () => {
  try {
    const response = await fetch(`${envUris.frontendBaseUrl}/index.html`);
    let body = await response.text();
    const metas = await renderMeta();

    metas.forEach((meta) => {
      if (meta.content !== '') {
        body = body.replace(String(meta.name), `${meta.content}`);
        return;
      }
      body = body.replace(String(meta.name), '');
    });
    // Return response
    return new Response(body, {
      status: '200',
      statusText: 'OK',
      headers: {
        'Cache-Control': 'max-age=100',
        'Content-Type': 'text/html',
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(err, {
      status: '504',
      statusText: 'Bad Gateway',
      headers: {
        'Cache-Control': 'max-age=100',
        'Content-Type': 'text/html',
      },
    });
  }
};

export default async function render(request) {
  let url = new URL(request.url);
  // Development workaround
  // url = new URL(`https://staging.suttoninformationhub.org.uk${url.pathname}${url.search}`);
  envUris.frontendBaseUrl = `https://${url.hostname}`;
  envUris.apiBase = `https://api.${url.hostname}/core/v1`;
  envUris.originalPath = url.pathname;
  envUris.querystring = url.search;
  envUris.logoUrl = `${envUris.frontendBaseUrl}/sutton-information-hub-logo.svg`;

  return await renderPage();
}
