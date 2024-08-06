/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useAllLights } from '../../hooks/useLights';

import './ShowLights.css';

import CatalogLight from '../Light/CatalogLight/CatalogLight';
import CreateLightParagraph from './CreateLightParagraph';
import Search from './Search';
import Spinner from '../Spinner';

export default function ShowLights(props) {
  const [
    lights,
    setLights,
    filteredLights,
    setFilteredLights,
    seacrhFormValues,
    setSearchFormValues,
    spinner,
    currPage,
  ] = useAllLights(props);

  return (
    <div className="catalog_section">
      <h1>
        {currPage == 'profile'
          ? 'My Lights'
          : currPage == 'marketplace'
          ? 'Welcome to ' + currPage
          : 'Our range of lights'}
      </h1>

      {currPage == 'profile' ? (
        <CreateLightParagraph />
      ) : (
        currPage != 'profile' && (
          <Search
            lightsState={{ lights, setLights }}
            filteredLightsState={{ filteredLights, setFilteredLights }}
            searchFormProps={{ seacrhFormValues, setSearchFormValues }}
          />
        )
      )}

      <div className="items-container">
        {spinner ? (
          <Spinner />
        ) : filteredLights.length > 0 ? (
          filteredLights.map((light) => {
            return <CatalogLight key={light._id} {...light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>
    </div>
  );
}
