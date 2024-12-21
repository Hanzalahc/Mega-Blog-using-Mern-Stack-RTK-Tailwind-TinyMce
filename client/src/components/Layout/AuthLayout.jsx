import useProvideHooks from "../../hooks/useProvideHooks";
import useReduxHooks from "../../hooks/useReduxHooks";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const { auth } = useReduxHooks();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = auth?.status;

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default memo(Protected);
