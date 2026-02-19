import { useState } from "react";

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

  const handleSubmit = (e) => {
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

    console.log(formattedData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="domain"
            placeholder="Domain (AI, Web, Blockchain)"
            value={formData.domain}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills (comma separated)"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4">
            <input
              type="number"
              name="maxTeamSize"
              placeholder="Max Team Size"
              value={formData.maxTeamSize}
              onChange={handleChange}
              className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
