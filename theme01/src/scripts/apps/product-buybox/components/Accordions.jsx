import React from 'react';

const Accordions = ({ data }) => {
  const { product } = window.eHS;

  return (
    <div className="mt-7 lg:mt-14">
      {product.metafields.accordion_first && (
        <details open={data.firstOpen ? true : false}>
          <summary>{data.firstAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_first }}></div>
        </details>
      )}

      {product.metafields.accordion_second && (
        <details>
          <summary>{data.secondAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_second }}></div>
        </details>
      )}

      {product.metafields.accordion_third && (
        <details>
          <summary>{data.thirdAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_third }}></div>
        </details>
      )}

      {product.metafields.accordion_fourth && (
        <details>
          <summary>{data.fourthAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_fourth }}></div>
        </details>
      )}

      {product.metafields.accordion_fifth && (
        <details>
          <summary>{data.fifthAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_fifth }}></div>
        </details>
      )}

      {product.metafields.accordion_sixth && (
        <details className="!mb-6">
          <summary>{data.sixthAccordionLabel}</summary>
          <div dangerouslySetInnerHTML={{ __html: product.metafields.accordion_sixth }}></div>
        </details>
      )}
    </div>
  );
};

export default Accordions;
