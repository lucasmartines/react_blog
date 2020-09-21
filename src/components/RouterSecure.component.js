import React from "react";
import { Route , Redirect} from 'react-router-dom';
import {useUserData} from '../context/UserData.context'


export default function RouterSecure({...rest}){

    let ehAutenticado = false;

    let [userState] = useUserData()

        if ( userState  ) 
            return <Route {...rest}  />
        else
            return( 
                <Redirect 
                    to={{
                        pathname:"/",
                    }}   /> )
    
}