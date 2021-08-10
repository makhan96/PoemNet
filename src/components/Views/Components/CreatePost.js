import React, { useState } from "react";
import { storage, db } from "../../../firebase";
import firebase from "firebase";
import "./CreatePost.css";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "@material-ui/core/Button";


function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };
  const { currentUser, logout } = useAuth()
console.log(currentUser)
  const handleUpload = () => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption: caption,

      userName: currentUser.displayName.toLowerCase(),
      userProfileUrl:
        "https://i.redd.it/v0caqchbtn741.jpg",
    });
    setProgress(0);
    setCaption("");


  }

  const removeImage = () => {
    var preview1 = document.getElementById("image-1-preview");
    preview1.style.display = "none";
  };

  return (
		<div className="app__createPost mt-4">
			<div className="innerUploadImg">
				{currentUser ? (
					<div className="imageUpload">
						<div className="createAPost__Top">
							<p className="font-weight-bold h6">
								<span className="heading pb-1">Create </span>a Post
							</p>
						</div>
						{}

						<div className="createAPost__center">
							<textarea
								className="createAPost__textarea"
								name="create a post"
								rows="2"
								value={caption}
								placeholder="Enter a caption..."
								onChange={(e) => setCaption(e.target.value)}
							></textarea>
							<div className="imagePreview">
								<img
									onClick={() => removeImage()}
									id="image-1-preview"
									alt=""
								/>
								{progress === 0 ? (
									<></>
								) : (
									<CircularProgress
										className="circularProgress"
										variant="determinate"
										value={progress}
									/>
								)}
							</div>
						</div>

						<div className="imageUpload__bottom">
							<Button
								onClick={handleUpload}
								variant="contained"
								color="secondary"
								className="postBtn"
								style={{
									color: caption ? "white" : "gray",
									fontWeight: caption ? "600" : "500",
									background: caption
										? "linear-gradient(49deg, rgba(253,78,51,1) 0%, rgba(244,110,58,1) 100%)"
                    : "#f7f7f7",
                  boxShadow: caption ? "box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)" : "none",
                  cursor: caption ? "pointer" : "none"
                }}
							>
								Post
							</Button>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CreatePost;
