import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const Navigate = useNavigate();
  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        Navigate("/tasks/" + task.id);
      }}
    >
      <h1 className="font-bold uppercase">{task.title}</h1>
      <p className="text-slate-400">{task.descripcion}</p>
    </div>
  );
}
