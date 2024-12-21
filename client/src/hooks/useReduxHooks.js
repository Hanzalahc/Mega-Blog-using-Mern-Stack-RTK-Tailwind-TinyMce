import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

const useReduxHooks = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return { dispatch, auth, authActions };
};

export default useReduxHooks;
