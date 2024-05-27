
import React from 'react';

const Servidorurl='http://localhost:3000'
//Metodo de JS para trabajar con query params y pasarlo a la url del servidor como string. 
//Puedes crear un objeto con todos los parametros de busqueda.

export const queryParamsDynamic=  (coordinates,city,date,typeOfDancing)=>{
        const queryParams = new URLSearchParams()
        
        coordinates? queryParams.append('coordinates',`${coordinates}`):null
        
        city? queryParams.append('city',`${city}`):null

        date? queryParams.append('date',`${date}`):null

        typeOfDancing? queryParams.append('typeOfDancing',`${typeOfDancing}`):null

        return queryParams

}

export const getLocationfilteredApi=async(coordinates,city,date,typeOfDancing)=>{

        try {

                const queryParamsdone=queryParamsDynamic(coordinates,city,date,typeOfDancing)
           
                const response =await fetch(`${Servidorurl}/locations/?${queryParamsdone.toString()}`)

                if(!response.ok){
                        throw new Error('Este es el error al filtrar:',`${response.status}`)
                }
                const Locationfiltered= response.json()
                
                return Locationfiltered
        
        } catch (error) {

                console.log('Se ha producido un error con el fetch',error)
                throw error
        
        }

}