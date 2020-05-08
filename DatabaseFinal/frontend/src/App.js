import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  let data = [];
  const getData = () => {
    fetch("http://localhost/3000/crud")
      .then((res) => res.json())
      .then((res) => {
        data = res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);
  let records = data.forEach((rec) => {
    return (
      <tr>
        <td>{rec.article_name}</td>
        <td>{rec.color}</td>
        <td>{rec.fashion}</td>
        <td>{rec.brand}</td>
        <td>{rec.gender}</td>
        <td>{rec.price}</td>
        <td>{rec.material}</td>
      </tr>
    );
  });
  return (
    <div className="App">
      <form action={getData("tops")}>
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

export default App;
