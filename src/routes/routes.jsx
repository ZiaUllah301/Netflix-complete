import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage";
import Watch from "../components/common/VideoPlayer/Watch";
import VideoPlayerPage from "../components/common/VideoPlayer/VideoPlayerPage";
import ModalPage from "../components/common/Modal/ModalPage";
// import Plan from "../components/common/Step/StepTwo";
import ChoosePlan from "../components/common/Step/StepTwoCard";
import Payment from "../components/common/Step/StepThree";
import Plan from "../pages/Plan";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
    state: "home",
  },
  {
    path: "/person/:personId",
    element: (
      <ProtectedPage>
        <PersonDetail />
      </ProtectedPage>
    ),
    state: "person.detail",
  },
  {
    path: "/search",
    element: (
      <ProtectedPage>
        <MediaSearch />
      </ProtectedPage>
    ),
    state: "search",
  },
  {
    path: "/dummy",
    element: (
      <ProtectedPage>
        <ModalPage />
      </ProtectedPage>
    ),
    state: "dummy",
  },
  {
    path: "/login",
    element: <Login />,
    state: "login",
  },
  {
    path: "/register",
    element: <Register />,
    state: "register",
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    state: "forget.password",
  },
  {
    path: "/pages/reset-password/:id/:token",
    element: <ResetPassword />,
    state: "reset.password",
  },
  {
    path: "/plan",
    element: <Plan />,
    state: "plan",
  },
  {
    path: "/choose-plan",
    element: <ChoosePlan />,
    state: "choose.plan",
  },
  {
    path: "/payment",
    element: <Payment />,
    state: "choose.plan",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: (
      <ProtectedPage>
        <MediaList />
      </ProtectedPage>
    ),
  },
  {
    path: "/:mediaType/:mediaId",
    element: (
      <ProtectedPage>
        <MediaDetail />
      </ProtectedPage>
    ),
  },
  {
    path: "/watch/:type/:Id",
    element: (
      <ProtectedPage>
        <VideoPlayerPage />
      </ProtectedPage>
    ),
    // state: "watch",
  },
  {
    path: "/watch/series/episode/:epiNo/:Id",
    element: (
      <ProtectedPage>
        <VideoPlayerPage />
      </ProtectedPage>
    ),
    // state: "watch",
  },
];

export default routes;
