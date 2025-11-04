/*
import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";


//Define UserDetail, a React component of Project 4.

function UserDetail() {
    const user = useParams();
    return (
        <>
          <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography>
        </>
    );
}

export default UserDetail;
*/

// components/UserDetail/index.jsx
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box sx={{ mt: 10, maxWidth: 600, mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {user.location || "N/A"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Occupation:</strong> {user.occupation || "N/A"}
          </Typography>
          <Typography variant="body2" paragraph>
            {user.description || "No description available."}
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/photos/${user._id}`}
            >
              View Photos
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;