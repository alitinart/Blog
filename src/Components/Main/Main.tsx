import React from "react";
import Banner from "../../assets/images/Banner@2x.png";
import requests from "../../requests";
import "./Main.css";

export default function Main() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const posts = async () => {
      const posts = await requests.postsRequest.getAllPosts();
      setPosts(posts);
    };

    posts();
    return () => {};
  }, []);

  return (
    <div className="main">
      {posts.length > 0 ? (
        <div>
          <div className="content"></div>
          <div className="side-bar"></div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
