// put js for todo app here
var todos = [];
var currentTab = 0;
// This is form submit listener
const form = document.querySelector("form");
const pendingTaskHTML = (id, text) => {
  return `<li class="task taskPending" id=${id}>
                <p class="taskText taskPendingText ${id}">${text}</p>
                <div  class="cross cr${id} pendingx">x</div>
            </li>`;
};

const completedTaskHTML = (id, text) => {
  return `<li class="task taskCompleted" id=${id}>
    <div class="checkmark">L</div>
    <p class="taskText taskCompletedText tx${id}">${text}</p>
    <div  class="cross cr${id} completedx">x</div>
  </li>`;
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = event.target.taskAddText.value;
  if (text.length === 0) return;
  const id = +new Date();
  todos.push({ id: id, type: 0, value: text });
  if (currentTab == 1) return;
  const tasks = document.querySelector(".taskContainer");
  tasks.insertAdjacentHTML("afterbegin", pendingTaskHTML(id, text));
  event.target.taskAddText.value = "";
  addDeleteListenerToId(id);
  toggleTypeOfTaskWithId(id);
});

// This is delete event listener

addDeleteListenerAll = () => {
  var crosses = document.getElementsByClassName("cross");
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].addEventListener("click", (e) => {
      const parentElement = e.target.parentElement;
      const idd = parentElement.id;
      const tasks = document.querySelector(".taskContainer");
      tasks.removeChild(parentElement);
      todos = todos.filter(({ id }) => id != idd);
    });
  }
};

addDeleteListenerToId = (id) => {
  const cross = document.getElementsByClassName(`cr${id}`)[0];
  cross.addEventListener("click", () => {
    const idd = id;
    const parentElement = cross.parentElement;
    const tasks = document.querySelector(".taskContainer");
    tasks.removeChild(parentElement);
    todos = todos.filter(({ id }) => id != idd);
  });
};

renderAllTodos = () => {
  const tasks = document.querySelector(".taskContainer");
  tasks.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const { id, type, value: text } = todos[i];
    if (type === 0)
      tasks.insertAdjacentHTML("afterbegin", pendingTaskHTML(id, text));
    else tasks.insertAdjacentHTML("afterbegin", completedTaskHTML(id, text));
  }
  addDeleteListenerAll();
  toggleTypeOfTasksAll();
};

renderPendingTodos = () => {
  const tasks = document.querySelector(".taskContainer");
  tasks.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const { id, type, value: text } = todos[i];
    if (type === 0) {
      tasks.insertAdjacentHTML("afterbegin", pendingTaskHTML(id, text));
    }
  }
  addDeleteListenerAll();
  toggleTypeOfTasksAll();
};

renderCompletedTodos = () => {
  const tasks = document.querySelector(".taskContainer");
  tasks.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const { id, type, value: text } = todos[i];
    if (type !== 0)
      tasks.insertAdjacentHTML("afterbegin", completedTaskHTML(id, text));
  }
  addDeleteListenerAll();
  toggleTypeOfTasksAll();
};

// Added Listeners for tabs

removeActiveTags = () => {
  const tabs = document.querySelectorAll(".taskHeader");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
};

const tabs = document.querySelectorAll(".taskHeader");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (e) => {
    removeActiveTags();
    e.target.classList.add("active");
  });
}

const pendingTabButton = document.querySelector(".taskHeader.pending");
pendingTabButton.addEventListener("click", (event) => {
  currentTab = 2;
  renderPendingTodos();
});

const allTabButton = document.querySelector(".taskHeader.all");
allTabButton.addEventListener("click", (event) => {
  currentTab = 0;
  renderAllTodos();
});
const completedTabButton = document.querySelector(".taskHeader.completed");
completedTabButton.addEventListener("click", (event) => {
  currentTab = 1;
  renderCompletedTodos();
});

// Toggle type of tasks
const toggleTypeOfTasksAll = () => {
  const tasks = document.querySelectorAll(".task");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", (e) => {
      const idd = e.target.id;
      if (currentTab != 0) {
        const parentElement = e.target.parentElement;
        parentElement.removeChild(e.target);
      }
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == idd) {
          todos[i].type ^= 1;
        }
      }
      if (currentTab == 0) renderAllTodos();
    });
  }
};

const toggleTypeOfTaskWithId = (id) => {
  const task = document.getElementById(id);
  task.addEventListener("click", (e) => {
    const idd = e.target.id;
    if (currentTab != 0) {
      const parentElement = e.target.parentElement;
      parentElement.removeChild(e.target);
    }
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == idd) {
        todos[i].type ^= 1;
      }
    }
    if (currentTab == 0) renderAllTodos();
  });
};
