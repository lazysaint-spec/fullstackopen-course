import { useState } from 'react'
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ label, value}) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const Statistics =({up = 0, fair = 0, down = 0}) => {
    const total = up + fair + down
    const netReview = up - down
    const avg = netReview / total
    const goodReview = (100 * up)  / total

    if (total === 0 ) {
      return(
        <div>No feedback given</div>
      )
    } else {
      return (
        <div>
          <table>
            <tbody>
              <StatisticLine label='good' value={up} />
              <StatisticLine label='neutral' value={fair} />
              <StatisticLine label='bad' value={down} />
              <StatisticLine label='all' value={total} />
              <StatisticLine label='average' value={avg.toFixed(2)} />
              <StatisticLine label='positive' value={goodReview.toFixed(2) + '%'} />
            </tbody>
          </table>
        </div>
      )
    }

}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = {
    feedback: 'give feedback',
    stats: 'statistics',
  }

  const handleGoodReview = () => {
    setGood(good + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>
        {title.feedback}
      </h1>

      <Button onClick={handleGoodReview} text='good' />
      <Button onClick={handleNeutralReview} text='neutral' />
      <Button onClick={handleBadReview} text='bad' />

      <h1>
        {title.stats}
      </h1>
        <Statistics up={good} fair={neutral} down={bad}/>
    </div>
  )
}


export default App
