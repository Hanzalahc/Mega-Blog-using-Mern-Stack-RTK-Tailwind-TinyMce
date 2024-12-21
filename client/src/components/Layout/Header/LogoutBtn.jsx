import useApiSubmit from "../../../hooks/useApiSubmit";
import useProvideHooks from "../../../hooks/useProvideHooks";
import useReduxHooks from "./../../../hooks/useReduxHooks";
import { memo } from "react";

function LogoutBtn() {
  const { dispatch, authActions } = useReduxHooks();
  const { apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const logoutHandler = async () => {
   
    const response = await apiSubmit({
      url: apis().userLogout.url,
      method: apis().userLogout.method,
      showLoadingToast: false,
    });
    if (response.success) {
      dispatch(authActions.logout());
    }
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      {loading ? "wait..." : "Log out"}
    </button>
  );
}

export default memo(LogoutBtn);
