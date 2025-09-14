"use client";

import clsx from "clsx";
import styles from "./Input.module.css";

export default function Textarea({
  id,
  label,
  hint,
  error,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  minLength,
  maxLength,
  required = false,
  disabled = false,
  className,
  textareaRef,
  rows = 4,
  title,
  ...props
}) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        rows={rows}
        title={title}
        className={clsx(
          styles.input,
          styles.textarea,
          error && styles.inputError,
          disabled && styles.inputDisabled
        )}
        {...props}
      />
      
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
      
      {hint && !error && (
        <p className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
