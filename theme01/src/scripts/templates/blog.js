import { Ajaxinate } from 'ajaxinate';

document.addEventListener("DOMContentLoaded", function() {
  new Ajaxinate({
    container: '#blog-grid-container',
    pagination: '#blog-grid-pagination',
    method: 'click',
    offset: 1000,
    callback: () => {
      const articleCount = document.getElementById("blog-grid-container").childElementCount;

      document.getElementById("blog-grid-items").innerHTML = articleCount
    }
  });
});
