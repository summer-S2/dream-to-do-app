import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

// const [todos, setTodos] = useState([
//   { id: uuidv4(), text: "운동하기", status: "completed" },
//   { id: uuidv4(), text: "카페가기", status: "active" },
//   { id: uuidv4(), text: "책읽기", status: "active" },
// ]);

export default function TodoList({ filter }) {
  // useState에 함수호출()하면 useState가 기억하고있는 값이 있어도 리렌더링될때마다 계속 함수를 호출함(값이 쓰이지 않는데도!)
  // 그걸 방지하기위해 인자로 콜백함수를 넣어줌. 그러면 useState가 기억하고있는 값이 있을때는 함수를 호출하지 않음.
  // 인자와 호출하는 내용이 동일하다면 함수의 이름(참조값)만 전달해주어도 됨.
  const [todos, setTodos] = useState(readTodosFromLocalStorage);
  console.log(todos);

  // 데이터 추가 함수
  const handleAdd = (todo) => setTodos([...todos, todo]);

  // 데이터 업데이트 함수
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  // 데이터 삭제 함수
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  // TodoList가 마운트될때 로컬스토리지에 todos를 저장
  useEffect(() => {
    // 로컬스토리지에 todos라는 키에 todos를 JSON으로 변환해서 저장 (객체인 밸류를 저장할때 JSON사용)
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  // 로컬스토리지에서 todos라는 키를 읽어옴
  const todos = localStorage.getItem("todos");
  // 로컬스토리지에 todos객체가 있다면 JSON을 parse해서 객체로 가져오고 없다면 []를 리턴
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
