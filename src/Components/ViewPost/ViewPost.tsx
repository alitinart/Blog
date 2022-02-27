import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import notificationProvider from "../../functions/notificationProvider";
import requests from "../../functions/requests";
import Post from "../../models/post.model";
import "./ViewPost.css";

export default function ViewPost() {
  const [post, setPost] = React.useState<Post>();
  const { postId } = useParams();

  const nav = useNavigate();

  React.useEffect(() => {
    const getPostData = async () => {
      const postData = await requests.postsRequest.getPostByID(postId);

      if (postData.error) {
        notificationProvider("Error", postData.message, "danger");
        nav("/");
      }
      setPost(postData.data);
    };
    getPostData();
    return () => {};
  }, []);

  return post ? (
    <div className="view-post">
      <img src={post.banner} className="banner" />
      <h1 className="post-title">{post.title}</h1>
      <textarea
        className="post-desc"
        cols={20}
        rows={10}
        value={post.description}
      ></textarea>
      {post.attachments ? (
        <img src={post.attachments} className="attachment" />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="loader"></div>
  );
}
