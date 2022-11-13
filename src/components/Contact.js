import React, { useState } from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Contact({
  contact,
  setContact,
  list,
  setList,
  removeContact,
}) {
  //this function will call the delete function in app.js
  function handleRemove() {
    removeContact(contact.id);
  }

  //editing logic

  //when edit button clicked,,..editing is assigned value of contact id of which is to be edited
  const [editing, setEditing] = useState(null);

  //handling input data from edit form
  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [editingUsername, setEditingUsername] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingWebsite, setEditingWebsite] = useState("");

  function submitEdits(id) {
    //updated contact data is added into the contact list
    const updated = [...list].map((contact) => {
      if (contact.id === editing) {
        contact.name = editingName;
        contact.phone = editingPhone;
        contact.username = editingUsername;
        contact.email = editingEmail;
        contact.website = editingWebsite;
      }
      return contact;
    });
    setList(updated);

    //reseting the editing state
    setEditing(null);

    //sending updated contact data into backend server
    Axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      name: contact.name,
      phone: contact.phone,
      username: contact.username,
      email: contact.email,
      website: contact.website,
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("success");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Card border="secondary" className="m-4">
        {/**if editing button clicked then new edit form gets displayed */}
        {contact.id === editing ? (
          <div>
            <form action="" className="p-3">
              <div>
                <label for=" name"> Name: </label>
                <input
                  type="text"
                  onChange={(e) => setEditingName(e.target.value)}
                  name=""
                  id=" name"
                  className="form-control"
                  placeholder=" name"
                  required
                />
              </div>
              <div>
                <label for="phone">Phone : </label>
                <input
                  type="text"
                  onChange={(e) => setEditingPhone(e.target.value)}
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="phone"
                  required
                />
              </div>
              <div>
                <label for="username">Username : </label>
                <input
                  type="text"
                  onChange={(e) => setEditingUsername(e.target.value)}
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label for="email">Email: </label>
                <input
                  type="text"
                  onChange={(e) => setEditingEmail(e.target.value)}
                  name="email"
                  id="          email"
                  className="form-control"
                  placeholder="email"
                  required
                />
              </div>
              <div>
                <label for="website">Website: </label>
                <input
                  type="text"
                  onChange={(e) => setEditingWebsite(e.target.value)}
                  name="website"
                  id="website"
                  className="form-control"
                  placeholder="website"
                  required
                />
              </div>
            </form>
          </div>
        ) : (
          //if edit button not clicked then display the contact data
          <div>
            <Card.Header>
              <i class="fa-regular fa-user"></i>&ensp; Name: {contact.name}
            </Card.Header>

            <Card.Body>
              <Card.Text>Phone: {contact.phone}</Card.Text>
              <Card.Text>Username: {contact.username}</Card.Text>
              <Card.Text>Email: {contact.email}</Card.Text>
              <Card.Text>Website: {contact.website}</Card.Text>
            </Card.Body>
          </div>
        )}

        <Card.Footer>
          {/**if edit button clicked then display the submit edit button */}
          {contact.id === editing ? (
            <Button variant="dark" onClick={() => submitEdits(contact.id)}>
              Submit Edits{" "}
            </Button>
          ) : (
            //if edit button not clicked then display edit button and delete button
            <div>
              <Button variant="dark" onClick={() => setEditing(contact.id)}>
                Edit{" "}
              </Button>
              <Button variant="dark" onClick={handleRemove} className="mx-4">
                Delete{" "}
              </Button>
            </div>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
