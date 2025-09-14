"use client";

import BlogCard from "../BlogCard";
import styles from "./PostList.module.css";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p className={styles.empty}>No posts yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
