import { useEffect, useState } from 'react';

export const useOneLight = (location, setAdjustable, setIntegratedLed) => {
  const [light, setLight] = useState({
    name: '',
    price: '',
    date: '',
    quantities: '',
    dimensions: '',
    imageURL: '',
    notes: '',
    minHeight: '',
    maxHeight: '',
    kelvins: '',
    lumens: '',
    watt: '',
    bulbType: '',
    bulbsRequired: '',
  });

  useEffect(() => {
    if (location.state) {
        const getLight = location.state.light;
        setLight(getLight);

        if (getLight.minHeight) {
          setAdjustable(true);
        } else {
          setAdjustable(false);
        }

        if (getLight.kelvins) {
          setIntegratedLed(true);
        } else{
          setIntegratedLed(false);
        }
      
      }
  }, [location.state, setAdjustable, setIntegratedLed]);
   
  return [light];
};
