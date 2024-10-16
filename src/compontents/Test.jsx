import { useState } from "react";

const Test = () => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("todo");
  const [tags, setTags] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      task: task,
      status: status,
      tags: tags.join(","), // tags als kommagetrennte Zeichenfolge
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
    } catch (error) {
      console.error("Fehler beim Senden der Daten:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aufgabe"
        onChange={(e) => setTask(e.target.value)}
      />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <input
        type="text"
        placeholder="Tags (kommagetrennt)"
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button type="submit">Aufgabe hinzufügen</button>
    </form>
  );
};

export default Test;
