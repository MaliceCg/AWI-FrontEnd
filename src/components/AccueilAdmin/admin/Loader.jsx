import React from 'react';
import styles from '../../../styles/espaceCreation.module.css';

const Loader = () => {
    return (
      <div className={styles.loaderContainer}>
        <svg className={styles.loaderSvg} viewBox="25 25 50 50">
          <circle className={styles.loaderCircle} r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  };

export default Loader;
