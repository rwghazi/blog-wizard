"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Toast from "./components/Toast";
import PostList from "./components/PostList";
import Button from "./components/Button";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const searchParams = useSearchParams();
  const router = useRouter();

  const getPosts = () => {
    try {
      const saved = localStorage.getItem("posts");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  useEffect(() => {
    const successMessage = searchParams.get('success');
    if (successMessage) {
      setToast({ show: true, message: decodeURIComponent(successMessage) });
      router.replace('/');
    }
  }, [searchParams, router]);

  return (
    <div className={styles.container}>
      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
        duration={3000}
      />
      
      <div className={styles.header}>
        <h1 className={styles.title}>My Blog</h1>
        <Link href="/create">
          <Button>Create a Post</Button>
        </Link>
      </div>

      <PostList posts={posts} />
    </div>
  );
}
