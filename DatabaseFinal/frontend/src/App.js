import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Component } from "react";

class App extends Component {
  state = {
    items: [],
  };
  getItems() {
    fetch("http://localhost:3000/crud")
      .then((res) => res.json())
      .then((items) => {
        this.setState({ items });
        //console.log(items);
      })
      .catch((err) => console.log(err));
  }
  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };
  updateState = (item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };
  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };
  componentDidMount() {
    this.getItems();
  }

  render() {
    let data = this.state.items[0];
    let records;
    if (data) {
      records = Object.keys(data).map((key, index) => {
        return <td>{data[key]}</td>;
      });
    } else {
      return "Loading...";
    }

    //const rec = this.state.items[0];
    // console.log(rec);

    return (
      <div className="App">
        <form>
          <select name="table" id="table">
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
          </select>
          <input type="submit" value="table" />
        </form>
        <table style={{ border: "solid" }}>
          <thead>
            <tr>
              <th style={{ border: "solid" }}>Article of Clothing</th>
              <th style={{ border: "solid" }}>Color </th>
              <th style={{ border: "solid" }}>Fashion </th>
              <th style={{ border: "solid" }}>Brand </th>
              <th style={{ border: "solid" }}>Gender </th>
              <th style={{ border: "solid" }}>Price </th>
              <th style={{ border: "solid" }}>Material</th>
            </tr>
          </thead>
          <tbody>{records}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
