import { useEffect } from 'react';

export function useSearch(props) {
    const { lightsState, filteredLightsState, searchFormProps, sortState } = props;
    const { seacrhFormValues, setSearchFormValues } = searchFormProps;
    const { name, minPrice, maxPrice, lightType } = seacrhFormValues;

    useEffect(() => {
        (function search() {
        const filteredItems = lightsState.lights.filter(
          (light) =>
            light.name.toLowerCase().includes(name.toLowerCase()) 
              && (Number(minPrice) 
                  ? Number(maxPrice)
                    ? light.price >= Number(minPrice) && light.price <= Number(maxPrice)
                    : light.price >= Number(minPrice)
                  : Number(maxPrice)
                    ? light.price <= Number(maxPrice)
                    : true
                 )
              && (lightType == 'integratedLed'
                  ? light.kelvins
                  : lightType == 'bulbType'
                      ? light.bulbType
                      : true
                 )
        );
    
        filteredLightsState.setFilteredLights(filteredItems);
      })();
    
      }, [name, minPrice, maxPrice, lightType]);


    return [name, minPrice, maxPrice, lightType, setSearchFormValues, sortState];
}