const goalForm = document.getElementById("goal-form");
const goal = document.getElementById("goal");
const due = document.getElementById("due");
const goalsDiv = document.querySelector(".goals-div");
const goalArray = [];
const cardsArray = [];

function Goal(goalName, dueDate) {
  this.goalName = goalName;
  this.dueDate = dueDate;
};

goalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newGoal = new Goal();
  newGoal.goalName = goal.value;
  newGoal.dueDate = due.value;
  goalArray.push(newGoal);

  const goalCard = document.createElement("div");
  goalsDiv.appendChild(goalCard);
  goalCard.innerHTML = `
        <h4>${newGoal.goalName}</h4>
        <p>Due: ${newGoal.dueDate}</p>
    `;
  cardsArray.push(goalCard);
  goalCard.classList.add("goal-card");

  const completed = document.createElement("p");
  completed.textContent = "Pending ..💪🏾";
  goalCard.appendChild(completed);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  goalCard.appendChild(checkbox);
  goalCard.classList.add("goal-card");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completed.textContent = "Completed 🎉";
      goalCard.classList.add("completed");
    } else {
      completed.textContent = "Pending ..💪🏾";
      goalCard.classList.remove("completed");
    }
  });

  goalCard.addEventListener("dblclick", () => {
    let cardIndex = cardsArray.indexOf(goalCard);
    if(cardIndex > -1) {
      cardsArray.splice(cardIndex, 1);
      goalArray.splice(cardIndex, 1);
      goalCard.style.display = "none";
      storeData();
    }
  });

  const today = new Date();

  goalArray.forEach(goal => {
    const dueDate = new Date(goal.dueDate);
    let goalIndex = goalArray.indexOf(goal);
    if(today.getDay() === dueDate.getDay() && today.getMonth() === dueDate.getMonth() && today.getYear() === dueDate.getYear()) {
        let currentGoal = cardsArray[goalIndex];
        currentGoal.style.color = 'red';
        completed.textContent = "Date due ..👴🏾👵🏾";
        currentGoal.classList.add("due");
    }
      
  })

  goalForm.reset();
  storeData();
});

function random() {
  let randomNumber = Math.floor(Math.random() * 256);
  return randomNumber;
};

function randomOpacity() {
  let opacity = Math.random();
  return opacity;
};

function randomColor() {
  let color = `rgba(${random()}, ${random()}, ${random()}, ${randomOpacity()})`;
  return color;
};

function storeData() {
    localStorage.setItem("myGoals", JSON.stringify(goalArray));
};
