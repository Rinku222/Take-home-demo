import React from 'react';
import bgImage from '../../assets/nature.jpg';

export default function FormPage({children}) {
  return (
    <div style={styles.page}>
        {children}
    </div>
  );
}

const styles = {
   page: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
};
