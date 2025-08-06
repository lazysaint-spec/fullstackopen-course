const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name}: {props.part.exercise}
            </p>
        </div>
    )
}


const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    )
}


export default Content