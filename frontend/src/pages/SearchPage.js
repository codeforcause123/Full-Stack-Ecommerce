import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((product) => (
              <Card
                style={{ width: "18rem" }}
                className="m-2"
                key={product._id}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description.substring(0, 30)}</Card.Text>
                  <Card.Text>$ {product.price}</Card.Text>
                  <Button variant="primary" className="ms-1">
                    More Details
                  </Button>
                  <Button variant="secondary" className="ms-1">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
