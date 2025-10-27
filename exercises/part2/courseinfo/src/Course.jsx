const Header = ({name}) => {
    return (
        <h1>
            {name} 
        </h1>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}


const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => 
                <li key={part.id}>
                    <Part part={part}/>
                </li>
            )}
        </div>
    )
}


const Total = ({parts}) => {
    const sum = parts.reduce((accumulator, number) => {
        return accumulator + number.exercises
    }, 0);

    return (
        <p>
            <strong> 
                total of {sum} exercises 
            </strong>
        </p>
    )
}

const SingleCourse = ({ course }) => {
    return (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/> 
        <Total parts={course.parts}/>
    </div>)
}


const Course = ({courses}) => {
    return (
        <div>
            {courses.map(course => 
                <li key={course.id}>
                    <SingleCourse course={course}/>
                </li>
            )}
        </div>
    )
}

export default Course