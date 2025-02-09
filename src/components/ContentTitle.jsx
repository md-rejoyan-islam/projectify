import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import { CircleAddIcon } from "./SVG";

export default function ContentTitle({}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projectify</h2>
        <div className="flex space-x-2">
          <button
            className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white"
            onClick={() => setOpenModal(!openModal)}
          >
            <CircleAddIcon />
            Add
          </button>
        </div>
      </div>
      {openModal && <ProjectForm setOpenModal={setOpenModal} type={"add"} />}
    </>
  );
}
