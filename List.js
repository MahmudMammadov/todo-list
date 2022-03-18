import React from "react";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import "./table.css";
const List = ({ list, removeItem, tableEditList }) => {
  return (
    <div>
      {list.map((item, index) => {
        const { id, name, surname, phone, date, position } = item;
        return (
          <article key={id} className="list-conatiner">
            <ul className="title-list">
              <li className="title-id">{index + 1}</li>
              <li className="title first-letter">{name}</li>
              <li className="title first-letter">{surname}</li>
              <li className="title first-letter">{position}</li>
              <li className="title">{phone}</li>
              <li className="title">{date}</li>
            </ul>
            <div>
              <button className="edit-btn" onClick={() => tableEditList(id)}>
                <BsFillPenFill />
              </button>
            </div>
            <div>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                <AiFillDelete />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
