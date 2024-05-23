
import React from 'react';

export const Search=({ children,onChange,placeholder,filterBy})=>{

        return(
                <>
                        <input  value={filterBy} onChange={onChange}  placeholder={placeholder}  />
                       
                        { children }
                </>
                
        )
}