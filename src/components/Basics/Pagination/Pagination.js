import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, city, pageNum }) => {
  let path = "/search/" + city + "/";

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const tick = 12;
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prev = pageNum > 1 ? Math.abs(pageNum - 1) : 1;
  const next =
    pageNum < pageNumbers.length ? Number(pageNum) + 1 : Number(pageNum);

  return (
    <nav>
      <ul>
        <li>
          <Link
            to={path + 1}
            style={{ textDecoration: "none", color: "black" }}
            className="link-page"
          >
            «
          </Link>
        </li>
        <li>
          <Link
            to={path + prev}
            style={{ textDecoration: "none", color: "black" }}
            className="link-page"
          >
            ←
          </Link>
        </li>
        {pageNumbers.map((number, index) => {
          const min = index - tick;
          const max = index + tick;

          if (pageNum > min && pageNum < max) {
            return (
              <li
                key={number}
                className={
                  Number(pageNum) === Number(number)
                    ? "number-selected"
                    : "number"
                }
              >
                <Link
                  to={path + number}
                  style={
                    Number(pageNum) === Number(number)
                      ? { textDecoration: "none", color: "white" }
                      : { textDecoration: "none", color: "black" }
                  }
                  className="link-page"
                >
                  {number}
                </Link>
              </li>
            );
          } else {
            return null;
          }
        })}

        <li>
          <Link
            to={path + next}
            style={{ textDecoration: "none", color: "black" }}
            className="link-page"
          >
            →
          </Link>
        </li>
        <li>
          <Link
            to={path + pageNumbers[pageNumbers.length - 1]}
            style={{ textDecoration: "none", color: "black" }}
            className="link-page"
          >
            »
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
