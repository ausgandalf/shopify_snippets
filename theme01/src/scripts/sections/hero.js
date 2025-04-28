import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  ctaInlineVideo: '[data-inline-video]',
  ctaInlinePlayPause: '[data-play-pause]'
}

const qsAll = {
  hero: 'data-hero-section' 
};

const dom = {}

cacheDom(dom, {}, qsAll);

const playPause = (playBtn, video) => {

  if (video.classList.contains('paused')) {
    video.play();
    video.classList.remove('paused');
    playBtn.classList.remove('paused');
  } else {
    video.pause();
    video.classList.add('paused');
    playBtn.classList.add('paused');
  }
}

const videoFinished = (playBtn, video) => {
  video.classList.add('paused');
  playBtn.classList.add('paused');
}

const handleHeroEvents = () => {
  if (dom.hero) {
    dom.hero.forEach(hero => {
      const inlineVideo = hero.querySelector(selectors.ctaInlineVideo);

      if (inlineVideo) {
        const ctaInlinePlayPause = hero.querySelector(selectors.ctaInlinePlayPause);
        let playVideoOnce = true;
        let videoIsVisible = false;

        if (inlineVideo.dataset.autoplay == 'true') {
          let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                videoIsVisible = true;
                
                // Autoplay the video one time when in viewport
                if (videoIsVisible && playVideoOnce && window.innerWidth >= 1024) {
                  playVideoOnce = false;
                  playPause(ctaInlinePlayPause, inlineVideo);
                }
                observer.unobserve(entry.target);
              }
            });
          });
          observer.observe(hero);
        }
        
        ctaInlinePlayPause.addEventListener('click', (event) => {
          playPause(ctaInlinePlayPause, inlineVideo);
        });

        // Check if the video finished and put paused states
        inlineVideo.addEventListener('ended', function (e) {
          videoFinished(ctaInlinePlayPause, inlineVideo);
        });
      }
    });
  }
}


const Hero = {
  init() {
    cacheDom();
    handleHeroEvents();
  }
}

export default Hero