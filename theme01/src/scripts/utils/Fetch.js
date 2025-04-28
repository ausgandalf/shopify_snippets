export const fetchJSON = (url) => {
  return fetch(url).then((blob) => blob.json());
};

export const fetchHTML = (url) => {
  return fetch(url).then((blob) => blob.text());
};

export const fetchJSONTemplate = (handle) => {
  return fetchJSON(`/products/${handle}?view=json-view`);
};
