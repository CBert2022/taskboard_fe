import "./TaskForm.css";
import Tag from "./Tag";
import { useState } from "react";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  // Check, ob tag schon im Array vorhanden ist
  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  // Tag wird in Task.jsx als tagName übergeben
  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => ({
        ...prev,
        tags: filterTags,
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      task: taskData.task,
      status: taskData.status,
      tags: taskData.tags.join(","), // Tags als kommagetrennte Zeichenfolge
    };

    try {
      const response = await fetch(
        "http://localhost/taskboard/taskboard_be/test.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      // Update the local state with the newly created task
      setTasks((prev) => [...prev, { ...taskData, tags: taskData.tags }]); // Optional: Daten zu Tasks hinzufügen

      // Reset Form
      setTaskData({
        task: "",
        status: "todo",
        tags: [],
      });
    } catch (error) {
      console.error("Fehler beim Senden der Daten:", error);
    }
  };

  return (
    <div className="task_form_container">
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <input
            name="task"
            type="text"
            value={taskData.task}
            className="task_input"
            placeholder="Enter your task"
            onChange={handleChange}
          />
          <div className="task_form_bottom_line">
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag tagName="JS" selectTag={selectTag} selected={checkTag("JS")} />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkTag("React")}
            />
          </div>
          <div className="task_enter">
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default TaskForm;
