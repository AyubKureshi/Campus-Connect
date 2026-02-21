import { Github, Linkedin, Mail, MapPin, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../config/config";
import ProjectCard from "../components/ProjectCard";

const Profile = () => {
  const [projects, setProjects] = useState(null);
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
      const response = await axios.get(
        `${BASE_URL}/projects/user-projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
      );
      const data = await response.data;
      console.log(data);
      setProjects(data);
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
            {projects.map((project) => {
              <ProjectCard key={project._id} project={project} showActions={true} />
            })}
          </div>

          <div className="group rounded-2xl border border-slate-100 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold text-slate-800 transition group-hover:text-blue-700 capitalize">
              Campus connect
            </h3>
            <p className="mb-4 text-sm text-slate-600 line-clamp-3">
              It&apos;s going to be a group project where we collaborate on github
            </p>

            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Domain:</span> MERN Stack
              </p>
              <p>
                <span className="font-semibold">Team Size:</span> 4
              </p>
            </div>

            <div className="mt-4">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                open
              </span>
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              View Details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
