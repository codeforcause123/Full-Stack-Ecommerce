import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params.slug]);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <Card.Img
            variant="top"
            src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height={300}
            width={350}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <Button variant="secondary" className="ms-1">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="row">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((product) => (
            <Card style={{ width: "18rem" }} className="m-2" key={product._id}>
              <Card.Img
                variant="top"
                src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description.substring(0, 30)}</Card.Text>
                <Card.Text>$ {product.price}</Card.Text>
                <Button variant="secondary" className="ms-1">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
