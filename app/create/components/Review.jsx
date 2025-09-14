"use client";
import Button from "../../components/Button";
import Header from "../../components/Header";
import StepProgress from "../../components/StepProgress";
import styles from "../page.module.css";

export default function Review({ formData, handleSubmit, setStep }) {
  
  return (
    <div className={styles.step}>
      <StepProgress step={4} total={4} stepName="Review" />
      <Header 
        title="Review" 
        description="Your blog post will look like this:"
      />
      <form onSubmit={handleSubmit} className={styles.formSection}>
        <div className={styles.review}>
          <h1 className={styles.reviewTitle}>{formData.title}</h1>
          <p className={styles.reviewSummary}>{formData.summary}</p>
          <div className={styles.reviewInfoRow}>
            <p className={styles.reviewMeta}><em>by {formData.author}</em> | {new Date(formData.date).toLocaleDateString()}</p>
            <p className={styles.reviewMeta}><span className={styles.reviewChip}>{formData.category}</span></p>
          </div>
          <hr className={styles.reviewDivider} />
          <article className={styles.reviewContent}>{formData.content}</article>
        </div>
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => setStep(3)}>Back</Button>
          <Button 
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
