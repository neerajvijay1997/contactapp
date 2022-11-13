import React from "react";

//importing each contact data
import Contact from "./Contact";

export default function List({ list, setList, setContact, removeContact }) {
  return (
    <div className="container">
      {/**displaying each contact from contact list using map function */}
      {list.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          setContact={setContact}
          removeContact={removeContact}
          list={list}
          setList={setList}
        />
      ))}
    </div>
  );
}
