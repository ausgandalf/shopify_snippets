import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import { addEffect } from '../../../utils/Effects.js';
import { getProductLabels } from '../../../utils/Product.js';

const SlideArrowSVG = () => (
  <svg className="max-lg:hidden" width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 13.661L26 22.4746L13.2203 33.9322L-2.2926e-06 22.4746L-1.90735e-06 13.661L26 13.661Z" fill="#FE5000" />
    <path d="M26 0L26 8.81356L-2.2926e-06 8.81356L-1.90735e-06 -1.1365e-06L26 0Z" fill="#FE5000" />
  </svg>
);

const Gallery = () => {
  const { product } = window.eHS;
  const labels = getProductLabels(product);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);
  const media =
    selectedVariant && selectedVariant.images.length > 0
      ? selectedVariant.images.filter((image) => Object.keys(image).length !== 0)
      : product.media;
  const thumbnails =
    selectedVariant && selectedVariant.thumbnails.length > 0
      ? selectedVariant.thumbnails.filter((image) => Object.keys(image).length !== 0)
      : product.media;

  useEffect(addEffect('selectedVariant', setSelectedVariant), []);
  useEffect(() => {
    refreshFsLightbox();

    if (fsLightboxInstances['pdp-gallery']) {
      fsLightboxInstances['pdp-gallery'].props.onSlideChange = function (fsLightbox) {
        const sources = fsLightbox.elements.sources;

        for (let i = 0; i < sources.length; i++) {
          const source = sources[i];
          if (source && source.tagName === 'VIDEO' && !source.paused) {
            source.pause();
          }

          if (source && source.tagName === 'IFRAME') {
            const iframe = source.contentWindow;
            iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        }
      };
    }
  });

  return (
    <div className="product-gallery relative lg:sticky overflow-hidden">
      <div className="lg:flex lg:items-start lg:flex-row-reverse lg:gap-6 lg:justify-end">
        <div className="relative lg:w-[calc(100%-104px)]">
          <Swiper modules={[Thumbs]} loop={true} thumbs={{ swiper: thumbsSwiper }}>
            {media.map((media, mediaIndex) => {
              const filsSource = media.file_info;

              return (
                <SwiperSlide key={`media-image-${mediaIndex}`}>
                  {filsSource?.media_type == 'video' ? (
                    <a className="relative block pb-[100%] cursor-pointer" href={filsSource.sources[1].url} data-fslightbox="pdp-gallery">
                      <span className="absolute inset-0 w-full h-full bg-grey-8 opacity-20"></span>
                      <span className="absolute inset-0 w-full h-full bg-play-icon bg-no-repeat bg-center"></span>
                      <img
                        className="mx-auto h-full w-full object-cover absolute left-0 top-0"
                        src={media.variant_image}
                        alt={media.image_alt_text ? media.image_alt_text : `${product.title} - ${selectedVariant.title}`}
                      />
                    </a>
                  ) : (
                    <a className="relative block pb-[100%] cursor-pointer" href={media.variant_image} data-fslightbox="pdp-gallery">
                      <img
                        className="mx-auto h-full w-full object-contain absolute left-0 top-0"
                        src={media.variant_image}
                        alt={media.image_alt_text ? media.image_alt_text : `${product.title} - ${selectedVariant.title}`}
                      />
                    </a>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {labels.length > 0 && (
            <div className="product-label-container">
              {labels.map((label) => (
                <div className={`product-label product-label--${label.replace(/\s+/g, '-').toLowerCase()}`} key={label}>
                  <div className="product-label-text">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Swiper
          className="product-gallery__thumbs max-lg:mt-4 self-stretch lg:h-[25rem] xl:h-[35rem]"
          modules={[Navigation, Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={5}
          slidesPerGroup={5}
          direction={'horizontal'}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          breakpoints={{
            1024: {
              spaceBetween: 16,
              slidesPerGroup: 4,
              slidesPerView: 4,
              direction: 'vertical',
            },
            1280: {
              spaceBetween: 16,
              slidesPerGroup: 6,
              slidesPerView: 6,
              direction: 'vertical',
            },
          }}
        >
          {thumbnails.map((media, mediaIndex) => (
            <SwiperSlide key={`media-image-${mediaIndex}`}>
              {media.file_info?.media_type == 'video' ? (
                <>
                  <span className="absolute h-7 w-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-contain bg-play-icon bg-no-repeat bg-center pointer-events-none"></span>
                  <img
                    className="mx-auto cursor-pointer h-[3.75rem] lg:h-20 w-full object-cover"
                    src={media.variant_image}
                    alt={media.image_alt_text ? media.image_alt_text : `${product.title} - ${selectedVariant.title}`}
                    width={100}
                    height={100}
                  />
                </>
              ) : (
                <img
                  className="mx-auto cursor-pointer h-[3.75rem] lg:h-20 w-full object-contain"
                  src={media.variant_image}
                  alt={media.image_alt_text ? media.image_alt_text : `${product.title} - ${selectedVariant.title}`}
                  width={100}
                  height={100}
                />
              )}
            </SwiperSlide>
          ))}

          <button className="slider__arrow slider__arrow--prev" ref={navigationPrevRef}>
            <SlideArrowSVG />
          </button>

          <button className="slider__arrow slider__arrow--next" ref={navigationNextRef}>
            <SlideArrowSVG />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
