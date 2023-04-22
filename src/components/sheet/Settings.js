import { useState } from "react";
import Security from "./components/Security";
import FullInformation from "./components/FullInformation";
function Settings() {
  const [activeChapter, setActiveChapter] = useState({});
  const [chapters, setChapters] = useState([
    {
      name: "Доступы",
      component: <Security />,
    },
    {
        name:"Доп.инф",
        component:<FullInformation/>,
    }
  ]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <ul>
        {chapters.map((chapter) => (
          <li onClick={() => setActiveChapter(chapter)}>{chapter.name}</li>
        ))}
      </ul>
      <div style={{ width: "70%" }}>{activeChapter?.component}</div>
    </div>
  );
}
export default Settings;
