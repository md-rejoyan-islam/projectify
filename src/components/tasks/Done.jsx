import { useContext } from "react";
import { ProjectContext } from "../../context/Context";
import SingleTask from "./SingleTask";
import TaskCardHeader from "./TaskCardHeader";

export default function Done() {
  const {
    projects: { done },
  } = useContext(ProjectContext);

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div className="rounded-lg bg-teal-500 p-4">
        <TaskCardHeader
          title="Done"
          length={done?.length || 0}
          category="done"
        />

        {done.map((project) => (
          <SingleTask
            key={project.id}
            project={project}
            style={{ titleColor: "text-teal-500" }}
          />
        ))}

        {/* if tasks are empty */}
        {done.length === 0 && (
          <div className="text-center text-sm bg-red-500 py-2 rounded-md text-white font-semibold mt-4">
            Task List is empty!
          </div>
        )}
      </div>
    </div>
  );
}
