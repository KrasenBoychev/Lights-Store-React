/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate';

import { useAllLights, useSortAndPaginate } from '../../hooks/useLights';

import './ShowLights.css';

import CatalogLight from '../Light/CatalogLight/CatalogLight';
import CreateLightParagraph from './chunks/CreateLightParagraph';
import Search from './chunks/Search';
import Spinner from '../Spinner';

export default function ShowLights(props) {
  const [
    lights,
    setLights,
    filteredLights,
    setFilteredLights,
    seacrhFormValues,
    setSearchFormValues,
    sort,
    setSort,
    spinner,
    currPage,
  ] = useAllLights(props);

  const [currentItems, pageCount, handlePageClick] = useSortAndPaginate(
    filteredLights,
    sort
  );

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
            sortState={{ sort, setSort }}
          />
        )
      )}

      <div className="items-container">
        {spinner ? (
          <Spinner />
        ) : filteredLights.length > 0 ? (
          currentItems.map((light) => {
            return <CatalogLight key={light._id} {...light} />;
          })
        ) : (
          <p>There are no lights available at the moment</p>
        )}
      </div>

      <ReactPaginate
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
}
