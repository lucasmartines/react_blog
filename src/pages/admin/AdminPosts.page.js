import React,{useState, useEffect} from 'react'
import {useParams,useLocation,useHistory} from 'react-router-dom'

import { useMetadata } from '../../context/Metadata.context'
import savePost from '../../services/post/savePost.service'
import updatePost from '../../services/post/updatePost.service'
import {Link} from 'react-router-dom'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import firebase from '../../firebase.config'

export default ({}) => {

    let reseted = {
        titulo:"",
        conteudo:""
    }

    let [novoPost,setNovoPost]  = useState(reseted)
    let [ version,useVersion ] = useMetadata()

    let [salvandoStatus,setSalvandoStatus ] = useState({
        mensagem:"",
        estouSalvando: false
    })

    let [ carregandoPost , setCarregandoPost] = useState({carregando:true})

    let location = useLocation();
    let params = useParams()
    let history = useHistory() 
 


    useEffect( () => {
        console.log( novoPost )
    }, [novoPost])

    useEffect( () => {

     

        const componentStart = async () => 
        {   
          
            if( params.id && params.id != "undefined" ){
                // modo atualizar
                let post =  await firebase.firestore().doc("posts/"+params.id).get()
                post = post.data()
                
                if( post ){
                    setNovoPost({
                        titulo:post.titulo,
                        id: post.id,
                        conteudo: post.conteudo,
                        link: post.link
                    })

            
                    
                 }else{
                    alert("post não existe")
                    history.push("/")
                }
                
            }
            setCarregandoPost({carregando:false})

             
        }
        setNovoPost(reseted)
        componentStart()
        
    } , [location] )



    const changeValue = ( e ) => 
    {
        let {name,value} = e.target 
        setNovoPost({ ...novoPost,[name]:value}  )
    }

    const handleDelete = () => {


        if(  window.confirm("Quer Deletar") ){
            firebase.firestore().doc("/posts/"+params.id ).delete().then( () => {
                history.push("/")
            })
            
        }

    }

    const handleFileChange = (e) => {
        
        
        let file = e.target.files[0]
        if( file ){
            let reader = new FileReader()
            reader.onload = () => {
                setNovoPost({...novoPost,link:reader.result})
            }
            reader.readAsDataURL( file )
            
        }
    }

    /** it fires when new post is updated */
    const onUpdate = () => {
       
        setSalvandoStatus({estouSalvando:false,mensagem:""})
        alert("updated")        
        
    }
    /* a event that fire when new post is created */
    const onSave = ({id}) => {
         
        setSalvandoStatus({estouSalvando:false,mensagem:""})
        history.push(`/admin/editar_post/${id}`)
        alert("Item salvo com sucesso")
    }



    const handleSubmit = (e) =>{
        e.preventDefault()


            if( params?.id ){
                
                setSalvandoStatus({estouSalvando:true ,mensagem:"Estou Atualizando..."})
               // console.log(  e.target.file.files[0] )
                  updatePost({...novoPost } , e.target.file?.files[0] , params.id , onUpdate )
                
            }else{
                setSalvandoStatus({estouSalvando:true ,mensagem:"Estou Salvando..."})
                savePost({...novoPost } , e.target.file.files[0] , onSave )
            }

           
        
    }

    

    return(
        <>

            <div className="container container-admin-page">
                <h2 className="titulo">
                    <Link to={`/post/${params?.id}`}> { novoPost?.titulo} </Link>
                </h2>
                <div className="admin-page">

                    <div className="action">
                                <button 
                                    disabled={salvandoStatus.estouSalvando}
                                    onClick={  handleSubmit}
                                > 
                                
                                { params?.id ? "Atualizar":"Inserir"} </button> 
                                
                                {params?.id ? ( 
                                <button 
                                    onClick={  handleDelete }> 
                                    Deletar Post 
                                </button>
                                ):""}
                            </div>

                        <div class="admin-page__image">
                            <img src={novoPost.link} /> <br/>
                            {/* <small> Imagem Antiga </small> */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="titulo">Nome</label>
                            <input 
                                name="titulo"
                                value={novoPost.titulo} 
                                onChange={changeValue} required/>

                            <label htmlFor="file" >File</label>
                            <input 
                                name="file"
                                type="file" 
                                onChange={handleFileChange}  
                                /* if link exists then user is not obrigated to fill it */
                                required={novoPost.link ? false : true }
                            />

                            <label htmlFor="conteudo">Conteudo</label>
                            
                            
                            {/* <textarea 
                                required 
                                rows={40}  
                                name="conteudo" 
                                value={novoPost.conteudo}
                                onChange={changeValue} /> */}
                            
                           
                            <TextEditor 
                                initial={novoPost.conteudo}
                                onChangeInput={
                                    ({ value }) => {
                                        if( !carregandoPost.carregando ){
                                            setNovoPost(() => ({ ...novoPost , conteudo: value })  )
                                        }
                                        
                                    }
                                } />
                                    

                            {salvandoStatus.estouSalvando
                                ?salvandoStatus.mensagem:""}
                        </form>
                </div>
            </div>

        </>
    )
}


function TextEditor({onChangeInput,initial}){

 
    return(
        <CKEditor
            editor={ ClassicEditor }
            data={  initial  }
            onInit={ editor => {    } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();

               if( onChangeInput )
               {
                    onChangeInput( { value:data}  )
               }
               
            } }
            onBlur={ ( event, editor ) => {
            } }
            onFocus={ ( event, editor ) => {
            } }
        />
    )
}