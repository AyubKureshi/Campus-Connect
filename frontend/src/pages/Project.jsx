import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { toastAction } from "../store/toastSlice";

function ProjectForm() {
  const navigate = useNavigate();
  const tokenFromStore = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),

    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("Description is required"),

    domain: Yup.string().required("Domain is required"),

    techStack: Yup.string().required("Tech stack is required"),

    requiredSkills: Yup.string().required("Required skills are required"),

    maxTeamSize: Yup.number()
      .min(1, "Minimum team size is 1")
      .max(20, "Maximum team size is 20")
      .required("Team size is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      domain: "",
      techStack: "",
      requiredSkills: "",
      maxTeamSize: 5,
      status: "open",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formattedData = {
        ...values,
        techStack: values.techStack
          ? values.techStack.split(",").map((t) => t.trim())
          : [],
        requiredSkills: values.requiredSkills
          ? values.requiredSkills.split(",").map((s) => s.trim())
          : [],
        maxTeamSize: Number(values.maxTeamSize),
      };

      try {
        const token = tokenFromStore || localStorage.getItem("userToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/projects/create-project`,
          formattedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 201) {
          dispatch(toastAction.showToast({
            message: "Project created successfully", 
            type: "success"
          }));
          navigate("/");
        } else {
          dispatch(
            toastAction.showToast({
              message: "Server error",
              type: "error",
            }),
          );
        }
      } catch (error) {
        dispatch(
          toastAction.showToast({
            message: "Creation failed",
            type: "error",
          }),
        );
      }
    },
  });

  const inputStyle = (field) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 transition focus:outline-none focus:ring-4
     ${
       formik.touched[field] && formik.errors[field]
         ? "border-red-400 focus:ring-red-100"
         : "border-blue-200 focus:border-blue-400 focus:ring-blue-100"
     }`;

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-sky-50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-14 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-200/70 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-500">
            Project
          </p>
          <h1 className="mt-2 text-3xl font-black text-blue-600 sm:text-4xl">
            Create New Project
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Add details to publish your project and start collaborating.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Smart Campus Attendance"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>
              <textarea
                name="description"
                rows="5"
                placeholder="Describe your project goals..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Domain */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Domain
              </label>
              <input
                type="text"
                name="domain"
                placeholder="AI, Web, Blockchain"
                value={formik.values.domain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("domain")}
              />
              {formik.touched.domain && formik.errors.domain && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.domain}
                </p>
              )}
            </div>

            {/* Max Team Size */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Max Team Size
              </label>
              <input
                type="number"
                name="maxTeamSize"
                min="1"
                value={formik.values.maxTeamSize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("maxTeamSize")}
              />
              {formik.touched.maxTeamSize && formik.errors.maxTeamSize && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.maxTeamSize}
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                placeholder="React, Node.js, MongoDB"
                value={formik.values.techStack}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("techStack")}
              />
              {formik.touched.techStack && formik.errors.techStack && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.techStack}
                </p>
              )}
            </div>

            {/* Required Skills */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Required Skills
              </label>
              <input
                type="text"
                name="requiredSkills"
                placeholder="UI Design, API Integration"
                value={formik.values.requiredSkills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyle("requiredSkills")}
              />
              {formik.touched.requiredSkills &&
                formik.errors.requiredSkills && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.requiredSkills}
                  </p>
                )}
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
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
