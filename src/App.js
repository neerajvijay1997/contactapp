import React, { useState, useEffect } from "react";

//importing contact list
import List from "./components/List";

//axios handle request response data
import Axios from "axios";

//importing navbar
import Navbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//importing create contact form
import Form from "./components/Form";

function App() {
  //defining each contact element
  const [contact, setContact] = useState({
    id: "",
    name: "",
    phone: "",
    username: "",
    email: "",
    website: "",
  });

  //defining contact list
  const [list, setList] = useState([{}]);

  //first time loading all the contact data
  useEffect(() => {
    async function getData() {
      const api = "https://jsonplaceholder.typicode.com/users";

      try {
        let res = await Axios.get(api);
        setList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  //adding contact data into contact list
  function add(contact) {
    Axios.post("https://jsonplaceholder.typicode.com/users", contact).then(
      (response) => {
        console.log(response.status);
        console.log(response.data);

        //if contact data added successfully to backend server ,,then display the updated contact list
        //in the frontend
        if (response.status == 201) {
          setList([contact, ...list]);
        }
      }
    );
  }

  //deleting the contact data from contact list

  function removeContact(id) {
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      (res) => {
        console.log(res);
        console.log(res.data);

        //if contact data removed successfully from backend server ,,
        //then display the updated contact list in the frontend
        if (res.status == 200) {
          setList(list.filter((contact) => contact.id !== id));
        }
      }
    );
  }

  return (
    <div>
      {/**navbar of the page */}
      <Navbar />

      <div className="container mt-3">
        <div className="createHeading ">
          <h2>
            <i class="fa fa-address-book" aria-hidden="true"></i>&ensp; Create
            Contact
          </h2>
        </div>

        <div className="row ">
          <div className="p-5 " id="formContainer">
            {/**create contact form */}
            <Form contact={contact} setContact={setContact} add={add} />
          </div>
        </div>

        <div className="createHeading">
          <h2>
            <i class="fa fa-list-alt" aria-hidden="true"></i>&ensp; My Contact
            List
          </h2>
        </div>

        <div className="row">
          <div>
            <div>
              {/**contact list component */}
              <List
                list={list}
                setList={setList}
                setContact={setContact}
                removeContact={removeContact}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//axios post request
//https://axios-http.com/docs/post_example
//https://blog.logrocket.com/understanding-axios-post-requests/

// coder spirit
//https://github.com/coderspirit-git/my-contact

//axios delete request
//https://www.javatpoint.com/react-axios-delete-request-example
