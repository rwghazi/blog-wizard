"use client";
import styles from "./StepProgress.module.css";

export default function StepProgress({ step, total, stepName }) {
  return (
    <>
      <p className={styles.progress}>Step {step} of {total} - {stepName}</p>
      <progress value={step} max={total} className={styles.progressBar} />
    </>
  );
}
