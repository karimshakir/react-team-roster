import React, { useState, useEffect } from "react";

const EditUserForm = props => {
  const [item, setItem] = useState(props.currentItem);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setItem({ ...item, [name]:value });
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateItem(item.id, item);
      }}
    >
      <label>Item</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleInputChange}
      />
      <label>Price</label>
      <input
        type="text"
        name="price"
        value="item.price"
        onChange={handleInputChange}
      />
      <button>Update item</button>
      <button
        type="submit"
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
