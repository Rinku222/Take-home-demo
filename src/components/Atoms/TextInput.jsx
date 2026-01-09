import React from 'react';

export default function TextInput({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    padding: 10,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 304
  }
};