class AppUrl {
  static BaseURL = "http://127.0.0.1:8000/api";
  static VisitorDetails = this.BaseURL + "/getVisitor";

  static PostContact = this.BaseURL + "/postcontact";

  static AddProduct = this.BaseURL + "/addProduct";
  static List = this.BaseURL + "/list";
  static Delete = (id) => this.BaseURL + "/delete/" + id;
  static GetProduct = (id) => this.BaseURL + "/product/" + id;
  static Update = (id) => this.BaseURL + "/update/" + id;
  static Edit = (id) => this.BaseURL + "/edit/" + id;

  static search(searchkey) {
    return this.BaseURL + "/search/" + searchkey;
  }
}

export default AppUrl;
