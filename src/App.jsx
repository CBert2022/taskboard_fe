import { useState, useEffect } from "react";
import "./App.css";
import TaskColumn from "./compontents/TaskColumn";
import TaskForm from "./compontents/TaskForm";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    // erzeute neues Array mit Einträgen, die nicht dem ausgewähltem Index gleichen
    const newTask = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTask);
  };

  const onDrop = (status, position) => {
    console.log(
      `${activeCard} is going to place into ${status} and at the position ${position}`
    );

    if (activeCard == null || activeCard === undefined) return;

    // Das aktive Task-Objekt, das verschoben werden soll
    const taskToMove = tasks[activeCard];

    // Erstellt ein neues Array ohne die verschobene Aufgabe
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);

    // Fügt die verschobene Aufgabe in das Array an der neuen Position ein
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status, // aktualisiere den Status auf den neuen Status
    });

    // Setzt die aktualisierte Liste der Aufgaben
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default App;
