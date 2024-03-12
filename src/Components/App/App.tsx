import { Route, Routes } from "react-router-dom";
// import style from "./app.module.css";
import NewNote from "../NewNote/NewNote";
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    if (!localStorage.getItem("TAGS")) {
      localStorage.setItem("TAGS", "[]");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={""} />
      <Route element={""} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/id:">
        <Route index element={""} />
        <Route path="edit" element={""} />
      </Route>
      <Route path="*" element={<NewNote />} />
    </Routes>
  );
}

export default App;
