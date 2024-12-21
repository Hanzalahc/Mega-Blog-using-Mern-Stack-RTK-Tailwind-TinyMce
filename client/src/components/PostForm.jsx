import React, { useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select, FileUpload } from "./";
import useProvideHooks from "../hooks/useProvideHooks";
import useReduxHooks from "../hooks/useReduxHooks";
import useApiSubmit from "../hooks/useApiSubmit";

function PostForm({ post }) {
  const { navigate, useEffect, useState, apis } = useProvideHooks();
  const { auth, authActions, dispatch } = useReduxHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?._id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [files, setFiles] = useState([]);
  const userData = auth?.userData;

  const submit = async (data) => {
    if (post) {
      setFiles([post.featuredImage]);
      const formattedData = {
        ...data,
        featuredImage: files[0],
      };

      const response = await apiSubmit({
        url: apis().updateArticle.url + post._id,
        method: apis().updateArticle.method,
        values: formattedData,
        navigateTo: `/post/${post._id}`,
        showLoadingToast: true,
        loadingMessage: "Updating post...",
      });
    } else {
      const formattedData = {
        ...data,
        featuredImage: files[0],
      };

      const response = await apiSubmit({
        url: apis().createArticle.url,
        method: apis().createArticle.method,
        values: formattedData,
        showLoadingToast: true,
        loadingMessage: "Updating post...",
      });

      if (response) {
        navigate(`/post/${response.data._id}`);
      }
      dispatch(authActions.pushArticleId(response.data._id));
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <FileUpload files={files} setFiles={setFiles} />
        {post && files.length === 0 && (
          <div className="w-full mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default memo(PostForm);
