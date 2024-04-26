import Image from "../../assets/no-projects.png";
import Button from "../Button";

export default function Fallback({ onCreateProject }) {
  return (
    <div className="mt-24 w-2/3 text-center">
      <img src={Image} className="mx-auto h-16 w-16 object-contain" />
      <h1 className="my-4 text-xl font-bold text-stone-500">
        No Project Selected
      </h1>
      <p className="mb-4 text-stone-500">
        Select a project or get started with a new one
      </p>
      <Button onClick={onCreateProject} >
        Create new project
      </Button>
    </div>
  );
}
