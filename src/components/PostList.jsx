import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import PostCard from "./PostCard";
import { Pagination } from "@mui/material";
import "./PostList.css";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length) {
      setDisplayPosts(posts.slice((page - 1) * 6, page * 6));
    }
  }, [posts, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRemove = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: updatedPosts });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const boundaryCount = page <= 2 ? 1 : 0;

  return (
    <div className="post-list">
      {displayPosts.map((post) => (
        <PostCard key={post.id} post={post} onRemove={handleRemove} />
      ))}
      <Pagination
        count={Math.ceil(posts.length / 6)}
        page={page}
        onChange={handlePageChange}
        className="pagination"
        boundaryCount={boundaryCount}
        siblingCount={1}
      />
    </div>
  );
};

export default PostList;
