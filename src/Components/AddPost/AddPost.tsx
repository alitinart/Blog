import * as React from "react";
import { useNavigate } from "react-router-dom";
import adminGuard from "../../functions/adminGuard";
import notificationProvider from "../../functions/notificationProvider";
import requests from "../../functions/requests";

import "./AddPost.css";

export default function AddPost(props: any) {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [attachments, setAttachments] = React.useState("");

  const [userId, setUserId] = React.useState("");

  const nav = useNavigate();

  React.useEffect(() => {
    const adminCheck = async () => {
      const resData = await adminGuard(localStorage.getItem("token"));
      if (!resData) {
        notificationProvider(
          "Not Admin",
          "You cannot access this part of the site.",
          "danger"
        );
        return nav("/");
      }
      setUserId(resData);
    };
    adminCheck();
    return () => {};
  }, []);

  const formHandler = async () => {
    const resData = await requests.postsRequest.createPost(
      userId,
      title,
      desc,
      attachments,
      banner
    );

    if (resData.error) {
      return notificationProvider("Error", resData.message, "danger");
    }

    nav("/");
  };

  return (
    <div className="add-post">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formHandler();
        }}
        className="form add-post-form"
      >
        <h1 className="title">New Post</h1>
        <input
          placeholder="Post Title*"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="form-control"
          required
        />
        <textarea
          className="form-control text-area-form"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          placeholder="Post Description*"
          required
        ></textarea>
        <input
          placeholder="Banner*"
          value={banner}
          onChange={(e) => {
            setBanner(e.target.value);
          }}
          className="form-control"
          required
        />
        <input
          placeholder="Attachment"
          value={attachments}
          onChange={(e) => {
            setAttachments(e.target.value);
          }}
          className="form-control"
        />
        <button placeholder="btn w-full" className="btn btn-white w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
