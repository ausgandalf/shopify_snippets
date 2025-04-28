import React, { useState, useEffect, useRef } from 'react';

import { addEffect } from '../../../utils/Effects.js';

const NutritionPanel = () => {
  const nutritionPanelModal = useRef(null);
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);

  useEffect(addEffect('selectedVariant', setSelectedVariant), []);

  const openModal = (e) => {
    e.preventDefault();

    nutritionPanelModal.current.classList.add('active');

    // Lock Body scroll
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = (e) => {
    e.preventDefault();

    nutritionPanelModal.current.classList.remove('active');

    // Lock Body scroll
    document.body.classList.remove('overflow-hidden');
  };

  return (
    selectedVariant &&
    selectedVariant.metafields.nutrition_panel && (
      <>
        <p className="flex items-center gap-3 pl-3">
          <span>|</span>

          <a href="#" onClick={openModal}>
            Nutrition Info
          </a>
        </p>

        <div className="modal" ref={nutritionPanelModal}>
          <div className="modal__container container">
            <div className="modal__close bg-close bg-no-repeat bg-center w-5 h-5 bg-contain" onClick={closeModal}></div>

            <div className="modal__inner">
              <img
                className="col-start-5 col-span-4"
                src={selectedVariant.metafields.nutrition_panel}
                alt={selectedVariant.title}
                loading="lazy"
              />
            </div>
          </div>

          <span className="modal__backdrop" onClick={closeModal}></span>
        </div>
      </>
    )
  );
};

export default NutritionPanel;
