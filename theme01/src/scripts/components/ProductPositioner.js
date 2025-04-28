export const setPreviousProductLink = () => {
  sessionStorage.setItem('previousProductLink', `/products/${window.eHS.product.handle}`);
}

export const scrollToLastProduct = () => {
  setTimeout(() => {
    const productURL = sessionStorage.getItem('previousProductLink');
    if (productURL) {
      const productTile = document.querySelector(`[href="${productURL}"]`) || false;
      if (productTile) {
        const productTileOffset = productTile.getBoundingClientRect().top;
        window.scrollTo({
          top: productTileOffset + document.documentElement.scrollTop - 200,
        });
      }
    }
  }, 600);
};
