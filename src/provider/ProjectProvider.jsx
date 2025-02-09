import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { ProjectContext } from "../context/Context";
import {
  initialProjectsState,
  projectReducer,
} from "../reducers/projectReducer";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS,
  SEARCH_PROJECTS,
  SORT_PROJECT,
  UPDATE_PROJECT,
} from "../reducers/reducerTypes";

import projectData from "../data/projects.json";

export const ProjectProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(projectReducer, initialProjectsState);

  // fetch projects
  const fetchProjects = () => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: {
        ...Object.groupBy(projectData, (project) => project.category),
        all: projectData,
      },
    });
  };

  // add projects
  const addProject = (task) => {
    dispatch({
      type: ADD_PROJECT,
      payload: task,
    });
  };

  // delete projects
  const deleteProjectById = ({ id, category }) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: { id, category },
    });
  };
  // update projects
  const updateProject = (task) => {
    dispatch({
      type: UPDATE_PROJECT,
      payload: task,
    });
  };

  // sorting projects by date
  const sortingProject = ({ category, sortByAsc }) => {
    dispatch({
      type: SORT_PROJECT,
      payload: { category, sortByAsc },
    });
  };

  // search projects by title
  const searchProjectsByTitle = (title) => {
    dispatch({
      type: SEARCH_PROJECTS,
      payload: {
        title,
      },
    });
  };

  // fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        addProject,
        deleteProjectById,
        updateProject,
        fetchProjects,
        projects,
        sortingProject,
        searchProjectsByTitle,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node,
};
