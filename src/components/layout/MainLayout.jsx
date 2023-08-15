import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import axios from "axios";
import { BASEURL } from "../../ApiUrl";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import backgroundImage from "../../assets/loginBg.jpg";
const MainLayout = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Adjust the height as needed
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const isWatchRoute = location.pathname.startsWith("/watch/");
  const isChoosePlanRoute = location.pathname.includes("/plan");
  const isLoginRoute = location.pathname.includes("/login");
  const isRegisterRoute = location.pathname.includes("/register");
  const isForgetPasswordRoute = location.pathname.includes("/forget-password");
  const isResetPasswordRoute = location.pathname.startsWith("/pages/reset-password");
  console.log(isChoosePlanRoute);
  const { user } = useSelector((state) => state.user);
  const [localStorageData, setlocalStorageData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  console.log(localStorageData);
  useEffect(() => {
    const authUser = async () => {
      try {
        const token = localStorageData.token; // Replace with your actual token
        const headers = {
          authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          `${BASEURL}/api/user/getUserDetails`,
          { userId: localStorageData._id },
          {
            headers,
          }
        );
        console.log(response);
        if (response) dispatch(setUser(response.data.user));
        // return { response };
      } catch (err) {
        console.log(err);
        if (err) dispatch(setUser(null));
      }
    };
    if (localStorageData) {
      authUser();
    }
    console.log("always running main layout");
  }, [dispatch, localStorageData]);

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList({
        userId: user?._id,
      });
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        dispatch(setListFavorites(response.fav));
      }
    };
    if (user) {
      getFavorites();
    }
  }, [user]);

  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box
        display="flex"
        minHeight="100vh"
        style={
          isLoginRoute ||
          isRegisterRoute ||
          isForgetPasswordRoute ||
          isResetPasswordRoute
            ? containerStyle
            : null
        }
        // style={{ backgroundColor: "orange" }}
      >
        {/* header */}

        {!(
          isWatchRoute ||
          isChoosePlanRoute ||
          isLoginRoute ||
          isRegisterRoute ||
          isForgetPasswordRoute ||
          isResetPasswordRoute
        ) && <Topbar />}
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      {!(
        isWatchRoute ||
        isChoosePlanRoute ||
        isLoginRoute ||
        isRegisterRoute ||
        isForgetPasswordRoute ||
        isResetPasswordRoute
      ) && <Footer />}
      {/* footer */}
    </>
  );
};

export default MainLayout;
