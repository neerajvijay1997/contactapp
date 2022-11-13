import React from "react";

//uuid for generating unique id
//unique id distinguish each contact
import { v4 as uuidv4 } from "uuid";

export default function form({ contact, setContact, add }) {
  //taking inputs from form

  function handleNameChange(e) {
    setContact({ ...contact, name: e.target.value });
  }

  function handlePhoneChange(e) {
    setContact({ ...contact, phone: e.target.value });
  }

  function handleUsernameChange(e) {
    setContact({ ...contact, username: e.target.value });
  }

  function handleEmailChange(e) {
    setContact({ ...contact, email: e.target.value });
  }

  function handleWebsiteChange(e) {
    setContact({ ...contact, website: e.target.value });
  }

  function handleSumit(e) {
    e.preventDefault();

    //adding the form contact data into backend
    add({ ...contact, id: uuidv4() });

    //reseting the form data
    setContact({
      ...contact,
      name: "",
      phone: "",
      username: "",
      email: "",
      website: "",
    });
  }

  return (
    <div>
      <form action="" onSubmit={handleSumit}>
        <div className="form-group mt-2 ">
          <label for="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={handleNameChange}
            value={contact.name}
            placeholder="name"
            required
          />
        </div>

        <div className="form-group mt-2 ">
          <label for="phone">phone :</label>

          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control"
            onChange={handlePhoneChange}
            value={contact.phone}
            placeholder="phone"
            required
          />
        </div>

        <div className="form-group mt-2 ">
          <label for="username">username :</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleUsernameChange}
            value={contact.username}
            className="form-control"
            required
            placeholder="username"
          />
        </div>

        <div className="form-group mt-2">
          <label for="email">email :</label>

          <input
            type="text"
            name="email"
            id="email"
            onChange={handleEmailChange}
            required
            value={contact.email}
            className="form-control"
            placeholder="email"
          />
        </div>

        <div className="form-group mt-2 ">
          <label for="website">website :</label>
          <input
            type="text"
            name="website"
            id="website"
            onChange={handleWebsiteChange}
            required
            value={contact.website}
            className="form-control"
            placeholder="website"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Submit"
            class="btn btn-dark mt-3   "
            id="button"
          />
        </div>
      </form>
    </div>
  );
}
