import React, { useState, useEffect } from 'react';

const FreeShipping = ({ data }) => {
  const [cartState, setCartState] = useState(window.state.cartState);
  const [thresholds, setThresholds] = useState(data.thresholds);
  const [maxThreshold, setMaxThreshold] = useState(0);
  const [thresholdsActive, setThresholdsActive] = useState([]);
  // const [maxThresholdReachedMessage, setMaxThresholdReachedMessage] = useState('');
  const onlyFreeShipping = data.thresholds.length === 1 && data.thresholds[0].thresholdType === 'free_shipping';
  const validThresholds = data.thresholds.some((threshold) => threshold.thresholdAmount > 0);

  useEffect(() => {
    const abortController = window.listenToState(setCartState, 'cartState');
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (data.thresholds.length > 0) {
      setThresholds((current) => current.sort((a, b) => a.thresholdAmount - b.thresholdAmount));
      activeThresholds();
    }
  }, [cartState]);

  useEffect(() => {
    if (data.thresholds.length > 0) {
      setMaxThreshold(thresholds.slice(-1)[0].thresholdAmount);
    }
  }, [thresholds]);

  const thresholdMet = (threshold) => {
    return threshold > 0 && threshold < cartState.price;
  };

  const cleanThresholdMessage = (threshold, thresholdMessage) => {
    const toGo = threshold - (cartState.price || 0);
    return thresholdMessage.replace('$TOTAL', (toGo / 100.0).toFixed(2));
  };

  const activeThresholds = () => {
    let result = [];

    thresholds.some((threshold) => {
      if (threshold.thresholdAmount > cartState.price) {
        return result.push(threshold);
      }

      result = [threshold];

      return threshold === cartState.price;
    });

    setThresholdsActive(result);
  };

  const FreeGiftIcon = ({ active }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="14" fill={active ? '#FE5000' : '#D9D9D9'} />
      <path
        d="M20.4467 9.22849H18.6703C18.7866 9.04857 18.8749 8.85194 18.9324 8.64528C19.0769 8.10085 18.992 7.52031 18.697 7.04008C18.0924 6.03216 16.7882 5.69975 15.7756 6.29633C15.1817 6.63878 14.4754 7.81058 14.0259 8.65062C13.5765 7.81058 12.8702 6.63878 12.2762 6.29633C11.2603 5.70174 9.95534 6.03884 9.35486 7.05077C9.0599 7.53099 8.97496 8.11153 9.11944 8.65596C9.17829 8.85862 9.26658 9.05191 9.38161 9.22849H7.60519C6.71899 9.22849 6 9.94748 6 10.8337V11.9038C6.00201 12.5827 6.43005 13.1866 7.07013 13.4127V19.3948C7.07013 20.281 7.78912 21 8.67532 21H19.3766C20.2628 21 20.9818 20.281 20.9818 19.3948V13.4127C21.6219 13.1866 22.0499 12.5827 22.0519 11.9038V10.8337C22.0519 9.94748 21.3329 9.22849 20.4467 9.22849ZM16.3107 7.23274C16.8217 6.93778 17.4758 7.11235 17.7714 7.62333C17.9118 7.85609 17.952 8.13566 17.8838 8.39916C17.8135 8.66803 17.6376 8.89745 17.3968 9.0359C16.8236 9.2011 16.2264 9.26599 15.6312 9.22852H14.941C15.2761 8.48746 15.7402 7.81191 16.3107 7.23274ZM10.6443 9.01446C10.4035 8.87602 10.2276 8.64661 10.1574 8.37773C10.0978 8.11956 10.142 7.84869 10.2804 7.62329C10.4717 7.29222 10.8242 7.0889 11.2061 7.08823C11.394 7.09024 11.578 7.1404 11.7412 7.2327C12.3117 7.8119 12.7758 8.48742 13.1109 9.22845H12.4207C11.8208 9.26055 11.2195 9.18769 10.6443 9.01446ZM7.07006 10.8337C7.07006 10.5381 7.3095 10.2986 7.60513 10.2986H13.4908V12.4389H7.60513C7.3095 12.4389 7.07006 12.1994 7.07006 11.9038V10.8337ZM8.14019 19.3947V13.5785H13.4908V19.9298H8.67526C8.37963 19.9298 8.14019 19.6903 8.14019 19.3947ZM19.9116 19.3947C19.9116 19.5365 19.8554 19.673 19.7551 19.7733C19.6548 19.8736 19.5183 19.9298 19.3766 19.9298H14.561V13.5785H19.9116L19.9116 19.3947ZM20.9817 11.9038C20.9817 12.0456 20.9256 12.182 20.8252 12.2824C20.7249 12.3827 20.5885 12.4389 20.4467 12.4389H14.561V10.2986H20.4467C20.5885 10.2986 20.7249 10.3548 20.8252 10.4551C20.9256 10.5554 20.9817 10.6919 20.9817 10.8337V11.9038Z"
        fill={active ? 'white' : 'black'}
      />
    </svg>
  );

  const FreeShippingIcon = ({ active }) => (
    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14.5" cy="14" r="14" fill={active ? '#FE5000' : '#D9D9D9'} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9672 17.9704C10.8795 18.1358 10.7076 18.24 10.5203 18.24C10.4393 18.24 10.3596 18.2201 10.2879 18.1816L8.31433 17.1483C8.06797 17.0195 7.97235 16.7153 8.10184 16.469C8.23066 16.2226 8.53481 16.127 8.78117 16.2565L10.7547 17.2897C11.0011 17.4192 11.096 17.724 10.9672 17.9704ZM14.0617 6.00003H14.0152C13.9415 6.00335 13.8698 6.02328 13.8054 6.05847L6.77027 9.74135C6.60359 9.82768 6.49932 9.99967 6.5 10.1869V17.9192C6.5 18.1065 6.60426 18.2785 6.77027 18.3648L13.8061 22.0463C13.9515 22.1247 14.1268 22.1247 14.2722 22.0463L21.3067 18.3634C21.4727 18.2771 21.5769 18.1058 21.5769 17.9185V10.1869C21.5769 10.0003 21.4727 9.82832 21.3067 9.742L14.2709 6.05844C14.2065 6.02324 14.1354 6.00335 14.0617 6.00003ZM14.0385 7.07183L19.9892 10.1869L18.5787 10.926L12.822 7.70792L14.0385 7.07183ZM14.5418 20.7701V14.1746L15.864 13.4827V15.8873C15.8646 16.1058 16.0061 16.2997 16.2146 16.3661C16.2637 16.382 16.3149 16.39 16.3667 16.3907C16.53 16.3893 16.6821 16.3103 16.7764 16.1768L17.7446 14.8108L18.5733 15.115C18.7281 15.1714 18.9001 15.1489 19.0349 15.0539C19.169 14.9596 19.2493 14.8055 19.2487 14.6409V11.7097L20.5702 11.0178V17.6139L14.5418 20.7701ZM15.3088 12.6387L14.0385 13.304L8.08845 10.1869L9.55271 9.4206L15.3088 12.6387ZM16.3746 12.0788L10.6179 8.86278L11.7568 8.26712L17.5128 11.4825L16.3739 12.0782L16.3746 12.0788ZM16.87 12.9574L18.2426 12.2382V13.9209L17.7287 13.7343C17.5155 13.6566 17.2764 13.731 17.1456 13.9163L16.8694 14.3054V12.9567L16.87 12.9574ZM7.50676 11.0177V17.6139L13.5351 20.7701V14.1746L7.50676 11.0177Z"
        fill={active ? 'white' : 'black'}
      />
    </svg>
  );

  return (
    data.thresholds.length > 0 && (
      <div className="py-4 px-5 border-b border-color-3" style={{ backgroundColor: data.thresholdBackground }}>
        <p className={`mb-1 text-center text-xs`} style={{ color: data.thresholdTextColor }}>
          {thresholds.length > 1 && thresholdMet(maxThreshold)
            ? 'You’ve unlocked a FREE GIFT and FREE SHIPPING!'
            : thresholdsActive.map((thresholdActive) => {
                return thresholdMet(thresholdActive.thresholdAmount)
                  ? thresholdActive.thresholdReachedMessage + ' '
                  : cleanThresholdMessage(thresholdActive.thresholdAmount, thresholdActive.thresholdMessage);
              })}
        </p>

        {!onlyFreeShipping && (
          <div className={`flex mb-2 mt-6 ${thresholds.length > 1 ? 'justify-between' : 'justify-center'}`}>
            {thresholds.map((threshold, index) => {
              return threshold.thresholdType == 'free_gift' ? (
                <div className="flex flex-col items-center gap-1" key={index}>
                  <FreeGiftIcon active={thresholdMet(threshold.thresholdAmount)} />
                  <p className="caps-small">${threshold.thresholdAmount / 100}+ Free Gift</p>
                  {data.rebuyGiftID && <div data-rebuy-id={data.rebuyGiftID} className="hidden"></div>}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1" key={index}>
                  <FreeShippingIcon active={thresholdMet(threshold.thresholdAmount)} />
                  <p className="caps-small">${threshold.thresholdAmount / 100}+ Free Shipping</p>
                </div>
              );
            })}
          </div>
        )}

        {validThresholds && (
          <div className="flex items-center">
            {onlyFreeShipping && (
              <p className="text-xs mr-2" style={{ color: data.thresholdTextColor }}>
                $0
              </p>
            )}
            <div className="h-2 w-full grow-1 overflow-hidden" style={{ backgroundColor: data.thresholdBarBackground }}>
              <div
                style={{
                  width: `${thresholdMet(maxThreshold) ? 100 : Math.min(100, (cartState.price / maxThreshold) * 100.0)}%`,
                  backgroundColor: data.thresholdBarFillBackground,
                }}
                className="h-full transition-all duration-300"
              ></div>
            </div>

            {onlyFreeShipping && (
              <p className="text-xs ml-2" style={{ color: data.thresholdTextColor }}>
                ${maxThreshold / 100}
              </p>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default FreeShipping;
