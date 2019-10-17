import React, { useState } from 'react'
import axios from 'axios'

export default function AddMovie(props){

    const [item, setItem] = useState({
        stars: []
    })

    const handleChanges = e => {
        let value = e.target.value
        if (e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }
        setItem({
          ...item,  
          [e.target.name] : value
      })
    }

    const handleSubmit = e => {
        let value = e.target.stars.value
        e.preventDefault()
        axios
        .post('http://localhost:5000/api/movies', {...item, stars:(value.split(','))})
        .then(res => {
            console.log(res)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
      <form onSubmit={handleSubmit}>
        <label name="title" htmlFor="title">
          Title: 
          <input name="title" htmlFor="title" type="text"  onChange={handleChanges} />
        </label>

        <label name="director" htmlFor="director">
          Director: 
          <input name="director" htmlFor="director" type="text"  onChange={handleChanges}/>
        </label>

        <label name="metascore" htmlFor="metascore">
          Metascore: 
          <input name="metascore" htmlFor="metascore" type="text"  onChange={handleChanges}/>
        </label>

        <label name="stars" htmlFor="stars">
          {" "}
          Stars: 
          <input name="stars" htmlFor="stars" type="text"  onChange={handleChanges}/>
        </label>

        <button type="submit">Submit Changes</button>
      </form>
    </div>
    )
}

