const qs = {
  hero: '[data-section-type="hero"]',
  inlineVideo: '[data-inline-video]',
  inlineVideoMobile: '[data-inline-video-mobile]',
  muteButton: '[data-mute]',
  unmuteButton: '[data-unmute]',
  playButton: '[data-play]',
  pauseButton: '[data-pause]'
};

const handleHeroVideoEvents = () => {
  document.addEventListener("click", function(e) {
    const hero = e.target.closest(qs.hero);

    if (!!hero) {
      const inlineVideo = hero.querySelector(qs.inlineVideo);
      const inlineVideoMobile = hero.querySelector(qs.inlineVideoMobile);
      const muteButton = hero.querySelector(qs.muteButton);
      const unmuteButton = hero.querySelector(qs.unmuteButton);
      const playButton = hero.querySelector(qs.playButton);
      const pauseButton = hero.querySelector(qs.pauseButton);
      const mute = e.target.closest(qs.muteButton);
      const unmute = e.target.closest(qs.unmuteButton);
      const play = e.target.closest(qs.playButton);
      const pause = e.target.closest(qs.pauseButton);

      if (!!mute) {
        unmuteButton.classList.remove('hidden');
        muteButton.classList.add('hidden');
        inlineVideoMobile && (inlineVideoMobile.muted = true);
        inlineVideo && (inlineVideo.muted = true);
      }

      if (!!unmute) {
        unmuteButton.classList.add('hidden');
        muteButton.classList.remove('hidden');
        if (window.innerWidth < 1024) {
          inlineVideoMobile && (inlineVideoMobile.muted = false);
          inlineVideo && (inlineVideo.muted = true);
        } else {
          inlineVideo && (inlineVideo.muted = false);
          inlineVideoMobile && (inlineVideoMobile.muted = true);
        }
      }

      if (!!play) {
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        inlineVideoMobile && inlineVideoMobile.play();
        if (window.innerWidth < 1024) {
          inlineVideoMobile && inlineVideoMobile.play();
          inlineVideo && inlineVideo.pause();
        } else {
          inlineVideo && inlineVideo.play();
          inlineVideoMobile && inlineVideoMobile.pause();
        }
      }

      if (!!pause) {
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
        inlineVideo && inlineVideo.pause();
        inlineVideoMobile && inlineVideoMobile.pause();
      }
    }
  });
};

export const setupHeroSection = () => {
  handleHeroVideoEvents();
};
