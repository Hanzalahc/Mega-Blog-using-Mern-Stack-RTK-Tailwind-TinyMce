import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../../components";
import useProvideHooks from "../../hooks/useProvideHooks";
import useApiSubmit from "../../hooks/useApiSubmit";

function Home() {
  const { apis } = useProvideHooks();
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

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts or Post length is 0
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
