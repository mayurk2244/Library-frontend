import React, { useEffect, useState } from "react";

function BookTable() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState({
    field: "ID",
    sort: true,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const sortedArray = [...books];
    let field;
    switch (sortBy.field) {
      case "ID":
        field = "id";
        break;
      case "Name":
        field = "title";
        break;
      case "Author":
        field = "author";
        break;
      case "ISBN":
        field = "isbn";
        break;
    }

    sortedArray.sort((a, b) =>
      a[field] > b[field] ? (sortBy.sort ? 1 : -1) : sortBy.sort ? -1 : 1
    );
    setBooks(sortedArray);
  }, [sortBy]);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = (_page = 1) => {
    fetch(
      `https://testlibrary.netlify.app/.netlify/functions/api/books?page=${_page}&size=${size}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPage(_page);
        let totalPageSize = Math.floor(res.total / size);
        res.total % size > 0 ? totalPageSize++ : null;
        setTotalPage(totalPageSize);
        setCurrentPage(currentPage);
        setBooks(res.data);
        setSortBy({
          field: "ID",
          sort: true,
        });
      });
  };

  const sortingIcon = (th) => {
    return sortBy.field == th ? (
      sortBy.sort ? (
        <i className="bi bi-arrow-down"></i>
      ) : (
        <i className="bi bi-arrow-up"></i>
      )
    ) : (
      <i className="bi bi-arrow-down-up"></i>
    );
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <a
                href="#"
                onClick={() => {
                  setSortBy({
                    field: "ID",
                    sort: !sortBy.sort,
                  });
                }}
              >
                ID
                {sortingIcon("ID")}
              </a>
            </th>
            <th scope="col">
              <a
                href="#"
                onClick={() => {
                  setSortBy({
                    field: "Name",
                    sort: !sortBy.sort,
                  });
                }}
              >
                Name
                {sortingIcon("Name")}
              </a>
            </th>
            <th scope="col">
              <a
                href="#"
                onClick={() => {
                  setSortBy({
                    field: "Author",
                    sort: !sortBy.sort,
                  });
                }}
              >
                Author
                {sortingIcon("Author")}
              </a>
            </th>
            <th scope="col">
              <a
                href="#"
                onClick={() => {
                  setSortBy({
                    field: "ISBN",
                    sort: !sortBy.sort,
                  });
                }}
              >
                ISBN
                {sortingIcon("ISBN")}
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={currentPage == 1 ? "page-item disabled" : "page-item"}>
            <a
              className="page-link"
              onClick={() => {
                setCurrentPage((currentPage) => 1);
              }}
            >
              First
            </a>
          </li>
          <li className={currentPage == 1 ? "page-item disabled" : "page-item"}>
            <a
              className="page-link"
              onClick={() => {
                setCurrentPage((currentPage) => currentPage - 1);
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </a>
          </li>

          <li
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => {
                setCurrentPage((currentPage) => currentPage + 1);
              }}
            >
              <i className="bi bi-arrow-right"></i>
            </a>
          </li>

          <li
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => {
                setCurrentPage(() => totalPage);
              }}
            >
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookTable;
