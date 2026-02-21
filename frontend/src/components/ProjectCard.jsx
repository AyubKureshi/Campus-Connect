import {Link} from "react-router-dom"
function ProjectCard({project}) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition capitalize">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Info Section */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Domain:</span> {project.domain}
        </p>

        <p>
          <span className="font-semibold">Team Size:</span>{" "}
          {project.maxTeamSize}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-4">
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
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/projects/${project._id}`}
          className="flex-1 text-center py-2 rounded-lg bg-blue-500 text-white font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
export default ProjectCard;