"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import Header from "../../components/Header";
import StepProgress from "../../components/StepProgress";
import styles from "../page.module.css";

export default function Metadata({ formData, handleChange, errors, isValid, setStep }) {
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) setStep(2);
  };

  const handleCancel = () => {
    if (formData.title || formData.author) {
      if (window.confirm("Cancel creating this post? Your data will be lost.")) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.step}>
      <StepProgress step={1} total={4} stepName="Title" />
      <Header 
        title="Title" 
        description="Please enter the title and author of your blog post."
      />
      <form onSubmit={handleSubmit} className={styles.formSection} noValidate>
        <Input
          id="title"
          label="Title"
          ref={inputRef}
          placeholder="Blog Title"
          value={formData.title}
          minLength={3}
          maxLength={100}
          error={errors.title}
          hint={`Min 3, Max 100 | ${formData.title.length}/100`}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Input
          id="author"
          label="Author"
          placeholder="Author Name"
          value={formData.author}
          minLength={2}
          maxLength={60}
          error={errors.author}
          hint={`Min 2, Max 60 | ${formData.author.length}/60`}
          onChange={(e) => handleChange("author", e.target.value)}
        />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
