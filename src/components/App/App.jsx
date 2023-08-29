import Logo from '../Logo/Logo'
import Filters from '../Filters/Filters'
import TicketsList from '../TicketsList/TicketsList'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <div className={styles.info}>
          <Filters />
          <TicketsList />
        </div>
      </div>
    </div>
  )
}

export default App