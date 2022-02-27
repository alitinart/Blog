import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "../../../models/post.model";

import "./PostItem.css";

export default function PostItem(props: { postData: Post }) {
  const nav = useNavigate();

  return (
    <div
      className="post"
      style={{ backgroundImage: `url("${props.postData.banner}")` }}
    >
      <div className="tint">
        <h1 className="post-title">{props.postData.title}</h1>
        <button
          onClick={() => {
            nav(`/posts/${props.postData._id}`);
          }}
          className="btn read-button"
        >
          Read
        </button>
      </div>
    </div>
  );
}
