import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import axios from "axios";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      file: null,
      description: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("file", this.state.file);
    formData.append("description", this.state.description);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product!");
    }
  };

  render() {
    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>ADD PRODUCT</h2>
            <p>Some Of Our Exclusive Collection, You May Add</p>
          </div>

          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                {/* Name Input */}
                <Row className="mb-3 justify-content-center">
                  <Col md={6}>
                    <Form.Group controlId="productName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Price Input */}
                <Row className="mb-3 justify-content-center">
                  <Col md={6}>
                    <Form.Group controlId="productPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        placeholder="Enter price"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description Input */}
                <Row className="mb-3 justify-content-center">
                  <Col md={6}>
                    <Form.Group controlId="productDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter product description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* File Input */}
                <Row className="mb-3 justify-content-center">
                  <Col md={6}>
                    <Form.Group controlId="productFile">
                      <Form.Label>Product Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={this.handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button */}
                <Row className="mb-3 justify-content-center">
                  <Col md={6} className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                      Add Product
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default FeaturedProducts;
