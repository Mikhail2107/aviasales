import logo from '../../assets/images/Logo.svg'

import styles from './Logo.module.scss'

function Logo() {
  return <img className={styles.imageLogo} src={logo} alt="logo" />
}

export default Logo
