import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastAction } from "../store/toastSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!isVisible || !message) return;

    const clearTimer = setTimeout(() => {
      dispatch(toastAction.clearToast());
    }, 3000);

    return () => clearTimeout(clearTimer);
  }, [dispatch, isVisible, message]);

  if (!isVisible || !message) return null;

  const isError = type === "error";

  return (
    <div className="pointer-events-none fixed top-4 left-1/2 z-999 -translate-x-1/2">
      <div
        className={`pointer-events-auto min-w-70 max-w-[90vw] rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg animate-[toastLife_3s_ease-in-out_forwards] ${
          isError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isError
                ? "bg-red-500 animate-pulse"
                : "bg-emerald-500 animate-[ping_1.2s_ease-in-out_2]"
            }`}
          />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
