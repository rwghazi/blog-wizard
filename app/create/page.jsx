"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Metadata from "./components/Metadata";
import Summary from "./components/Summary";
import Content from "./components/Content";
import Review from "./components/Review";

export default function CreateBlog() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
    content: "",
    date: new Date().toISOString(),
  });
  const [errors, setErrors] = useState({});

  const validateField = (field, value, min) => {
    const len = value.trim().length;
    if (len === 0) return `${field} is required`;
    if (min && len < min) return `${field} must be at least ${min} characters`;
    return "";
  };

  const validateStep = (fields) => {
    const stepErrors = {};
    fields.forEach(({ field, value, min }) => {
      const error = validateField(field, value, min);
      if (error) stepErrors[field.toLowerCase()] = error;
    });
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const validateMetadata = () => validateStep([
    { field: "Title", value: formData.title, min: 3 },
    { field: "Author", value: formData.author, min: 2 }
  ]);

  const validateSummary = () => validateStep([
    { field: "Summary", value: formData.summary, min: 10 },
    { field: "Category", value: formData.category }
  ]);

  const validateContent = () => validateStep([
    { field: "Content", value: formData.content, min: 20 }
  ]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      if (!prev[field]) return prev; 
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem("posts");
    const posts = saved ? JSON.parse(saved) : [];
    const newPost = { id: Date.now().toString(), ...formData };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    const successMessage = `Blog post "${formData.title}" created successfully!`;
    router.push(`/?success=${encodeURIComponent(successMessage)}`);
  };

  //prevent unsaved data
  useEffect(() => {
    const hasData = (
      formData.title.trim() ||
      formData.author.trim() ||
      formData.summary.trim() ||
      formData.category.trim() ||
      formData.content.trim()
    );
    const shouldWarn = hasData && step < 4;
    if (!shouldWarn) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [formData.title, formData.author, formData.summary, formData.category, formData.content, step]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a Post</h1>

      {/* Blog Metadata (Title and Author) */}
      {step === 1 && (
        <Metadata
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          isValid={validateMetadata}
          setStep={setStep}
        />
      )}

      {/* Blog Summary and Category */}
      {step === 2 && (
        <Summary
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          isValid={validateSummary}
          setStep={setStep}
        />
      )}

      {/* Blog Content */}
      {step === 3 && (
        <Content
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          isValid={validateContent}
          setStep={setStep}
        />
      )}

      {/* Review and Submit */}
      {step === 4 && (
        <Review
          formData={formData}
          handleSubmit={handleSubmit}
          setStep={setStep}
        />
      )}
    </div>
  );
}
