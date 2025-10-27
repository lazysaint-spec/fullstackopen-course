import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:[
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  

  return (
    <div>
      <Header course={course.name}/>
      <Content 
        parts={course.parts}
      />
      <Total 
        total={
          course.parts[0].exercise + 
          course.parts[1].exercise + 
          course.parts[2].exercise}
      />
    </div>
  )
}

// const History = (props) => {
//   if(props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   // const [total, setTotal] = useState(0)

//   const handleLeftClick = () => {
//     // setAll(allClicks.concat('L'))
//     // const updatedLeft = left + 1
//     // setLeft(updatedLeft)
//     // setTotal(updatedLeft + right)
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   // const handleRightClick = () => {
//   //   // setAll(allClicks.concat('R'))
//   //   // const updatedRight = right + 1
//   //   // setRight(updatedRight)
//   //   // setTotal(left + updatedRight)
//   //   setAll(allClicks.concat('R'))
//   //   setRight(right + 1)
//   // }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />

//       {/* <p>total {total}</p> */}
//     </div>
//   )
// }

export default App