import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { removePost } from "../actions/postActions";
import "./PostCard.css";

const PostCard = ({ post, onRemove }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePost(post.id));
    onRemove(post.id);
  };

  return (
    <Card className="post-card">
      <CardContent>
        <IconButton onClick={handleRemove} className="remove-icon">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" component="p">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
