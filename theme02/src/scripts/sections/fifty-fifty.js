const qs = {
  fifty: '[data-section-type="fifty-fifty"]',
  inlineVideo: '[data-inline-video]',
  muteButton: '[data-mute]',
  unmuteButton: '[data-unmute]',
  playButton: '[data-play]',
  pauseButton: '[data-pause]',
  resetButton: '[data-reset]'
};

const handleFiftyVideoEvents = () => {
  document.addEventListener("click", function(e) {
    const fifty = e.target.closest(qs.fifty);

    if (!!fifty) {
      const inlineVideo = fifty.querySelector(qs.inlineVideo);
      const muteButton = fifty.querySelector(qs.muteButton);
      const unmuteButton = fifty.querySelector(qs.unmuteButton);
      const playButton = fifty.querySelector(qs.playButton);
      const pauseButton = fifty.querySelector(qs.pauseButton);
      const mute = e.target.closest(qs.muteButton);
      const unmute = e.target.closest(qs.unmuteButton);
      const play = e.target.closest(qs.playButton);
      const pause = e.target.closest(qs.pauseButton);
      const reset = e.target.closest(qs.resetButton);

      if (!!mute) {
        unmuteButton.classList.remove('hidden');
        muteButton.classList.add('hidden');
        inlineVideo && (inlineVideo.muted = true);
      }

      if (!!unmute) {
        unmuteButton.classList.add('hidden');
        muteButton.classList.remove('hidden');
        inlineVideo && (inlineVideo.muted = false);
      }

      if (!!play) {
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        inlineVideo && inlineVideo.play();
      }

      if (!!pause) {
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
        inlineVideo && inlineVideo.pause();
      }

      if (!!reset) {
        inlineVideo && (inlineVideo.currentTime = 0);
      }
    }
  });
};

export const setupFiftySection = () => {
  handleFiftyVideoEvents();
};
