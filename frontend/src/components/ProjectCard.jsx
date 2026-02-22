import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { toastAction } from "../store/toastSlice";

const statusStyles = {
  open: "border-green-200 bg-green-50 text-green-700",
  completed: "border-blue-200 bg-blue-50 text-blue-700",
  "in-progress": "border-amber-200 bg-amber-50 text-amber-700",
  default: "border-slate-200 bg-slate-100 text-slate-700",
};

function ProjectCard({
  project,
  showActions = false,
  onUpdated = () => {},
  onDeleted = () => {},
}) {
  const { token } = useSelector((state) => state.auth);

  const statusClass = statusStyles[project.status] || statusStyles.default;
  const statusLabel = project.status?.replace("-", " ") || "unknown";

  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
      domain: project.domain,
      techStack: project.techStack,
      requiredSkills: project.requiredSkills,
      maxTeamSize: project.maxTeamSize,
      status: project.status,
    },
  });

  const openEditor = () => {
    setIsEditing(true);
  }

  const closeEditor = () => {
    setIsEditing(false);
  }

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/${project._id}`,
        data,
        {
          params: { projectId: project._id },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if(response.status === 200) {
        onUpdated(response?.data?.project);
        dispatch(
          toastAction.showToast({
            message: "Project details updated successfully",
            type: "success",
          }),
        );
      } else {
        dispatch(
          toastAction.showToast({
            message: "Failed to updated, try again",
            type: "error",
          }),
        );
      }
      
    } catch (error) {
      dispatch(
        toastAction.showToast({
          message: error?.response?.data.message || "Failed to update, try again",
          type: "error",
        }),
      );
    }
    setIsEditing(false);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${project._id}`,
        {
          params: { projectId: project._id },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        onDeleted(project._id);
        dispatch(
          toastAction.showToast({
            message: "Project deleted successfully",
            type: "success",
          }),
        );
      } else {
        dispatch(
          toastAction.showToast({
            message: "Failed to delete, try again",
            type: "error",
          }),
        );
      }
    } catch (error) {
      dispatch(
        toastAction.showToast({
          message: error?.response?.data.message || "Failed to delete, try again",
          type: "error",
        }),
      );
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-slate-800 transition-colors duration-300 group-hover:text-blue-700 capitalize">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass}`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Domain
          </p>
          <p className="mt-1 truncate font-medium text-slate-700">
            {project.domain}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Team Size
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {project.maxTeamSize}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {showActions ? (
          <>
            <button
              onClick={openEditor}
              className="flex-1 rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 rounded-xl border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 cursor-pointer">
              Delete
            </button>
          </>
        ) : (
          <Link
            to={`/projects/${project._id}`}
            className="block w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            View Details
          </Link>
        )}
      </div>

      {/* Editing panel */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
              onClick={closeEditor}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative z-50 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">
                    Edit project details
                  </h2>
                  <button
                    onClick={closeEditor}
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
                  >
                    <X size={18} className="mx-auto" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Update project info and save your changes.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Project Title
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Domain
                    </label>
                    <input
                      type="text"
                      {...register("domain")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Team Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      {...register("maxTeamSize")}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    {...register("techStack")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Required Skills
                  </label>
                  <input
                    type="text"
                    {...register("requiredSkills")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    name="status"
                    id="status"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="open">Open</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default ProjectCard;
