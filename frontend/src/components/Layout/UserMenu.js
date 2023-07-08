import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>DashBoard</h4>
        <ListGroup as="ul">
          <ListGroup.Item as={NavLink} to="/dashboard/user/profile">
            Profile
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/dashboard/user/orders">
            Your Orders
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default UserMenu;
