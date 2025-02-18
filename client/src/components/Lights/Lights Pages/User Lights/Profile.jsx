import { useProfileLights } from "../../../../hooks/lights/pages/useProfileLights";
import { useSortAndPaginate } from "../../../../hooks/lights/filter lights/useSortAndPaginate";

import CreateLightParagraph from "../../Single Light/Create Light/CreateLightParagraph";
import RenderLights from "../shared components/RenderLights";
import PaginateLights from "../shared components/PaginateLights";

import "../lightsPages.css";


export default function Profile() {
  const [
    filteredLights,
    sort,
    spinner,
  ] = useProfileLights();

  const [currentItems, pageCount, handlePageClick] = useSortAndPaginate(
    filteredLights,
    sort
  );

  return (
    <div className="lights_page_container">
      <h1>My Lights</h1>
      <CreateLightParagraph />
      <RenderLights props={{ filteredLights, currentItems, spinner }} />
      <PaginateLights props={{ pageCount, handlePageClick }} />
    </div>
  );
}
