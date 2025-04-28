import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  modal: '[data-modal]',
  modalOpen: '[data-modal-open]',
  modalClose: '[data-modal-close]',
  modalBackdrop: '[data-modal-backdrop]',
  modalVideo: '[data-modal-video]',
};

const qsAll = {
  container: 'data-modal-container',
};

const dom = {};

cacheDom(dom, {}, qsAll);

const openModal = (modal) => {
  modal.classList.add('active');

  // Lock Body scroll
  document.body.classList.add('overflow-hidden');
};

const closeModal = (modal) => {
  modal.classList.remove('active');

  // Unlock Body scroll
  document.body.classList.remove('overflow-hidden');
};

const buildIframe = (modalVideo) => {
  const src = modalVideo.getAttribute('data-src');
  modalVideo.src = src;
  modalVideo.removeAttribute('data-src');
};

const bindEvents = () => {
  if (dom.container) {
    dom.container.forEach((section) => {
      const modal = section.querySelector(selectors.modal);

      if (modal) {
        const modalOpen = section.querySelector(selectors.modalOpen);
        const modalClose = section.querySelector(selectors.modalClose);
        const modalBackdrop = section.querySelector(selectors.modalBackdrop);
        const modalVideo = section.querySelector(selectors.modalVideo);

        modalOpen.addEventListener('click', (event) => {
          if (modalVideo.hasAttribute('data-src')) {
            buildIframe(modalVideo);
          }

          openModal(modal);
        });

        modalClose.addEventListener('click', (event) => {
          if (modalVideo) {
            modalVideo.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            modalVideo.contentWindow.postMessage('{"method":"unload"}', '*');
            const temp = modalVideo.src;
            modalVideo.src = temp;
          }

          closeModal(modal);
        });

        modalBackdrop.addEventListener('click', (event) => {
          if (modalVideo) {
            modalVideo.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            modalVideo.contentWindow.postMessage('{"method":"unload"}', '*');
            const temp = modalVideo.src;
            modalVideo.src = temp;
          }

          closeModal(modal);
        });
      }
    });
  }
};

const Modal = {
  init() {
    cacheDom();
    bindEvents();
  },
};

export default Modal;
