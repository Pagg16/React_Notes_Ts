import {
  Navigate,
  useParams,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { Note } from "../App/App";

type NoteLayoutProps = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) return <Navigate replace to="/" />;

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}
