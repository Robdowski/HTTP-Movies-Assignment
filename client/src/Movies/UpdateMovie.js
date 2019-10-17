import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateMovie(props) {
  const [item, setItem] = useState({})
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(res => {
        const itemToEdit = res.data.find(
            item => `${item.id}` === props.match.params.id
          );
            setItem(itemToEdit)
      })
      .catch(err => console.log(err));
  }, [item.id, props.match.params.id]);


  const handleSubmit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${item.id}`, item)
    .then(res => {
        console.log('edit successful', res);
        props.history.push(`/movies/${item.id}`)
    })
    .catch(err => console.log('error editing data', err))
  };

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

  console.log('props for update', props);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label name="title" htmlFor="title">
          Title: 
          <input name="title" htmlFor="title" type="text" value={item.title} onChange={handleChanges} />
        </label>

        <label name="director" htmlFor="director">
          Director: 
          <input name="director" htmlFor="director" type="text" value={item.director} onChange={handleChanges}/>
        </label>

        <label name="metascore" htmlFor="metascore">
          Metascore: 
          <input name="metascore" htmlFor="metascore" type="text" value={item.metascore} onChange={handleChanges}/>
        </label>

        <label name="star" htmlFor="star">
          {" "}
          Stars: 
          <input name="star" htmlFor="star" type="text" value={item.stars} onChange={handleChanges}/>
        </label>

        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
}

export default UpdateMovie;
