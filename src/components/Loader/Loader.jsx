import styles from './Loader.module.scss'

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.hideLine} />
      <div className={styles.line} />
    </div>
  )
}

export default Loader