"use client";
import Link from "next/link";
import styles from "./BlogCard.module.css";

export default function BlogCard({ post }) {
  return (
    <li>
      <Link href={`/blog/${post.id}`} className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.summary}>{post.summary}</p>
          <div className={styles.infoRow}>
            <p className={styles.meta}><em>by {post.author}</em> | {new Date(post.date).toLocaleDateString()}</p>
            <p className={styles.meta}><span className={styles.category}>#{post.category}</span></p>
          </div>
        </div>
      </Link>
    </li>
  );
}


