import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const CategoryForm = ({ handleSubmit, setValue, value }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CategoryForm;
