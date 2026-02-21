import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
          {project.title}
        </h1>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === "open"
              ? "bg-green-100 text-green-700"
              : project.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : project.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
          }`}
        >
          {project.status}
        </span>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mt-8 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Domain:</span>
            <p className="mt-1">{project.domain}</p>
          </div>

          <div>
            <span className="font-semibold">Team Size:</span>
            <p className="mt-1">{project.maxTeamSize}</p>
          </div>
        </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Required Skills */}
        {project.requiredSkills && project.requiredSkills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Join Button */}
            <div className="mt-10">
              <Link
                to={`/projects/join/${project._id}`}
                className="inline-block w-full text-center py-3 rounded-xl bg-blue-600 text-white font-semibold tracking-wide transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
              >
                Join Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
