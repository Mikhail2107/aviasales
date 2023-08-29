import classes from './ButtonMore.module.scss'

function ButtonMore(props) {
  const { toAddTickets } = props
  return (
    <button type="button" className={classes['button-see-more']} onClick={toAddTickets}>
      Показать еще
    </button>
  )
}

export default ButtonMore
