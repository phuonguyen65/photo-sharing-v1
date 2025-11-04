import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const path = location.pathname;

  let context = "";

  if (path.startsWith("/users/")) {
    const userId = path.split("/")[2];
    const user = models.userModel(userId);
    if (user) {
      context = `${user.first_name} ${user.last_name}`;
    }
  } else if (path.startsWith("/photos/")) {
    const userId = path.split("/")[2];
    const user = models.userModel(userId);
    if (user) {
      context = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Nguyễn Việt Phương
        </Typography>
        {context && (
          <Typography variant="h6" color="inherit">
            {context}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;