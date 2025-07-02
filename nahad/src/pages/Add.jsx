import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMenuContext } from "../hooks/useMenuContext";
import "./Login.css";

const Add = () => {
  const { user } = useAuthContext();
  const { restaurantId } = useParams();
  const { dispatch } = useMenuContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (!user) {
      setError("You must be logged in");
      setIsPending(false);
      return;
    }

    try {
      // First check if category exists
      const categoryExists = categories.includes(category);

      // If category doesn't exist, create it first
      if (!categoryExists) {
        const categoryResponse = await fetch(`/api/${restaurantId}/menu/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ newCategory: category }),
        });

        if (!categoryResponse.ok) {
          const json = await categoryResponse.json();
          throw new Error(json.error || "Could not create category");
        }

        const newCategory = await categoryResponse.json();
        setCategories((prev) => [...prev, newCategory.category]);
      }

      // Then add the dish to the category
      const dishResponse = await fetch(
        `/api/${restaurantId}/menu/${category}/add-dish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ name, price, img: image }),
        }
      );

      const json = await dishResponse.json();

      if (!dishResponse.ok) {
        throw new Error(json.error || "Could not add dish");
      }

      // Update the context with the new dish
      dispatch({
        type: "ADD_DISH",
        payload: {
          category,
          dish: json,
        },
      });

      // Reset form and navigate
      setName("");
      setImage("");
      setPrice("");
      setCategory("");
      navigate(`/restaurants/${restaurantId}/menu`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="add">
      <h2>Add a New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input
          type="text"
          list="categories"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="categories">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <label>Item Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Image URL:</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Optional image URL"
        />

        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
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
