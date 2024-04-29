

export default  function Users({user}) {
     

    const {name,subname,dateOfBirth}=user
   

    return (
       
       
        
    
    <div className={'conteinerUsers'}> 
            <h2 className= {'titleUser '}>{name}</h2>
       
            <div>
                <h3 className={'titleDescription'} >{subname}</h3>
                <h4> {dateOfBirth}</h4>
            </div>
        </div>

      
    );
 }