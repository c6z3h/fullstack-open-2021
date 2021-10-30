import React from 'react'

const Filter = ({ onChange, value }) => {
    return (
        <div>
            countries: <input onChange={onChange} value={value}></input>
        </div>
    )
}

export default Filter