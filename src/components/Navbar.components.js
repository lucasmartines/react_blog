import React from 'react'
import { useMetadata } from './../context/Metadata.context'
import {Link,useHistory} from 'react-router-dom'
import {useUserData} from '../context/UserData.context'

import deslogarUsuario from '../services/usuario/deslogarUsuario.service'

export default () => {

    const [version,setVersion] = useMetadata()
    let [userState] = useUserData();

    
    let history = useHistory()

    const handleDeslogar = () => {

        deslogarUsuario( () => {
            history.push("/")
        })
    }

    return(            
        <nav className="navbar">
             
            <ul>
                <li> 
                    <Link to="/">Blog</Link>
                </li>
                <li>
                    {(userState)&&(
                    <Link to="/admin">Inserir Post </Link>
                    )}
                </li>
                
                {(!userState)&&(
                    <li>
                        <Link to="/login">Login </Link>
                        <Link to="/signup">Cadastrar </Link>
                    </li>
                )}
            
                
                    
                {(userState)&&(
                    <li>
                        <button 
                            onClick={handleDeslogar}
                            className="navbar-button"> Logout {userState.displayName} </button>
                    </li>
                )}
                
               
                
            </ul>
            <ul>
               
            </ul>
        </nav>
    )
}