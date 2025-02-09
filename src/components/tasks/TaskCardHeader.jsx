import { useContext, useState } from "react";
import { ProjectContext } from "../../context/Context";
import { SortIcon } from "../SVG";

import PropTypes from "prop-types";

export default function TaskCardHeader({ title, length, category }) {
  const { sortingProject } = useContext(ProjectContext);

  const [sortByAsc, setSortByAsc] = useState(true);

  const handleSorting = () => {
    sortingProject({ category, sortByAsc });
    setSortByAsc(!sortByAsc);
  };

  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-semibold">
        {title} ({length})
      </h3>
      <button className="h-fit" onClick={handleSorting}>
        <SortIcon rotate={sortByAsc ? "rotate-180" : "0"} />
      </button>
    </div>
  );
}

TaskCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
