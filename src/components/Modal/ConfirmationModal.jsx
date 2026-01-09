import React from 'react';

export default function ConfirmationModal({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
  loading = false
}) {
  if (!open) return null;

  return (
    <div
      style={styles.backdrop}
      onClick={onCancel}   // 👈 outside click = NO
    >
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()} // 👈 prevent close on inside click
      >
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            style={styles.cancelButton}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            style={styles.confirmButton}
            disabled={loading}
          >
            {loading ? 'Please wait...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: {
    marginBottom: 8,
    fontSize: 18
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10
  },
  cancelButton: {
    padding: '8px 14px',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  },
  confirmButton: {
    padding: '8px 14px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  }
};
