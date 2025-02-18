import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getMarketplaceLights } from "../../../../api/lights-api";

export function useMarketplaceLights() {
  const [spinner, setSpinner] = useState(false);
  const [lights, setLights] = useState([]);
  const [filteredLights, setFilteredLights] = useState([]);
  const [seacrhFormValues, setSearchFormValues] = useState({});
  const [sort, setSort] = useState("nameAscending");

  const navigate = useNavigate();

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await getMarketplaceLights();
        setLights(allLights);

        setFilteredLights(allLights);

        setSearchFormValues({
          name: "",
          minPrice: "",
          maxPrice: "",
          lightType: "",
        });
      } catch (error) {
        toast(error.message);
        navigate("/");
      } finally {
        setSpinner(false);
      }
    })();
  }, []);

  return [
    lights,
    setLights,
    filteredLights,
    setFilteredLights,
    seacrhFormValues,
    setSearchFormValues,
    sort,
    setSort,
    spinner,
  ];
}
