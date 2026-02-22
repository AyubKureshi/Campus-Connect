import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-sky-50 px-4">
        <div className="pointer-events-none absolute -left-20 top-12 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-12 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />
        <section className="z-10 w-full max-w-xl rounded-3xl border border-blue-100 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
            Loading
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800 sm:text-4xl">
            Fetching Projects
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 sm:text-base">
            Loading projects...
          </p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-sky-50 px-4">
        <div className="pointer-events-none absolute -left-20 top-12 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-12 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />
        <section className="z-10 w-full max-w-xl rounded-3xl border border-blue-100 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
            Error
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800 sm:text-4xl">
            Could Not Load Projects
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-red-500 sm:text-base">
            {error}
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50 px-6 py-12">
      <div className="pointer-events-none absolute -left-24 top-14 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-200/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-500">
            Projects
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-blue-600 sm:text-5xl">
            Explore Projects
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Discover projects, view details, and join teams that match your skills.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Home;
