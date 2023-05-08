import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import styles from "./Todo.module.css";

export default function Todo({ todo, onUpdate, onDelete }) {
  const { text, status, id } = todo; // todo.text, todo.status

  // 변경할 데이터를 변경함수에 전달
  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    console.log(e.target.checked);
    onUpdate({ ...todo, status });
  };

  // 삭제할 데이터를 삭제함수에 전달
  const handleDelete = () => {
    onDelete(todo);
  };

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {text}
      </label>
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <RiDeleteBin5Line className={styles.svg} />
        </button>
      </span>
    </li>
  );
}
