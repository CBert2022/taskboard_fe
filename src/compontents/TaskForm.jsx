import "./TaskForm.css";
import Tag from "./Tag";
import { useState } from "react";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTastData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  // Check, ob tag schon im Array vorhanden ist
  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  // tag wird in Task.jsx als tagName übergeben
  const selectTag = (tag) => {
    //console.log(tag);
    if (taskData.tags.some((item) => item === tag)) {
      //some() return boolean, checkt jedes Item, ob es einen den hat
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTastData((prev) => {
        return { ...prev, tags: filterTags }; // Data Objekt kopieren und tag eintragen
      });
    } else {
      setTastData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] }; // Data Objekt kopieren und tag-Array erweitern
      });
    }
  };

  //console.log(taskData.tags);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // prev = current TaskData Value
    setTastData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });

    // Reset Form
    setTastData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  return (
    <div>
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
