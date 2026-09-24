import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../Redux/userSlice";
import { toggleLoader } from "../Redux/loaderSlice";
import { message } from "antd";
import { getCurrentUser, logOutUser } from "../Services/userApiCalls";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getCurrentUser();

      if (response?.success) dispatch(SetUser(response?.data));
      else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
      navigate("/login");
    }
  };

  const logOut = async () => {
    try {
      const response = await logOutUser();
      if (response?.success) {
        message.success(response?.message);
        dispatch(SetUser(null));
        navigate("/login");
      } else message.error(response?.message);
    } catch (err) {
      message.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    user && (
      <div>
        <div className="flex items-center justify-between border-b border-white/10 bg-[#353434] px-6 py-3.5 shadow-lg">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="group flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DF1827] shadow-md shadow-red-900/30 transition group-hover:bg-[#ef2635]">
              <i className="fa-solid fa-ticket text-sm text-white"></i>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Book<span className="text-[#DF1827]">My</span>Show
            </h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Profile / Admin */}
            <button
              type="button"
              title={user.isAdmin ? "Admin" : "Profile"}
              onClick={() => {
                if (user.isAdmin) navigate("/admin");
                else navigate("/profile");
              }}
              className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-gray-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#DF1827]">
                <i className="fa-regular fa-user text-sm"></i>
              </div>

              <span className="max-w-32 truncate text-sm font-medium">
                {user.name}
              </span>

              {/* <i className="fa-solid fa-chevron-down ml-1 text-[10px] text-gray-500"></i> */}
            </button>

            {/* Logout */}
            <button
              type="button"
              title="Logout"
              onClick={logOut}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-red-500/30 hover:bg-[#DF1827] hover:text-white"
            >
              <i className="fa-solid fa-right-from-bracket text-sm"></i>
            </button>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    )
  );
};

export default ProtectedRoutes;
