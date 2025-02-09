import {
  CalendarIcon,
  HomeIcon,
  KanbanIcon,
  MessagesIcon,
  ProjectsIcon,
  SettingsIcon,
  UsersIcon,
} from "./SVG";

export default function Sidebar() {
  const menuItems = [
    { icon: <HomeIcon />, text: "Dashboard", href: "#" },
    { icon: <ProjectsIcon />, text: "Projects", href: "#" },
    { icon: <UsersIcon />, text: "Contact", href: "#" },
    { icon: <KanbanIcon />, text: "Kanban", href: "#" },
    { icon: <CalendarIcon />, text: "Calendar", href: "#" },
    { icon: <MessagesIcon />, text: "Messages", href: "#" },
    { icon: <SettingsIcon />, text: "Settings", href: "#" },
  ];

  return (
    <aside className="hidden w-64 bg-gray-800 p-6 lg:block">
      <div className="mb-8 flex items-center">
        <div className="flex items-center justify-center rounded-full text-2xl font-bold gap-1">
          <img src="/logo.png" className="mx-auto h-10 text-center" />
          <span>Projectify</span>
        </div>
      </div>
      <button className="mb-8 w-full rounded-md bg-green-500 py-2 text-white">
        + New Project
      </button>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="flex items-center">
                {item.icon}
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
