import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("vi-VN");
}

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  if (!user) return <Typography>User not found</Typography>;
  if (photos.length === 0) return <Typography>No photos uploaded.</Typography>;

  return (
    <Box sx={{ mt: 10, maxWidth: 900, mx: "auto", px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            height="400"
            image={`/images/${photo.file_name}`}
            alt="User uploaded"
            sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Uploaded on: {formatDate(photo.date_time)}
            </Typography>

            {photo.comments && photo.comments.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Comments ({photo.comments.length})
                </Typography>
                <List>
                  {photo.comments.map((comment) => {
                    const commenter = comment.user;
                    return (
                      <React.Fragment key={comment._id}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={
                              <Typography component="span">
                                <Link
                                  to={`/users/${commenter._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#1976d2",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {commenter.first_name} {commenter.last_name}
                                </Link>{" "}
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  on {formatDate(comment.date_time)}
                                </Typography>
                              </Typography>
                            }
                            secondary={comment.comment}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;