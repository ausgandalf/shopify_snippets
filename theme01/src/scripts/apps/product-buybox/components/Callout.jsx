import React from 'react';

const Callout = () => {
  const { product } = window.eHS;

  return (
    <div className="mt-3">
      {product.metafields.callout_first && (
        <div className="py-7 px-5 bg-grey-1 flex items-start">
          {product.metafields.callout_first.icon && (
            <img
              src={product.metafields.callout_first.icon}
              alt={product.metafields.callout_first.title}
              className="mt-0.5"
              loading="lazy"
            />
          )}

          <div className="flex-1 px-3">
            {product.metafields.callout_first.title && <p className="caps-small">{product.metafields.callout_first.title}</p>}

            {product.metafields.callout_first.message && (
              <div dangerouslySetInnerHTML={{ __html: product.metafields.callout_first.message }}></div>
            )}
          </div>
        </div>
      )}

      {product.metafields.callout_second && (
        <div className="mt-3 py-7 px-5 bg-grey-1 flex items-start">
          {product.metafields.callout_second.icon && (
            <img
              src={product.metafields.callout_second.icon}
              alt={product.metafields.callout_second.title}
              className="mt-0.5"
              loading="lazy"
            />
          )}

          <div className="flex-1 px-3">
            {product.metafields.callout_second.title && <p className="caps-small">{product.metafields.callout_second.title}</p>}

            {product.metafields.callout_second.message && (
              <div dangerouslySetInnerHTML={{ __html: product.metafields.callout_second.message }}></div>
            )}
          </div>
        </div>
      )}

      {product.metafields.callout_third && (
        <div className="mt-3 py-7 px-5 bg-grey-1 flex items-start">
          {product.metafields.callout_third.icon && (
            <img
              src={product.metafields.callout_third.icon}
              alt={product.metafields.callout_third.title}
              className="mt-0.5"
              loading="lazy"
            />
          )}

          <div className="flex-1 px-3">
            {product.metafields.callout_third.title && <p className="caps-small">{product.metafields.callout_third.title}</p>}

            {product.metafields.callout_third.message && (
              <div dangerouslySetInnerHTML={{ __html: product.metafields.callout_third.message }}></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Callout;
