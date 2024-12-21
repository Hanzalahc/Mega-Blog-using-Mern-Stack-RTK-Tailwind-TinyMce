import { Container, PostForm } from "../../components";
import useApiSubmit from "../../hooks/useApiSubmit";
import useProvideHooks from "../../hooks/useProvideHooks";

function EditPost() {
  const { useState, useEffect, navigate, useParams, apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const [post, setPost] = useState(null);
  const { slug } = useParams();

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
      } else {
        navigate("/");
      }
    };

    fetchPosts();
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
