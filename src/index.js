import { createStore } from "redux";
import { createElement } from "react";

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const ADD = "ADD";
const DEL = "DEL";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DEL:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return;
  }
};

const store = createStore(reducer);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  store.dispatch({ type: ADD, text: todo });
  input.value = "";
};

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DEL, id });
};

const createToDo = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    btn.innerText = "DEL";
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(createToDo);

form.addEventListener("submit", onSubmit);
