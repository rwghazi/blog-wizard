"use client";

import { useEffect } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, isVisible, onClose, duration = 3000 }) {
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <span className={styles.icon}>✓</span>
        <span className={styles.message}>{message}</span>
        <button className={styles.close} onClick={onClose}>×</button>
      </div>
    </div>
  );
}
