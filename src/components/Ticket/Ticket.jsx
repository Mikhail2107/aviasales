import styles from './Ticket.module.scss'

const formatPrice = (price) => {
  const newPrice = String(price)

  if (newPrice.length < 5) return newPrice

  return newPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}
const travelTime = (duration) => `${Math.trunc(duration / 60)} ч ${duration % 60} м`

function Ticket(props) {
  const { ticket } = props
  const count = ticket.transfersCount
  const countBack = ticket.transfersCountBack
  const ticketInfo = [
    {
      id: 1,
      item1: ticket.fromTo,
      item2: ticket.fromToTime,
    },
    {
      id: 2,
      item1: 'В ПУТИ',
      item2: travelTime(ticket.travelTime),
    },
    {
      id: 3,
      item1: `${count} ПЕРЕСАД${/1/.test(count) ? 'КА' : /[2-4]/.test(count) ? 'КИ' : 'ОК'}`,
      item2: ticket.transfersName,
    },
    {
      id: 4,
      item1: ticket.fromToBack,
      item2: ticket.fromToTimeBack,
    },
    {
      id: 5,
      item1: 'В ПУТИ',
      item2: travelTime(ticket.travelTimeBack),
    },
    {
      id: 6,
      item1: `${countBack} ПЕРЕСАД${/1/.test(countBack) ? 'КА' : /[2-4]/.test(countBack) ? 'КИ' : 'ОК'}`,
      item2: ticket.transfersNameBack,
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.price}>{`${formatPrice(ticket.price)} Р`}</div>
        <img
          className={styles.logoCompany}
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="Logo of company"
        />
      </div>
      <ul className={styles.infoContainer}>
        {ticketInfo.map((info) => {
          return (
            <li key={info.id}>
              <div className={styles.infoItem}>
                <div>
                  <span className={styles.infoItem__header}>{info.item1}</span>
                </div>
                <div>{info.item2}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Ticket