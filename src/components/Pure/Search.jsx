
import React from 'react';

export const Search=({ children,search,placeholder})=>{

        return(
                <>
                        <input  onChange={search} placeholder={placeholder}></input> 
                       
                        { children }
                </>
                
        )
}