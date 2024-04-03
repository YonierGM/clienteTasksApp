import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTasks, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";

import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

function TasksFormPage() {
  const Navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log("Actualizando");
      await updateTask(params.id, data);
      Notify.success("Updated");
    } else {
      await createTasks(data);
      Notify.success("Created");
    }
    Navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        setValue("title", res.data.title);
        setValue("descripcion", res.data.descripcion);
        console.log(res);
      }
    }

    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Titulo requerido</span>}
        <textarea
          rows="3"
          placeholder="Descripcion"
          {...register("descripcion", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.descripcion && <span>Descripcion requerido</span>}
        <button
          type="submit"
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
        >
          Save
        </button>
      </form>

      {/* si trae el id la url mostrar boton */}
      {params.id && (
        <div className="flex justify-end">
          <button
            onClick={async () => {
              Confirm.show(
                "Eliminar tarea",
                "¿Desea eliminar esta tarea?",
                "Yes",
                "No",
                async () => {
                  await deleteTask(params.id);
                  Navigate("/tasks");
                },
                () => {},
                {}
              );
            }}
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TasksFormPage;
