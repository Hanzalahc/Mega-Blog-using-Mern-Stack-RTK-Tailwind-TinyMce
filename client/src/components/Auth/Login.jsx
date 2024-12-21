import { Button, Input, Logo } from "../index";
import { useForm } from "react-hook-form";
import useProvideHooks from "./../../hooks/useProvideHooks";
import useReduxHooks from "./../../hooks/useReduxHooks";
import useApiSubmit from "../../hooks/useApiSubmit";

function Login() {
  const { Link, useState, apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const { dispatch, authActions } = useReduxHooks();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    const response = await apiSubmit({
      url: apis().userLogin.url,
      method: apis().userLogin.method,
      values: data,
      navigateTo: "/",
      showLoadingToast: true,
      loadingMessage: "Logging in..., Please wait!",
    });

    if (response) {
      // const { email, name, _id } = response.data;
      // const userData = {
      //   email,
      //   name,
      //   _id,
      // };

      dispatch(authActions.setAuth(response.data));
    }
    setError("");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button disable={loading} type="submit" className="w-full">
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
