import React from "react";
import useCategory from "../hooks/useCategory";
import { Layout } from "../components/Layout/Layout";

import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row" key={234}>
          {categories.map((c) => (
            <div className="col-md-6" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-dark"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
