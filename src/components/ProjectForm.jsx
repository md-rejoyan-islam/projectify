import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProjectContext } from "../context/Context";
import { convertDate } from "../helper/helper";
export default function ProjectForm({ setOpenModal, type, project }) {
  const { addProject, updateProject } = useContext(ProjectContext);

  const [inputs, setInputs] = useState({
    title: type === "edit" ? project.title : "",
    description: type === "edit" ? project.description : "",
    date: type === "edit" ? convertDate(project.date) : "",
    category: type === "edit" ? project.category : "",
  });

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title) return toast.error("Title is required");
    if (!inputs.description) return toast.error("Description is required");
    if (!inputs.date) return toast.error("Due date is required");
    if (!inputs.category) return toast.error("Category is required");

    // add project
    if (type === "add") {
      addProject({
        ...inputs,
      });
      // reset form
      setInputs({
        title: "",
        description: "",
        date: "",
        category: "",
      });
      // show success message
      toast.success("Project created successfully");
    } else {
      // update project
      updateProject({
        ...inputs,
        id: project.id,
      });
      // show success message
      toast.success("Project updated successfully");
    }

    // close modal
    setOpenModal(false);
  };

  return (
    <div className="absolute top-0 z-10 left-0 w-full h-full flex justify-center items-center bg-[#0e081cd8] p-4 ">
      <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl h-fit ">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            Create Task
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                value={inputs.title}
                onChange={(e) =>
                  setInputs({ ...inputs, title: e.target.value })
                }
                name="taskName"
                required=""
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                value={inputs.description}
                rows={3}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
                value={inputs.date}
                name="dueDate"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={(e) =>
                  setInputs({ ...inputs, category: e.target.value })
                }
                value={inputs.category}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select</option>
                <option value="todo">To-Do</option>
                <option value="progress">On Progress</option>
                <option value="done">Done</option>
                <option value="revised">Revised</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ProjectForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  type: PropTypes.string,
  project: PropTypes.object,
};
