/* eslint-disable react/no-unescaped-entities */
import styles from './Searchlight.module.css';

export default function Searchlight() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.bulbcover}>
          <div className={styles.bulb}>❘</div>
        </div>
        <div className={styles.light}></div>
        <div className={styles.textbox}>You can't be a lighthouse when you're underwater yourself.</div>
      </div>
    </div>
  )
}