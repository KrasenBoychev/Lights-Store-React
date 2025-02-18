import { useState } from "react";

export function useSortAndPaginate(filteredLights, sort) {
    const sortMethods = {
      'nameAscending': { method: (a, b) => a.name.localeCompare(b.name) },
      'nameDescending': { method: (a, b) => b.name.localeCompare(a.name) },
      'priceAscending': { method: (a, b) => a.price - b.price },
      'priceDescending': { method: (a, b) => b.price - a.price },
    };
  
    const [itemOffset, setItemOffset] = useState(0);
  
    const itemsPerPage = 4;
  
    const items = filteredLights ? filteredLights.sort(sortMethods[sort].method) : '';
  
    const endOffset = itemOffset + itemsPerPage;
   
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };
  
    return [currentItems, pageCount, handlePageClick];
  }
  