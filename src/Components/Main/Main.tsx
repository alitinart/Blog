import React from "react";
import { Store } from "react-notifications-component";
import Banner from "../../assets/images/Banner@2x.png";
import requests from "../../functions/requests";
import Post from "../../models/post.model";
import "./Main.css";
import PostItem from "./PostItem/PostItem";

export default function Main() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const posts = async () => {
      const posts = await requests.postsRequest.getAllPosts();
      if (posts.data.length <= 0) {
        Store.addNotification({
          title: "Error",
          message: "There are no posts at the moment",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      setPosts(posts.data);
    };

    posts();
    return () => {};
  }, []);

  return posts.length > 0 ? (
    <div className="main">
      <div className="content">
        <h1 className="title">Blog Posts</h1>
        {posts.map((post) => {
          return <PostItem postData={post} />;
        })}
      </div>
      <div className="side-bar"></div>
    </div>
  ) : (
    <div className="loader"></div>
  );
}
