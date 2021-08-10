import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { storage, db } from "../../../firebase";

import CommentInput from "./CommentInput";
import Comment from "./Comment";

function Post({ id, userName, postImageUrl, caption, comments, user }) {
  const deletePost = () => {
    //delete post
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
		<div className="post w-100">
			<div className="innerPost">
				<div className="post__header mb-4">
					<div
						style={{
							height: "38px",
							width: "38px",
							fontWeight: "bold",
							cursor: "pointer",
							border: "3px solid rgba(244,110,58,1)",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							borderRadius: "50%",
						}}
					>
						<Avatar
							alt={userName.toLowerCase()}
							style={{ height: "35px", width: "35px" }}
						>
							{userName.charAt(0)}
						</Avatar>
						<div className="post__headerInfo ml-3">
							<p className="mb-0">{userName}</p>
						</div>
					</div>

					{user ? (
						user.displayName?.toLowerCase() === userName?.toLowerCase() ? (
							<button
								style={{ background: "rgba(244,110,58,0.1)" }}
								className="button text-white"
								aria-controls="simple-menu"
								aria-haspopup="true"
								onClick={deletePost}
							>
								Delete
							</button>
						) : (
							<></>
						)
					) : (
						<></>
					)}
				</div>
				{/* headr --> avatar + username + time */}

				{/* image */}
				{/* <img className="post__image" src={postImageUrl} /> */}

				{/* username + caption */}
				<div className="post__bottom">
					<p className="mb-0">
						<strong>{userName}</strong> {caption}
					</p>
				</div>
				<div className="mb-4">
					{comments ? (
						comments.map((comment) => (
							<Comment username={comment.username} comment={comment.comment} />
						))
					) : (
						<></>
					)}
				</div>
				<CommentInput comments={comments} id={id} user={user} />
			</div>
		</div>
	);
}

export default Post;
