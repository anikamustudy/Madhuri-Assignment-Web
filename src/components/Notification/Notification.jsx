import React, { Component, Fragment } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Notification extends Component {
  state = {
    product: {
      name: "",
      description: "",
      price: "",
      file_path: null,
    },
    selectedFile: null,
    imagePreviewUrl: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/product/${id}`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the file
      const imagePreviewUrl = URL.createObjectURL(file);

      this.setState({
        selectedFile: file,
        imagePreviewUrl, // Store the URL in state for rendering
      });
    }
  };

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(this.state.imagePreviewUrl);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, price } = this.state.product;
    console.log("Product state:", name); // Debug: Log state
    const id = this.props.match.params.id;
    const formData = new FormData();

    console.log("Current product state:", this.state.product); // Debug: Log state

    // Append all text fields from the product to FormData
    Object.keys(this.state.product).forEach((key) => {
      formData.append(key, this.state.product[key]);
      console.log(`Appending ${key}:`, this.state.product[key]); // Debug: Log each field value
    });

    // Initialize an empty object to hold the formData entries
    let formDataObject = {};
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
      formDataObject[pair[0]] = pair[1];
    }
    // Check if there's a file selected and append it to FormData
    if (this.state.selectedFile) {
      const file =
        this.state.selectedFile instanceof FileList
          ? this.state.selectedFile[0]
          : this.state.selectedFile;
      formDataObject.file_path = `products/${file.name}`; // Creating a custom path format
      console.log("Appending file:", file); // Debug: Log file append
    }

    // Log each formData entry and store them in the object

    // Now formDataObject contains all the formData entries as key-value pairs
    console.log("Complete formData Object:", formDataObject);

    if (!formData) {
      console.log("FormData is empty");
      return;
    }
    console.log(formData, "FormData");
    // Perform the PUT request with axios
    axios
      .patch(`http://127.0.0.1:8000/api/update/${id}`, formDataObject)
      .then((response) => {
        console.log("Update response:", response.data); // Debug: Log response data
        this.setState({
          product: {
            name: response.data.name || "",
            description: response.data.description || "",
            price: response.data.price || "",
            file_path: response.data.file_path || "",
          },
        });
        this.props.history.push("/favourite"); // Redirect to the favourite page after update
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  render() {
    const { imagePreviewUrl, product } = this.state;

    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55">
            <h2>UPDATE PRODUCT</h2>
            <p>Some Of Our Exclusive Collection, You May Add</p>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.product.name}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={this.state.product.description}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={this.state.product.price}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="productFilePath">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="file_path"
                onChange={this.handleFileChange}
              />
            </Form.Group>

            {product.file_path && (
              <div className="text-center my-3">
                <img
                  src={`http://127.0.0.1:8000/storage/${product.file_path}`}
                  alt="Product"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}

            {imagePreviewUrl && (
              <div className="text-center my-3">
                <img
                  src={imagePreviewUrl}
                  alt="Product"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit">
                Update Product
              </Button>
            </div>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(Notification);
