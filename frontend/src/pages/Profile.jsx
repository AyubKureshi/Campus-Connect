import { Github, Linkedin, Mail, MapPin, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../config/config";
import ProjectCard from "../components/ProjectCard";

const Profile = () => {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    async function fetchUserProjects() {
      if (!token) return;
      setProjectsLoading(true);
      setProjectsError("");

      try {
        const response = await axios.get(`${BASE_URL}/projects/user-projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data || []);
      } catch (err) {
        const message =
          err?.response?.data?.message || "Failed to load your projects";
        setProjectsError(message);
      } finally {
        setProjectsLoading(false);
      }
    }

    fetchUserProjects();
  }, [token]);

  const displayName = [profile?.fullName?.firstName, profile?.fullName?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const skillText = profile?.skills?.length
    ? profile.skills.join(", ")
    : "No skills added";

  const handleProjectUpdated = (updatedProject) => {
    if (!updatedProject?._id) return;
    setProjects((prevProjects) =>
      prevProjects.map((item) =>
        item._id === updatedProject._id ? updatedProject : item,
      ),
    );
  };

  const handleProjectDeleted = (deletedProjectId) => {
    if (!deletedProjectId) return;
    setProjects((prevProjects) =>
      prevProjects.filter((item) => item._id !== deletedProjectId),
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-blue-50/30 to-white px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <img
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-blue-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDaJfO4VBmF-JstOPFE-IppaDCiBfhvGL9rg&s"
              alt="profile_photo"
            />
            <h1 className="mt-4 text-2xl font-bold text-slate-800">
              {displayName || "User"}
            </h1>
            <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-600">
              <Mail size={14} />
              {profile?.email || "No email"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-blue-50 p-3 text-center">
            <div>
              <p className="text-xl font-bold text-blue-700">0</p>
              <p className="text-xs font-medium text-slate-600">Following</p>
            </div>
            <div>
              <p className="text-xl font-bold text-blue-700">0</p>
              <p className="text-xs font-medium text-slate-600">Followers</p>
            </div>
          </div>

          <Link
            to="/user/edit-profile"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <PencilLine size={16} />
            Edit Profile
          </Link>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              <MapPin size={16} className="mt-0.5 text-blue-600" />
              <span>{profile?.location || "Location not set"}</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              <Github size={16} className="mt-0.5 text-slate-700" />
              <span className="truncate">{profile?.github || "GitHub not set"}</span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              <Linkedin size={16} className="mt-0.5 text-blue-700" />
              <span className="truncate">
                {profile?.linkedin || "LinkedIn not set"}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              SKILLS
            </p>
            <p className="mt-2 text-sm text-slate-700">{skillText}</p>
          </div>
        </aside>

        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Your Projects</h2>
            {(loading || error) && (
              <p className={`text-sm ${error ? "text-red-600" : "text-slate-500"}`}>
                {error || "Loading profile..."}
              </p>
            )}
          </div>

          <div>
            {projectsLoading && (
              <p className="text-sm text-slate-500">Loading projects...</p>
            )}
            {projectsError && (
              <p className="text-sm text-red-600">{projectsError}</p>
            )}
            {!projectsLoading && !projectsError && projects.length === 0 && (
              <p className="text-sm text-slate-500">No projects yet.</p>
            )}
            <div className="grid gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  showActions={true}
                  onUpdated={handleProjectUpdated}
                  onDeleted={handleProjectDeleted}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
