import { findProjectById, findProjectsByTitle, maxId } from "../helper/helper";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS,
  SEARCH_PROJECTS,
  SORT_PROJECT,
  UPDATE_PROJECT,
} from "./reducerTypes";

export const initialProjectsState = {
  all: [],
  done: [],
  progress: [],
  revised: [],
  todo: [],
  error: null,
  loading: false,
  message: null,
};

export const projectReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        done: action.payload.done?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
        progress: action.payload.progress?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
        revised: action.payload.revised?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
        todo: action.payload.todo?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
        all: action.payload.all?.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
        message: "Projects fetched successfully",
      };
    case ADD_PROJECT:
      return {
        ...state,
        [action.payload.category]: [
          ...state[action.payload.category],
          { ...action.payload, id: maxId(state) + 1 },
        ].sort((a, b) => new Date(b.date) - new Date(a.date)),
        all: [...state.all, { ...action.payload, id: maxId(state) + 1 }],
        message: "Project added successfully",
      };

    case SORT_PROJECT:
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].sort(
          (a, b) => {
            if (action.payload.sortByAsc) {
              return new Date(a.date) - new Date(b.date);
            } else {
              return new Date(b.date) - new Date(a.date);
            }
          }
        ),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].filter(
          (task) => task.id !== action.payload.id
        ),
        all: state.all.filter((task) => task.id !== action.payload.id),
        message: "Project deleted successfully",
      };
    case UPDATE_PROJECT: {
      const project = findProjectById(state, action.payload.id);

      const copyState = { ...state };
      // delete project
      copyState[project.category] = copyState[project.category].filter(
        (task) => task.id !== action.payload.id
      );
      // add updated project
      copyState[action.payload.category] = [
        ...copyState[action.payload.category],
        action.payload,
      ];

      // sort updated project
      copyState[action.payload.category] = copyState[
        action.payload.category
      ].sort((a, b) => a.id - b.id);

      // return state
      return {
        ...copyState,
        all: copyState.all.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        message: "Project updated successfully",
      };
    }
    case SEARCH_PROJECTS:
      return {
        ...state,
        ...findProjectsByTitle(state, action.payload.title),
      };

    default:
      return state;
  }
};
