const Person = ({searchPerson, deletePerson}) => {
    return (
        <div>
            {searchPerson.map(person => 
                    <div key={person.id}>
                        <button onClick={() => deletePerson(person.id, person.name)}> 
                            delete
                        </button>
                        {person.name} 
                        {person.number}
                    </div>
            )}
        </div>
    )
}

export default Person