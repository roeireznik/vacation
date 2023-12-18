import React from "react";
import './pagination.css';

function Pagination({ pageNumber, totalPages, setPageNumber, isActive }) {
  const pageNumbers = [];

  if(isActive){
    pageNumbers.push(1);
  }else if(!isActive){
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <div id="wrapper">
      <div className="b-pagination-outer">
        <ul id="border-pagination">
          <li>
            <a
              className={pageNumber === 1 ? "block" : ""}
              href="#"
              onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1);
                  }
              }}
            >
              «
            </a>
          </li>
          {pageNumbers.map((page) => (
            <li key={page}>
              <a
                onClick={() => setPageNumber(page)}
                className={page === pageNumber ? "active" : ""}
                href="#"
              >
                {page}
              </a>
            </li>
          ))}
          <li>
            <a
              className={pageNumber === totalPages ? "block" : ""}
              href="#"
              onClick={() => {
                if (pageNumber < totalPages) {
                  setPageNumber(pageNumber + 1);
                }
              }}
            >
              »
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
