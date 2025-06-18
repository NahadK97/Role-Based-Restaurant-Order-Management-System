import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Add = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const menu = { name, img, price };
    setIsPending(true);
    // Send a POST request to the server
    fetch("http://localhost:8000/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    }).then(() => {
      console.log("New item added");
      setIsPending(false);
      // Redirect to the home page after adding the menu
      navigate("/");
    });
  };
  return (
    <div className="add">
      <h2>Add a New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Name: </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Item image: </label>
        <input
          type="file"
          accept="image/*"
          required
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <label>Item price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {!isPending && <button>Add Item</button>}
        {isPending && <button disabled>Adding Item...</button>}
      </form>
    </div>
  );
};

export default Add;
