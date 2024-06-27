import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import PassRecoverForm from '../components/forms/recoverForm/PassRecoverForm'
import { useParams } from 'react-router-dom'

export default function ChangePassPage() {
   const { tokenRecoveryparams } = useParams()
  
   return (
      <>
         <NavBar />
         <PassRecoverForm tokenRecoveryparams={tokenRecoveryparams} />
      </>
   )
}
