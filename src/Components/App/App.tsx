import { Route, Routes } from "react-router-dom";
import style from "./app.module.css";
import NewNote from "../NewNote/NewNote";
import { useState } from "react";

const options = [
  { lable: "First", value: 1 },
  { lable: "Secong", value: 2 },
  { lable: "Third", value: 3 },
  { lable: "Fourth", value: 4 },
  { lable: "Fifth", value: 5 },
  { lable: "Sixth", value: 6 },
  { lable: "Seventh", value: 7 },
];

function App() {
  const [multipleValue, setMultipleValue] = useState<SelectOptions[]>([
    options[0],
  ]);

  const [singleValue, setSingleValue] = useState<SelectOptions | undefined>(
    options[0]
  );

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
