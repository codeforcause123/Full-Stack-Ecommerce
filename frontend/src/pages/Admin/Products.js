import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  // getting all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((product) => (
              <NavLink
                to={`/dashboard/admin/product/${product.slug}`}
                key={product._id}
                className="product-link"
              >
                <Card style={{ width: "18rem" }} className="m-2">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
