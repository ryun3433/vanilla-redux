import { createStore } from "redux";

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [{ text: action.text, id: Date.now() }, ...state];
    case "DEL":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({
    type: "DEL",
    id,
  });
};

const createToDo = () => {
  ul.innerText = "";
  const todos = store.getState();
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.id = todo.id;
    btn.innerText = "DEL";
    li.innerText = todo.text;
    btn.addEventListener("click", deleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const onSubmit = (e) => {
  e.preventDefault();
  const text = input.value;
  store.dispatch({
    type: "ADD",
    text,
  });
  input.value = "";
};

store.subscribe(createToDo);

form.addEventListener("submit", onSubmit);
