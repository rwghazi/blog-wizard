"use client";

import clsx from "clsx";
import styles from "./Input.module.css";

export default function Input({
  id,
  label,
  hint,
  error,
  type = "text",
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
  inputRef,
  title,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        title={title}
        className={clsx(
          styles.input,
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
