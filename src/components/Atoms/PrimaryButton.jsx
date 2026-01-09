import React from 'react';

function PrimaryButton ({ onClick, name, style, backgroundColor, ...rest }) {
  return (
    <button 
      onClick={onClick} 
      style={{ ...styles.button, ...style, backgroundColor: backgroundColor || '#1890ff' }}
      {...rest}
    >
      {name || "Click me"}
    </button>
  );
}

export default PrimaryButton;


const styles = {
  button: {
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: 20,
  }
};