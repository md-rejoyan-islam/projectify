import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProjectContext } from "../../context/Context";
import { revertDate } from "../../helper/helper";
import ProjectForm from "../ProjectForm";
import { EditIcon, TrashIcon } from "../SVG";

export default function SingleTask({
  project: { title, description, date, id, category },
  style,
}) {
  const { deleteProjectById } = useContext(ProjectContext);

  // open modal
  const [openModal, setOpenModal] = useState(false);

  // handle delete project
  const handleDeleteProject = () => {
    const result = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (result) {
      deleteProjectById({
        id,
        category,
      });
      //  show success message
      toast.success("Project deleted successfully");
    }
  };

  return (
    <>
      <div className="mb-4 rounded-lg bg-gray-800 p-4">
        <div className="flex justify-between">
          <h4 className={`mb-2 font-semibold ${style?.titleColor}`}>{title}</h4>
          <div className="flex gap-2">
            <button className="h-fit" onClick={handleDeleteProject}>
              <TrashIcon />
            </button>
            <button className="h-fit" onClick={() => setOpenModal(true)}>
              <EditIcon />
            </button>
          </div>
        </div>
        <p className="mb-2 text-sm text-zinc-200">{description}</p>
        <p className="mt-6 text-xs text-zinc-400">{revertDate(date)}</p>
      </div>

      {openModal && (
        <ProjectForm
          setOpenModal={setOpenModal}
          type="edit"
          project={{
            title,
            description,
            date,
            category,
            id,
          }}
        />
      )}
    </>
  );
}

SingleTask.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }),
  style: PropTypes.object,
};
