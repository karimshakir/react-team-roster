import React, { useState } from "react";

const AddUserForm = props => {
  const initialFormState = { id: null, name: "", price: "" };
  const [item, setItem] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setItem({ ...item, [name]: value });
  };

  return (
    <form
      onSubmit={ event => {
        event.preventDefault();
        console.log(item)
        if (!item.name || !item.price) return;
        props.addItem(item);
        setItem(initialFormState);
      }
    }
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleInputChange}
      />
      <label>price</label>
      <input
        type="text"
        name="price"
        value={item.price}
        onChange={handleInputChange}
      />
      <button>Add new item</button>
    </form>
  );
};

export default AddUserForm;
