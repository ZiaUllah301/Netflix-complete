import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (!user) {
      // dispatch(setAuthModalOpen(true));
      navigate("/login"); // Redirect to the login page
    }
    // dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
