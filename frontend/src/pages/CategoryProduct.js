import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
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
                  <Button
                    variant="primary"
                    className="ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
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

export default CategoryProduct;
