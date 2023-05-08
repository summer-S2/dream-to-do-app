import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddTodo.module.css";

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const inputEl = useRef(null);
  const handleChange = (e) => setText(e.target.value);

  // 추가할 데이터를 추가함수에 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    // 공백은 반영되지 않음
    if (text.trim().length === 0) {
      return setText("");
    }

    onAdd({ id: uuidv4(), text, status: "active" });

    setText("");
    inputEl.current.focus();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={handleChange}
        ref={inputEl}
        placeholder="할 일을 추가하세요."
      />
      <button className={styles.button} disabled={!text}>
        추가
      </button>
    </form>
  );
}
