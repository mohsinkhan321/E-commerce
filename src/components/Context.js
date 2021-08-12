import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Shoes 01",
        src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        description: "What is Lorem Ipsum....",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        price: 23,
        count: 1,
      },
      {
        _id: "2",
        title: "Shoes 02",
        src: "https://i.pinimg.com/564x/4c/86/d3/4c86d39dda9e1b8e96128b3eb4e5c452.jpg",
        description: "What is Lorem Ipsum....",
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
        price: 19,
        count: 1,
      },
      {
        _id: "3",
        title: "Shoes 03",
        src: "https://i.pinimg.com/564x/f1/50/02/f1500235ad60395c8f5483d6969eb776.jpg",
        description: "What is Lorem Ipsum....",
        content:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        price: 50,
        count: 1,
      },
      {
        _id: "4",
        title: "Shoes 04",
        src: "https://i.pinimg.com/564x/24/04/08/240408fb4ae2a1bfd98a7023e1d8992f.jpg",
        description: "What is Lorem Ipsum....",
        content:
          "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
        price: 15,
        count: 1,
      },
      {
        _id: "5",
        title: "Shoes 05",
        src: "https://i.pinimg.com/564x/2a/d2/6f/2ad26f63e31e3673fb993a96ee20fae0.jpg",
        description: "What is Lorem Ipsum....",
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        price: 10,
        count: 1,
      },
      {
        _id: "6",
        title: "Shoes 06",
        src: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=358&q=80",
        description: "What is Lorem Ipsum....",
        content:
          "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        price: 17,
        count: 1,
      },
    ],
    cart: [],
    total: 0,
  };

  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("The product has been added to cart.");
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  componentDidMount() {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
  }

  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;
    return (
      <DataContext.Provider
        value={{
          products,
          addCart,
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
