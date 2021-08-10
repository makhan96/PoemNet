import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../../firebase";
import "./Feed.css";
import { usePostContext } from "../../../contexts/postContext";
import CreatePost from "./CreatePost";
import Poem from "./Poemapi";
import { Link } from "react-router-dom";

function Feed({ user }) {
  // const [posts, setPosts] = useState([]);
  const { filteredPosts, setPost } = usePostContext();

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  return (
    <div className="chat-forum">
      <div className="chat">
        <h1 className="chat">Chat</h1>
        <Link to="/chat" className="chat1">
          Click here to chat
        </Link>
      </div>
      <div className="poem-api">
        <Poem />
        <div className="feed">
          <div className="feed__posts">
            {filteredPosts?.map(({ id, post }) => (
              <Post
                key={id}
                id={id}
                userProfileUrl={post.userProfileUrl}
                userName={post.userName}
                postImageUrl={post.postImageUrl}
                caption={post.caption}
                comments={post.comments}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
