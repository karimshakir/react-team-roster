import React, { useState } from 'react'

const AddUserForm = props => {
  const initialFormState = { id: null, name: '', position: '' }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!user.name || !user.position) return

        props.addUser(user)
        setUser(initialFormState)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Position</label>
      <input type="text" name="position" value={user.position} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>
  )
}

export default AddUserForm