import { useMarketplaceLights } from "../../../../hooks/lights/pages/useMarketplaceLights";
import { useSortAndPaginate } from "../../../../hooks/lights/filter lights/useSortAndPaginate";

import Search from "../../Filter Lights/Search";
import RenderLights from "../shared components/RenderLights";
import PaginateLights from "../shared components/PaginateLights";

import "../lightsPages.css";

export default function Marketplace() {
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
  ] = useMarketplaceLights();

  const [currentItems, pageCount, handlePageClick] = useSortAndPaginate(
    filteredLights,
    sort
  );

  return (
    <div className="lights_page_container commercial_pages">
      <h1>Marketplace Lights</h1>
      <section className="lights_filter_wrapper">
        <Search
          lightsState={{ lights, setLights }}
          filteredLightsState={{ filteredLights, setFilteredLights }}
          searchFormProps={{ seacrhFormValues, setSearchFormValues }}
          sortState={{ sort, setSort }}
        />
        <RenderLights props={{ currentItems, spinner }} />
      </section>
      <PaginateLights props={{ pageCount, handlePageClick }} />
    </div>
  );
}
