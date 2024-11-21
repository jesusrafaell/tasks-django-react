import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import Button from "../UI/Button";
import InputForm from "../UI/InputForm";
import Card from "../UI/Card";

const TaskForm: React.FC = () => {
  const { createTask } = useTaskContext();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setError("");

    await createTask({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <Card>
      <div className="flex flex-col p-6">
        <h3 className="text-xl font-semibold leading-6 tracking-tighter text-white">
          Create a Task
        </h3>
        <p className="mt-1.5 text-sm font-medium text-white/50">
          Create and manage tasks effortlessly
        </p>
      </div>
      <div className="p-6 pt-0">
        <div>
          <InputForm
            label="name"
            inputProp={
              name.length ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : null
            }
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
            />
          </InputForm>
          <div className="mt-4">
            <InputForm label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
              ></textarea>
            </InputForm>
          </div>
          <div className="mt-4 flex items-center justify-center gap-x-2 flex-col">
            <div className="mf-4 h-10">
              <span>{error}</span>
            </div>
            <Button text="Add" handleClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskForm;
