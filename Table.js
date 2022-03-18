import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import "./table.css";
const allListLocal = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
const Table = () => {
  const [list, setList] = useState(allListLocal());
  const [name, setName] = useState("");
  const nameItem = name.trim();
  const [surname, setSurname] = useState("");
  const surnameItem = surname.trim();
  const [phone, setPhone] = useState("");
  const phoneItem = phone.trim();
  const [position, setPosition] = useState("");
  const positionItem = position.trim();
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [editID, setEditId] = useState(null);
  const [editList, setEditList] = useState(false);
  const inputCurrent = useRef(null);
  const justCedilla = (e) => {
    if (!/["a-z"]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const justNumber = (e) => {
    if (!/["0-9"]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!nameItem || !surnameItem || !positionItem || !phoneItem || !date) {
      setError(true);
    } else if (
      editList &&
      (nameItem, surnameItem, positionItem, phoneItem, date)
    ) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name, position, surname, phone, date };
          }
          return item;
        })
      );
      setSurname("");
      setName("");
      setPosition("");
      setPhone("");
      setDate("");
      setEditList(false);
    } else {
      const newDate = {
        id: new Date().getTime().toString(),
        name: nameItem,
        surname: surnameItem,
        position: positionItem,
        phone: phoneItem,
        date: date,
      };
      setError(false);
      setList([...list, newDate]);
      setSurname("");
      setName("");
      setPosition("");
      setPhone("");
      setDate("");
    }
  };

  const inputCurrentFocus = () => {
    inputCurrent.current.focus();
  };
  useEffect(() => {
    inputCurrentFocus();
  }, [list]);
  const tableEditList = (id) => {
    const findEditeList = list.find((item) => item.id === id);
    setEditList(true);
    setEditId(id);
    setName(findEditeList.name);
    setSurname(findEditeList.surname);
    setPosition(findEditeList.position);
    setPhone(findEditeList.phone);
    setDate(findEditeList.date);
    inputCurrentFocus();
  };

  const removeItem = (id) => {
    const removeoneItem = list.filter((item) => item.id !== id);
    setList(removeoneItem);
  };
  const allDeleteList = () => {
    setList([]);
    setSurname("");
    setName("");
    setPosition("");
    setPhone("");
    setDate("");
    setEditList(false);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="table-all-items">
      <div className="table-continer">
        <form onSubmit={handleClick} className="form-list">
          <label htmlFor="text" className="label-name">
            Name
            <input
              onKeyPress={justCedilla}
              type="text"
              name="name"
              ref={inputCurrent}
              className="first-letter"
              maxLength="15"
              placeholder="Name"
              value={nameItem}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !nameItem ? (
              <p className="error-msg">Name Empty</p>
            ) : null}
          </label>
          <label htmlFor="text" className="label-name">
            Surname
            <input
              onKeyPress={justCedilla}
              type="text"
              className="first-letter"
              name="surname"
              maxLength="15"
              placeholder="Surname"
              value={surnameItem}
              onChange={(e) => setSurname(e.target.value)}
            />
            {error && !surnameItem ? (
              <p className="error-msg">Surname Empty</p>
            ) : null}
          </label>
          <label htmlFor="text" className="label-name">
            Position
            <input
              onKeyPress={justCedilla}
              type="text"
              className="first-letter"
              name="position"
              maxLength="15"
              placeholder="Position"
              value={positionItem}
              onChange={(e) => setPosition(e.target.value)}
            />
            {error && !positionItem ? (
              <p className="error-msg">Position Empty </p>
            ) : null}
          </label>
          <label htmlFor="text" className="label-name">
            Phone
            <input
              value={phoneItem}
              type="tel"
              id="phone"
              onKeyPress={justNumber}
              name="phone"
              placeholder="123 45 67"
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && !phoneItem ? (
              <p className="error-msg">Phone Empty</p>
            ) : null}
          </label>
          <label htmlFor="text" className="label-name">
            Date
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {error && !date ? <p className="error-msg">Date Empty</p> : null}
          </label>
          <div className="add-btn-element">
            <button type="submit" className="add-btn-item">
              {editList ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        <div>
          <List
            list={list}
            removeItem={removeItem}
            tableEditList={tableEditList}
          />
          {list.length > 2 && (
            <button className="clear-btn" onClick={allDeleteList}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Table;
