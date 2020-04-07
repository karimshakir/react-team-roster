import React, { useState, Fragment, useEffect } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";

const App = () => {
  // Data
  const itemData = [{ id: 1, name: "Hard-Coded", price: "$$$.00" }];
  const initialFormState = { id: null, name: " ", price: " " };

  // Setting state
  const [items, setItems] = useState(itemData);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => {
        console.log("useEffect data: ", data);
        setItems(data);
      });
  }, []);
d
  const addItem = item => {
    console.log(item);
    fetch(`http://localhost:8080/products`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(data => setItems([...items, data]));
    //setItems(items => [...items, item])
    //setItems(items => items.concat(item))
  };
  const updateItem = (id, updatedItem) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    })
      .then(response => response.json())
      .then(data => {
        setEditing(false);
        setItems(
          items.map(item => (item.id === id ? updatedItem : item))
        );
      });
  };

  const deleteItem = id => {
    setEditing(false);

    setItems(items.filter(item => item.id !== id));
  };

  const editRow = item => {
    setEditing(true);

    setCurrentItem({ id: item.id, name: item.name, price: item.price });
  };

  return (
    <div className="container">
      <h1>Catalog</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit Item</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentItem={currentItem}
                updateItem={updateItem}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Item</h2>
              <AddUserForm addItem={addItem} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View Items</h2>
          <UserTable
            items={items}
            editRow={editRow}
            deleteItem={deleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
