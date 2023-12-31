import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useUpdateUser = () => {
  const dispatch = useDispatch();
  return function (updatedProfile) {
    // set data in localstorage
    let auth = localStorage.getItem("auth");
    auth = JSON.parse(auth);
    const { user } = auth;
    user.firstName = updatedProfile?.firstName;
    user.lastName = updatedProfile?.lastName;
    user.gender = updatedProfile?.gender;
    user.bio = updatedProfile?.bio;

    // update local storage
    localStorage.setItem(
      "auth",
      JSON.stringify({
        accessToken: auth.accessToken,
        user,
      })
    );

    // dispatch userLoggedIn action
    dispatch(
      userLoggedIn({
        accessToken: auth.accessToken,
        user,
      })
    );
  };
};

export default useUpdateUser;
