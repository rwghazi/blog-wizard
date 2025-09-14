"use client";
import { useEffect, useRef } from "react";
import Button from "../../components/Button";
import { Textarea } from "../../components/Input";
import Header from "../../components/Header";
import StepProgress from "../../components/StepProgress";
import styles from "../page.module.css";

export default function Summary({ formData, handleChange, errors, isValid, setStep }) {
  const textareaRef = useRef(null);
  const categories = ["Tech", "Science", "Lifestyle", "Business"];
  
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) setStep(3);
  };

  return (
    <div className={styles.step}>
      <StepProgress step={2} total={4} stepName="Summary & Category" />
      <Header 
        title="Summary & Category" 
        description="Write a brief summary and select a category for your blog post."
      />
      <form onSubmit={handleSubmit} className={styles.formSection} noValidate>
        <Textarea
          id="summary"
          label="Blog Summary"
          ref={textareaRef}
          placeholder="Blog Summary"
          value={formData.summary}
          minLength={10}
          maxLength={200}
          rows={3}
          error={errors.summary}
          hint={`Min 10, Max 200 | ${formData.summary.length}/200`}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
        <select
          className={styles.control}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className={styles.error}>{errors.category}</span>}
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
