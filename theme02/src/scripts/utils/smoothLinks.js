export const initSmoothLinks = () => {
  const smoothLinks = document.querySelectorAll(`a[href^="#"]`);

  smoothLinks && smoothLinks.forEach((smoothLink) => {
    smoothLink.addEventListener('click', (event) => {
      event.preventDefault();

      window.history.replaceState(null, null, smoothLink.getAttribute('href'));
      document.querySelector(smoothLink.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: "center"
      });
    });
  });
};