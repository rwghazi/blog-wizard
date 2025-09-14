"use client";

import styles from "./Header.module.css";

export default function Header({ title, description, children }) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
