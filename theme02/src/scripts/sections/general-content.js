import Player from '@vimeo/player';

export const initGeneralContent = () => {
  const smoothLinks = document.querySelectorAll(`a.nav-link`);
  const embedIframes = document.querySelectorAll(`#content iframe`);

  document.addEventListener('click', (e) => {
    const smoothLink = e.target.closest('a.nav-link');

    if (smoothLink) {
      smoothLinks && smoothLinks.forEach((link) => {
        link.classList.remove('active');
      });

      smoothLink.classList.add('active');
    }

    const embedButton = e.target.closest('button.embedIframe');

    if (embedButton) {
      const iframeWrapper = embedButton.closest('p');
      const embedIframe = iframeWrapper && iframeWrapper.querySelector('iframe');
      embedButton.remove();

      if (embedIframe.src.includes('player.vimeo.com')) {
        var player = new Player(embedIframe);

        player.play();
      }

      if (embedIframe.src.includes('www.youtube.com')) {
        e.preventDefault();
        embedIframe.src += "&autoplay=1";
      }
    }
  });

  embedIframes && embedIframes.forEach((embedIframe) => {
    const newButton = document.createElement("button");
    newButton.classList.add('embedIframe');
    newButton.innerText = 'PLAY';

    const iframeWrapper = embedIframe.closest('p');

    iframeWrapper && iframeWrapper.appendChild(newButton);
  });
};
