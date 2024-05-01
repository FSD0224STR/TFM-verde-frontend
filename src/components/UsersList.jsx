

export default  function UsersList({user}) {
     

    const {name,surname,dateOfBirth}=user
   

    return (
       
       
        
    
    <div className={'conteinerUsers'}> 
            <h2 className= {'titleUser '}>{name}</h2>
       
            <div>
                <h3 className={'subName'} >{surname}</h3>
                <h4 className='date'> {dateOfBirth}</h4>
            </div>
        </div>

      
    );
 }