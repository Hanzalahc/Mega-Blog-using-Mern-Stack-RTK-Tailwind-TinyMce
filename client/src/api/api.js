const apis = () => {
  const local = "http://localhost:8000/";

  const list = {
    // Image
    image: {
      url: `${local}gallery/upload`,
      method: "POST",
    },

    // User
    userRegister: {
      url: `${local}user/register`,
      method: "POST",
    },
    userLogin: {
      url: `${local}user/login`,
      method: "POST",
    },

    userLogout: { url: `${local}user/logout`, method: "GET" },

    // Article
    singleArticle: {
      url: `${local}article/single`,
      method: "GET",
    },

    getAllPost: {
      url: `${local}article/all`,
      method: "GET",
    },

    deleteArticle: {
      url: `${local}article/delete/`,
      method: "DELETE",
    },

    updateArticle: {
      url: `${local}article/update/`,
      method: "PUT",
    },

    createArticle: {
      url: `${local}article/create`,
      method: "POST",
    },
  };

  return list;
};

export default apis;
