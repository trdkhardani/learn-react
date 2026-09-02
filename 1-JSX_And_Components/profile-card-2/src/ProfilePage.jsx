import { useState } from "react";
import "./App.css";
import Card from "./Card";
import Info from "./Info";
import Projects from "./Projects";

function ProfilePage() {
  const [follow, setFollow] = useState(false);

  return (
    <>
      <Card>
        <Info follow={follow} onFollow={() => setFollow(!follow)} />
      </Card>

      <Card>
        <Projects />
      </Card>
    </>
  );
}

export default ProfilePage;
