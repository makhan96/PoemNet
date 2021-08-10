import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../../../contexts/AuthContext";
import image from './POEMNET.png'
import { Input } from "@material-ui/core";
import { usePostContext } from "../../../contexts/postContext";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useAuth()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { search,
    setPost } = usePostContext()
  return (
		<div className="header">
			<h1 className="mb-0 pb-0">
				<span className="heading">POEM</span>
				<span className="bold">NET</span>
			</h1>
			<div className="d-flex align-items-center">
				<div className="mr-3">
					<Input
						onChange={(e) => search(e.target.value)}
						placeholder="Search"
					/>
				</div>
				{currentUser ? (
					<div className="header__Right">
						{}

						<Avatar
							className="header__RightProfileImg"
							onClick={handleClick}
              style={{
								height: "38px",
								width: "38px",
								fontWeight: "bold",
								cursor: "pointer",
								border: "3px solid rgba(244,110,58,1)",
							}}
						>
							{currentUser.displayName?.charAt(0)}
						</Avatar>

						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={() => logout()}>Logout</MenuItem>
						</Menu>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Header;
