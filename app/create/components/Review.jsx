"use client";
import Button from "../../components/Button";
import Header from "../../components/Header";
import StepProgress from "../../components/StepProgress";
import BlogPost from "../../components/BlogPost";
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
        <BlogPost post={formData} />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => setStep(3)}>Back</Button>
          <Button type="submit"> Submit </Button>
        </div>
      </form>
    </div>
  );
}
