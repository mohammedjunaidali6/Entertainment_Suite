import React, { useState} from 'react';
import "./searchBar.css"


export default function SearchBar(){

    const [value, setValue] = useState(null);

    const  handleChange = (event) =>{
        setValue(event.target.value);
    } 
    console.log(value);
    return(
        <input type="text" onChange={handleChange} placeholder="Search" className='searchBar'/> 
    )
    
    
}
