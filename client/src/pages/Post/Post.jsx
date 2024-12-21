import { Button, Container } from "../../components";
import parse from "html-react-parser";
import useProvideHooks from "../../hooks/useProvideHooks";
import useReduxHooks from "../../hooks/useReduxHooks";
import useApiSubmit from "../../hooks/useApiSubmit";

export default function Post() {
  const { useState, useEffect, Link, navigate, useParams, showSuccess, apis } =
    useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const { auth } = useReduxHooks();

  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const userData = auth.userData;

  const isAuthor =
    post && userData
      ? post._id === userData.articles.find((article) => article === post._id)
      : false;


  useEffect(() => {
    
    const fetchPosts = async () => {
      if (slug) {
        const response = await apiSubmit({
          url: `${apis().singleArticle.url}/${slug}`,
          method: apis().singleArticle.method,
          successMessage: null,
          showLoadingToast: false,
        });
        if (response) {
          const postData = response.data;
          setPost(postData);
        }
      } else navigate("/");
    };

    fetchPosts();
  }, [slug, navigate]);

  const deletePost = async () => {
    const response = await apiSubmit({
      url: apis().deleteArticle.url + slug,
      method: apis().deleteArticle.method,
      successMessage: null,
      showLoadingToast: false,
    });
    if (response.success) {
      showSuccess("Post Deleted Succesfully!");
      navigate("/");
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
