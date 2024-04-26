import { useState } from "react";

export default function ProjectDetails({
  tasks,
  project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
}) {
  const [enteredTask, setEnteredTask] = useState("");

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleUserInput = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleAddTask = () => {
    if (enteredTask.trim() === "") {
      return;
    }

    onAddTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <div className="mt-16 w-[35rem]">
      <header className="mb-4 border-b-2 border-stone-300 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl font-bold text-stone-600">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-red-500"
            onClick={() => onDeleteProject(project.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="whitespace-pre-wrap text-stone-600">
          {project.description}
        </p>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-stone-700">Tasks</h2>
        <div className="flex items-center gap-4">
          <input
            className="w-64 rounded-sm bg-stone-200 px-2 py-1"
            value={enteredTask}
            onChange={handleUserInput}
            type="text"
          />
          <button
            onClick={handleAddTask}
            className="text-stone-600 hover:text-stone-950"
          >
            Add Task
          </button>
        </div>
        {tasks.length === 0 && (
          <p className="my-4 text-stone-800">
            This project does not have any tasks yet.
          </p>
        )}
        {tasks.length > 0 && (
          <ul className="mt-8 flex flex-col gap-2 rounded-md bg-gray-100 p-4">
            {tasks.map((task) => (
              <li className="flex justify-between" key={task.id}>
                <p>{task.title}</p>
                <button className="text-stone-700 hover:text-red-500" onClick={() => onDeleteTask(task.id)}>Clear</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
