import { useState } from "react";
import {Link} from "react-router-dom";

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
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-[#e9fbff] pb-6">
      <h2 className="text-3xl font-bold mb-6">Create Project</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-125 bg-white shadow-lg py-4 px-6 rounded-xl"
      >
        <label htmlFor="title" className="mt-3 font-semibold">
          Project title:{" "}
        </label>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <label htmlFor="email" className="mt-3 font-semibold">
          Description:{" "}
        </label>
        <textarea
          name="description"
          placeholder="Project Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <label htmlFor="domain" className="mt-3 font-semibold">
          Domain:{" "}
        </label>
        <input
          type="text"
          name="domain"
          placeholder="Domain (AI, Web, Blockchain)"
          value={formData.domain}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <label htmlFor="techStack" className="mt-3 font-semibold">
          Tech stack:{" "}
        </label>
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <label htmlFor="requiredSkills" className="mt-3 font-semibold">
          Required skills:{" "}
        </label>
        <input
          type="text"
          name="requiredSkills"
          placeholder="Required Skills (comma separated)"
          value={formData.requiredSkills}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <label htmlFor="maxTeamSize" className="mt-3 font-semibold">
          Max team size:{" "}
        </label>
        <input
          type="number"
          name="maxTeamSize"
          placeholder="Max Team Size"
          value={formData.maxTeamSize}
          onChange={handleChange}
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 mt-3 text-white bg-blue-400 hover:bg-blue-600 rounded-lg"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
