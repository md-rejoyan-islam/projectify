// max id function
export const maxId = (state) => {
  return Math.max(
    ...[...state.done, ...state.progress, ...state.revised, ...state.todo].map(
      (task) => task.id
    ),
    0
  );
};

// convert date  February 21, 2024 to 2024-02-21
export const convertDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
  const day = `${dateObj.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// convert date 2024-02-21 to February 21, 2024
export const revertDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  return `${day} ${month} ${year}`;
};

// find project by id
export const findProjectById = (state, id) => {
  return [
    ...state.done,
    ...state.progress,
    ...state.revised,
    ...state.todo,
  ].find((task) => task.id === id);
};

// find projects by title
export const findProjectsByTitle = (state, title) => {
  const copyState = [...state.all];
  return {
    done: title
      ? copyState.filter(
          (task) =>
            task.category === "done" &&
            task.title.toLowerCase().includes(title.toLowerCase())
        )
      : copyState.filter((task) => task.category === "done"),
    progress: title
      ? copyState.filter(
          (task) =>
            task.category === "progress" &&
            task.title.toLowerCase().includes(title.toLowerCase())
        )
      : copyState.filter((task) => task.category === "progress"),
    revised: title
      ? copyState.filter(
          (task) =>
            task.category === "revised" &&
            task.title.toLowerCase().includes(title.toLowerCase())
        )
      : copyState.filter((task) => task.category === "revised"),
    todo: title
      ? copyState.filter(
          (task) =>
            task.category === "todo" &&
            task.title.toLowerCase().includes(title.toLowerCase())
        )
      : copyState.filter((task) => task.category === "todo"),
  };
};
