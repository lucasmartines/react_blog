import React,{createContext,useContext,useState,useEffect} from 'react'
import firebase from '../firebase.config'

const UserData = createContext()


export default function({children})
{

    let [userState,setUser] = useState(false)
    let [loaded,setLoaded] = useState(false)
    let [logado,setLogado] = useState(false)
     
    useEffect( () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if( user){
                
                setUser(user)
                console.log("Logado:",user)
                setLoaded(true)
                setLogado(true)
            }else{
                setUser(false)
                setLogado(false)
            }
            
        });   
    })

    return(<UserData.Provider value={{userState,loaded,logado}}>

        {children}
    </UserData.Provider>)
}

export function useUserData () {

    const context = useContext(UserData)
    if( !context ) {
        throw new Error("Contexto deve ser provido")
    }

    const {userState,loaded,logado} = context
    
    return [userState,loaded,logado]
}