"use client";

import styles from "./BlogPost.module.css";

export default function BlogPost({ post }) {
  const { title, summary, author, date, category, content } = post;
  
  return (
    <div className={`${styles.blogPost}`}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.infoRow}>
        <p className={styles.meta}><em>by {author}</em> | {new Date(date).toLocaleDateString()}</p>
        <p className={styles.meta}><span className={styles.category}>{category}</span></p>
      </div>
      <hr className={styles.divider} />
      <article className={styles.content}>{content}</article>
    </div>
  );
}
