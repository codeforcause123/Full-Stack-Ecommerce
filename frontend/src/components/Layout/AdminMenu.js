import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <ListGroup as="ul">
          <ListGroup.Item as={NavLink} to="/dashboard/admin/create-category">
            Create Category
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/create-product">
            Create Product
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/products">
            Products
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/admin/users">
            Users
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default AdminMenu;
