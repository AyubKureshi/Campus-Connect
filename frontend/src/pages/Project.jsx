import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    techStack: "",
    requiredSkills: "",
    maxTeamSize: 5,
    status: "open"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      techStack: formData.techStack
        ? formData.techStack.split(",").map((t) => t.trim())
        : [],
      requiredSkills: formData.requiredSkills
        ? formData.requiredSkills.split(",").map((s) => s.trim())
        : [],
      maxTeamSize: Number(formData.maxTeamSize)
    };

    try {
      const response = await fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();
      console.log(data);
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-sky-50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />

      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-500">
            New Project
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-800 sm:text-4xl">
            Create Project
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Fill in the details below to publish your idea and find teammates.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Smart Campus Attendance"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your project goals, key features, and what you need from teammates."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="domain" className="mb-2 block text-sm font-semibold text-slate-700">
                Domain
              </label>
              <input
                type="text"
                name="domain"
                placeholder="AI, Web, Blockchain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="maxTeamSize" className="mb-2 block text-sm font-semibold text-slate-700">
                Max Team Size
              </label>
              <input
                type="number"
                name="maxTeamSize"
                placeholder="5"
                min="1"
                value={formData.maxTeamSize}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="techStack" className="mb-2 block text-sm font-semibold text-slate-700">
                Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                placeholder="React, Node.js, MongoDB"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="requiredSkills" className="mb-2 block text-sm font-semibold text-slate-700">
                Required Skills
              </label>
              <input
                type="text"
                name="requiredSkills"
                placeholder="UI Design, API Integration"
                value={formData.requiredSkills}
                onChange={handleChange}
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
