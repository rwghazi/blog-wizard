"use client";
import { useEffect, useRef } from "react";
import Button from "../../components/Button";
import { Textarea } from "../../components/Input";
import Header from "../../components/Header";
import StepProgress from "../../components/StepProgress";
import styles from "../page.module.css";

export default function Content({ formData, handleChange, errors, isValid, setStep }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) setStep(4);
  };

  return (
    <div className={styles.step}>
      <StepProgress step={3} total={4} stepName="Content" />
      <Header 
        title="Content" 
        description="Write the main content of your blog post."
      />
      <form onSubmit={handleSubmit} className={styles.formSection} noValidate>
        <Textarea
          id="content"
          label="Blog Content"
          ref={textareaRef}
          placeholder="Blog Content"
          value={formData.content}
          minLength={20}
          maxLength={2000}
          rows={8}
          error={errors.content}
          hint={`Min 20, Max 2000 | ${formData.content.length}/2000`}
          onChange={(e) => handleChange("content", e.target.value)}
        />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => setStep(2)}>Back</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
