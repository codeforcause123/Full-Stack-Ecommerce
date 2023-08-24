import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
export const Homepage = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // get total count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // load more function
  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore(); // eslint-disable-next-line
  }, [page]);
  //getting categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // getting all products
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // filering by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    getAllCategories();
    getTotalCount();
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    } // eslint-disable-next-line
  }, [checked.length, radio.length]);

  // get filtered Product
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    } // eslint-disable-next-line
  }, [checked, radio]);
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column ml-10">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column ml-10">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ml-10">
            <button
              className="btn btn-info mt-4"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading" : "Load More..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
