import React from 'react';

export default function SelectInput({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false
}) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          ...styles.select,
          ...(disabled ? styles.disabled : {})
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
  select: {
    padding: 10,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 30,
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed'
  }
};
