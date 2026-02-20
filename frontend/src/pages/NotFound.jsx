import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-sky-50 px-4">
      <div className="pointer-events-none absolute -left-20 top-12 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />

      <section className="z-10 w-full max-w-xl rounded-3xl border border-blue-100 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
          Error
        </p>
        <h1 className="mt-3 text-7xl font-black text-blue-600 sm:text-8xl">
          404
        </h1>
        <h2 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 sm:text-base">
          The page you are trying to access does not exist or may have been
          moved.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            to="/login"
            className="inline-flex w-full items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto"
          >
            Go to Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
