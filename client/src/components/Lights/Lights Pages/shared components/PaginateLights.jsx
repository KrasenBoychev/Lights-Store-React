import ReactPaginate from "react-paginate";

import "./paginateLights.css";

export default function PaginateLights({ props }) {
  const { pageCount, handlePageClick } = props;

  return (
    <div className="lights_pagination_container">
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
