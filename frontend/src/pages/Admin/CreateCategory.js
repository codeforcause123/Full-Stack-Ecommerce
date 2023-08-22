import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import Table from "react-bootstrap/Table";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // handle form create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        console.log(`${name} created successfully`);
        getAllCategories();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        console.log(`${updatedName} successfully updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        console.log(`Category successfully deleted`);
        getAllCategories();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // getting categories
  const getAllCategories = async (req, res) => {
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
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard | Create-Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <Modal
            title="Edit Category "
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
