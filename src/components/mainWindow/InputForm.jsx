import { useRef } from "react";

import ErrorModal from "./ErrorModal";

export default function InputForm({ onCancel, onAddProject }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  
  const dialog = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      dialog.current.open();
      return;
    }

    const projectData = {
      id: Math.random().toString(),
      title: enteredTitle,
      description: enteredDescription,
      dueDate: new Date(enteredDate),
    };

    onAddProject(projectData);
  }

  return (
    <>
      <ErrorModal ref={dialog} />
      <form onSubmit={handleSubmit} className="mt-32 mx-auto w-[45rem]">
        <div>
          <h1 className="text-xl font-normal uppercase mb-8 text-stone-500">New Project</h1>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500">
              Title
            </label>
            <input
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="text"
              ref={title}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500">
              Description
            </label>
            <textarea
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="text"
              ref={description}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500">
              Due date
            </label>
            <input
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="date"
              ref={dueDate}
            />
          </p>
        </div>
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            className="text-stone-800 hover:font-semibold hover:text-stone-950"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-stone-800 px-6 py-2 text-stone-50 hover:bg-stone-950"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
