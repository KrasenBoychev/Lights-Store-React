import { useCatalogLights } from "../../../../hooks/lights/pages/useCatalogLights";
import { useSortAndPaginate } from "../../../../hooks/lights/filter lights/useSortAndPaginate";

import Search from "../../Filter Lights/Search";
import RenderLights from "../shared components/RenderLights";
import PaginateLights from "../shared components/PaginateLights";

import "../lightsPages.css";

export default function Catalog() {
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
  ] = useCatalogLights();

  const [currentItems, pageCount, handlePageClick] = useSortAndPaginate(
    filteredLights,
    sort
  );

  return (
    <div className="lights_page_container">
      <h1>Catalog Lights</h1>
      <section className="lights_filter_wrapper">
        <Search
          lightsState={{ lights, setLights }}
          filteredLightsState={{ filteredLights, setFilteredLights }}
          searchFormProps={{ seacrhFormValues, setSearchFormValues }}
          sortState={{ sort, setSort }}
        />
        <RenderLights props={{ filteredLights, currentItems, spinner }} />
      </section>
      <PaginateLights props={{ pageCount, handlePageClick }} />
    </div>
  );
}
