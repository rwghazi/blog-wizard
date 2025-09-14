"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/app/components/Button/Button";
import BlogPost from "@/app/components/BlogPost";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPost = () => {
      try {
        const saved = localStorage.getItem("posts");
        if (!saved) return null;

        const posts = JSON.parse(saved);
        return Array.isArray(posts)
          ? posts.find((p) => p.id === id) || null
          : null;
      } catch {
        return null;
      }
    };

    setPost(getPost());
    setLoaded(true);
  }, [id]);


  if (!loaded) return <p>Loading...</p>;

  if (!post) {
    return (
      <div className={styles.container}>
        <Button variant="secondary" onClick={() => router.push("/")}>Back</Button>
        <h1 className={styles.title}>Content not found</h1>
        <p className={styles.meta}>The blog post may have been removed.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button variant="secondary" onClick={() => router.push("/")}>Back</Button>
      <BlogPost post={post} />
    </div>
  );
}
