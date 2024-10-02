import React from "react";
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img src={icon} alt={title + " Icon"} className="task_column_icon" />
        {title}
      </h2>
      <DropArea onDrop={() => onDrop(status, 0)} />{" "}
      {/*0 in Arr erste Position */}
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard
                key={index}
                title={task.task}
                tags={task.tags}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              />
              {/* <DropArea onDrop={onDrop} status={status} index={index + 1} /> */}
              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;
