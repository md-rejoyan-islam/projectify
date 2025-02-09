import ContentTitle from "./components/ContentTitle";
import Sidebar from "./components/Sidebar";
import Done from "./components/tasks/Done";
import Progress from "./components/tasks/Progress";
import Revised from "./components/tasks/Revised";
import ToDo from "./components/tasks/ToDo";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Top Bar */}
          <TopBar />
          {/* Project Content */}
          <div className="mx-auto max-w-7xl p-6">
            <ContentTitle />
            <div className="-mx-2 mb-6 flex flex-wrap">
              {/* Todo */}
              <ToDo />
              {/* On Progress */}
              <Progress />
              {/* Done */}
              <Done />
              {/* Revised */}
              <Revised />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
