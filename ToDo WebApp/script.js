const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = () => {
  if (inputBox.value.trim() === "") {
    alert("Please type something first");
  } else {
    listContainer.innerHTML += `<li>${inputBox.value}<span>×</span></li>`;
  }
  inputBox.value = "";
  saveData();
};

inputBox.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

listContainer.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

const saveData = () => {
  localStorage.setItem("todoData", listContainer.innerHTML);
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem("todoData") || "";
};

showTask();
