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
    <form onSubmit={handleSubmit}>
      <h2>Create Project</h2>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="domain"
        placeholder="Domain (e.g. AI, Web, Blockchain)"
        value={formData.domain}
        onChange={handleChange}
      />

      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack (comma separated)"
        value={formData.techStack}
        onChange={handleChange}
      />

      <input
        type="text"
        name="requiredSkills"
        placeholder="Required Skills (comma separated)"
        value={formData.requiredSkills}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxTeamSize"
        placeholder="Max Team Size"
        value={formData.maxTeamSize}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="closed">Closed</option>
      </select>

      <button type="submit">Create Project</button>
    </form>
  );
}

export default ProjectForm;
