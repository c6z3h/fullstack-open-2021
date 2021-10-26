const Total = ({parts}) => {
    const total = (parts.reduce((sum_exercises,part) => 
		sum_exercises + part.exercises, 0))
    return <b><p>total of {total} exercises</p></b>
}

const CourseList = ({parts}) => {
    return(
        <table><tbody>
        {parts.map(parts => <tr key={parts.id}><td>
            {parts.name} {parts.exercises}</td></tr>)}
        </tbody></table>
    )
}

const Course = ({courses}) => {

	return(
		// <div><h1>Web Development Curriculum</h1></div>
        courses.map(courses => <div key={courses.id}>
        <h2>{courses.name}</h2>
        <CourseList parts={courses.parts}/>            
        <Total parts={courses.parts}/>
        </div>
	)
    )
}

export default Course