import {
  Github,
  Linkedin,
  MapPin,
  NotebookPen,
  SquarePen,
  UserRound,
  X,
} from "lucide-react";
import { createElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateCurrentUser } from "../store/userSlice";
import { toastAction } from "../store/toastSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile, loading, updating } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [editedValues, setEditedValues] = useState({});
  const [draftValue, setDraftValue] = useState("");

  const profileFields = useMemo(
    () => [
      { key: "displayName", label: "Display Name", icon: UserRound },
      { key: "location", label: "Location", icon: MapPin },
      { key: "github", label: "GitHub", icon: Github },
      { key: "linkedin", label: "LinkedIn", icon: Linkedin },
      { key: "skills", label: "Skills", icon: NotebookPen },
    ],
    [],
  );

  const openEditor = (fieldKey) => {
    setActiveField(fieldKey);
    setDraftValue(formValues[fieldKey] || "");
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setActiveField("");
    setDraftValue("");
  };

  const saveField = () => {
    if (!activeField) return;
    setEditedValues((prev) => ({ ...prev, [activeField]: draftValue.trim() }));
    closeEditor();
  };

  const activeFieldLabel =
    profileFields.find((field) => field.key === activeField)?.label || "";
  const MotionDiv = motion.div;
  const displayName = [profile?.fullName?.firstName, profile?.fullName?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const baseValues = useMemo(
    () => ({
      displayName,
      location: profile?.location || "",
      github: profile?.github || "",
      linkedin: profile?.linkedin || "",
      skills: profile?.skills?.join(", ") || "",
    }),
    [profile, displayName],
  );
  const formValues = { ...baseValues, ...editedValues };

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const saveProfileChanges = async () => {
    const payload = {
      displayName: formValues.displayName,
      location: formValues.location,
      github: formValues.github,
      linkedin: formValues.linkedin,
      skills: formValues.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    const result = await dispatch(updateCurrentUser(payload));
    if (updateCurrentUser.fulfilled.match(result)) {
      setEditedValues({});
      dispatch(
        toastAction.showToast({
          message: "Profile updated successfully",
          type: "success",
        }),
      );
    } else {
      dispatch(
        toastAction.showToast({
          message: result.payload || "Failed to update profile",
          type: "error",
        }),
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen py-10 px-4 bg-linear-to-b from-slate-50 via-white to-blue-50">
      <div
        className={`max-w-3xl mx-auto transition-all duration-300 ${
          isEditing ? "pointer-events-none blur-[2px] opacity-50" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            className="w-28 h-28 object-cover rounded-2xl ring-4 ring-white shadow-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDaJfO4VBmF-JstOPFE-IppaDCiBfhvGL9rg&s"
            alt="profile_photo"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
            <p className="text-sm text-slate-500">
              {loading ? "Loading your profile..." : "Update your public information"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
          {profileFields.map(({ key, label, icon }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  {createElement(icon, { size: 18 })}
                </div>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="text-base font-semibold text-slate-800">
                    {formValues[key] || (
                      <span className="text-slate-400 font-medium">Not set</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openEditor(key)}
                className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition"
              >
                <SquarePen size={16} className="mx-auto" />
              </button>
            </div>
          ))}

          <div className="flex w-full justify-end p-4 bg-slate-50">
            <button
              type="button"
              disabled={updating}
              onClick={saveProfileChanges}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <MotionDiv
            className="fixed inset-0 z-40 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionDiv
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
              onClick={closeEditor}
            />
            <MotionDiv
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Edit {activeFieldLabel}
                </h2>
                <button
                  type="button"
                  onClick={closeEditor}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                >
                  <X size={16} className="mx-auto" />
                </button>
              </div>
              <input
                type="text"
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                placeholder={`Enter ${activeFieldLabel}`}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveField}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Done
                </button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;
