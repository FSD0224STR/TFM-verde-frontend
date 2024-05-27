
import React from 'react';

export const Search=({ onChange,placeholder,filterBy})=>{

        return(
                <>
                        <input value={filterBy} onChange={onChange}  placeholder={placeholder}  />
                        
                </>
                
        )
}