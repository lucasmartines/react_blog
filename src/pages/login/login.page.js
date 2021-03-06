import React, { useEffect,useState } from "react";
import { useLocation,useHistory } from "react-router-dom";


import logarUsuario,{logarUsuarioGoogle} from './../../services/usuario/logarusuario.service'
import cadastrarUsuario from '../../services/usuario/cadastarUsuario.service'
import {useUserData} from '../../context/UserData.context'

import "./Login.style.scss"

const INITIAL_FORM_STATE = {
    nome:"",
    senha:"",
    confirmarSenha:"",
    email:""
}
export default function (props) {
  
  let location = useLocation();
  let [isLogin,setIsLogin] = useState(false)
  let [formState,setFormState] = useState( INITIAL_FORM_STATE )
  let [logado,userState] = useUserData();
  
  let history = useHistory()

  useEffect( () => {
      console.log("user State;",userState)
    if( logado ){
        history.push("/")
        
    }
  },[logado])


  useEffect(() => {

    if(location.pathname.includes("login")){
        setIsLogin(true)      
    }else{
        setIsLogin(false)
    }
  });
  
  useEffect( () => {
    setFormState( INITIAL_FORM_STATE )
  },[location.pathname])
  
  const handleChange = (e) => {
    console.log(e.target.name,e.target.value)
    setFormState({ ...formState ,[e.target.name]:e.target.value})
  }
  const handleLoginWithGoogle = () => {
    logarUsuarioGoogle();

  }

  const handleSubmit = (e) => 
  {
    e.preventDefault()
    let {email,senha,confirmarSenha,nome} = formState


    if( isLogin ){

        
        
        if(email.length && senha.length){
            console.log(email,senha)
            logarUsuario(email,senha)
        }
        else{
          alert("Nome ou senha Invalidos")
        }

    }else
    {

      if( ( email.length && senha.length ) && ( senha == confirmarSenha ) ){
        cadastrarUsuario(email,senha,nome)
      } 
      else{
        alert("Nome ou senha Invalidos")
      }
       
    }
  }
  return (
    <>
      <div className="loginContainer container">
        <form className="login" onSubmit={ handleSubmit }>
            <Input 
                label="Nome"
                show={!isLogin}
                name="nome"
                type="text" 
                value={formState.nome}
                errorMessage="Senha Invalida" 
                isValid={true} 
                onChange={handleChange}
                />
             <Input 
                label="Email"
                show={true}
                name="email"
                value={formState.email}
                type="email" 
                errorMessage="Senha Invalida" 
                onChange={handleChange}
                isValid={true} 
                 />
            <Input 
                label="Senha"
                show={true}
                name="senha"
                type="password" 
                value={formState.senha}
                onChange={handleChange}
                errorMessage="Senha Invalida" 
                isValid={true} 
                 
                />
            <Input
                label="ConfirmarSenha"
                show={!isLogin} 
                value={formState.confirmarSenha}
                name="confirmarSenha" 
                type="password" 
                onChange={handleChange}
                errorMessage="Senha Não combina"
                isValid={true}
                 />
            <div className="loginContainer__buttonsContainer" >
              <button onClick={logarUsuarioGoogle}> Login com o Google</button>
              <LogarCadastrar isLogin={isLogin} />
            </div>
            
        </form>
      </div>
    </>
  );
}


function LogarCadastrar(props){

    return(
        <button type="submit">
            {(props.isLogin)?"Login":"Cadastrar"}
        </button>
    )
}
function Input(props)
{

    if(props.show){
        return(
        <div className="form-control">
            <label>{props.label}</label>
            <input {...props} />
            {(!props.isValid)&&(
                <small>{props.errorMessage}</small>
            )}
            {(props.value == "" && !props.isValid)&&(<small>Erro o campo não pode ser nulo</small>)}
        </div>
        )
    }else{
        return("")
    }
}
