import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Favourite extends Component {
  state = {
    products: [],
    isLoading: true,
    error: null,
    searchKey: "",
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchProducts();
    }
  }

  fetchProducts = (searchKey = "") => {
    const timestamp = Date.now();
    const url = searchKey
      ? `http://127.0.0.1:8000/api/search/${searchKey}`
      : "http://127.0.0.1:8000/api/list";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => this.setState({ products: data, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  delete = (id) => {
    fetch(`http://127.0.0.1:8000/api/delete/${id}`, { method: "DELETE" })
      .then(() => this.fetchProducts())
      .catch((error) => console.error("Error:", error));
  };

  updateProduct = (id, updatedProduct) => {
    fetch(`http://127.0.0.1:8000/api/update/${id}?_method=PUT`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(() => this.fetchProducts())
      .catch((error) => console.error("Error:", error));
  };

  render() {
    const { products, isLoading, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Container className="text-center" fluid>
        <div className="section-title text-center mb-55">
          <h2>MY PRODUCT LIST ITEMS</h2>
          <p>Some Of Our Exclusive Collection, You May Like</p>
        </div>
        <div className="d-flex justify-content-center">
          <div className="input-group mb-3 search-width">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              aria-label="Search products..."
              aria-describedby="button-addon2"
              value={this.state.searchKey}
              onChange={(e) => this.setState({ searchKey: e.target.value })}
            />
            <div className="input-group-append">
              <Button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => this.fetchProducts(this.state.searchKey)}
              >
                <i className="fa fa-search"></i>
              </Button>
            </div>
          </div>
        </div>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xl={3} lg={3} md={3} sm={6} xs={6}>
              <Card className="image-box card w-100">
                <img
                  alt={`Product ${product.name}`}
                  className="center w-75"
                  src={`http://127.0.0.1:8000/storage/${product.file_path}`}
                />
                <Card.Body>
                  <h5 className="product-name-on-card">{product.name}</h5>
                  <p className="product-id-on-card">ID: {product.id}</p>
                  <p className="product-description-on-card">
                    {product.description}
                  </p>
                  <p className="product-price-on-card">
                    Price: ${product.price}
                  </p>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-sm me-2"
                      onClick={() => this.delete(product.id)}
                    >
                      <i className="fa fa-trash-alt"></i> Remove
                    </Button>
                    <Button
                      className="btn btn-sm"
                      onClick={() =>
                        this.props.history.push(`/notification/${product.id}`)
                      }
                    >
                      <i className="fa fa-edit"></i> Update
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default withRouter(Favourite);
