import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMenuContext } from "../hooks/useMenuContext";
import "./Login.css";

const Add = () => {
  const { user } = useAuthContext();
  const { dispatch } = useMenuContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const item = { name, price, image, category, RID: user.RID };
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(item),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setName("");
      setImage("");
      setPrice("");
      setCategory("");
      setIsPending(false);
      console.log("New item added:", json);
      dispatch({ type: "CREATE_ITEM", payload: json });
      navigate("/");
    }
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
        <label>Category: </label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Item image: </label>
        <input
          type="text"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Item price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {!isPending && <button>Add Item</button>}
        {isPending && <button disabled>Adding Item...</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Add;
