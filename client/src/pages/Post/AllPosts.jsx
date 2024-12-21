import { Container, PostCard } from "../../components";
import useApiSubmit from "../../hooks/useApiSubmit";
import useProvideHooks from "../../hooks/useProvideHooks";
function AllPosts() {
  const { useState, useEffect, apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await apiSubmit({
        url: apis().getAllPost.url,
        method: apis().getAllPost.method,
        successMessage: null,
        showLoadingToast: true,
        loadingMessage: "Loading posts..., Please wait!",
      });

      if (response) {
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, []);

  return loading ? (
    "Loading"
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
