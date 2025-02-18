import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfileLights } from "../../../../api/lights-api";

export function useProfileLights() {
  const [spinner, setSpinner] = useState(false);
  const [filteredLights, setFilteredLights] = useState([]);
  const [sort, setSort] = useState("nameAscending");

  const navigate = useNavigate();

  useEffect(() => {
    (async function getAllLights() {
      try {
        setSpinner(true);
        const allLights = await getProfileLights();
        setFilteredLights(allLights);

      } catch (error) {
        toast(error.message);
        navigate("/");
        
      } finally {
        setSpinner(false);
      }
    })();
  }, []);

  return [filteredLights, sort, spinner];
}
