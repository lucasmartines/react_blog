import React from 'react'
import {Link} from 'react-router-dom'


export default ({posts}) => {

    

    const linkOuDefault = ( url) => {
        return url ? url : "https://via.placeholder.com/150"
    }

    let showPostList = () => 
    {
        return posts && posts?.map (
             ({titulo,conteudo,link,id}) => (
                <li key={id} className="post-item">
                    <img className="float-left" src={linkOuDefault(link)}  />
                    <h2 className="titulo">
                        <Link to={`/post/${id}`} >{titulo} </Link>
                    </h2>
                    <p> {removeHtmlTagFilter ( conteudo.slice(0,300) )}...</p>
                    <div className="links">
                        <Link 
                            className="btn btn-primary"

                            to={`/admin/editar_post/${id}`} > Editar </Link>
                            <Link 
                            className="btn btn-primary"

                            to={`/post/${id}`} > Saiba Mais </Link>
                    </div>
                </li>
            )
        ) 
    }

    return(
        <div className="post-list-container">
            <h2 className="front-page__titulo"> Ultimos Posts </h2>
            <ul className="posts-list flex-column">
                {showPostList()}
            </ul>
        </div>
    )
}


export function removeHtmlTagFilter( text )
{
    
    let alvo = text.replaceAll(/<[a-zA-Z\/][^>]*>/g, " ")
    alvo = alvo.replaceAll(/(&nbsp;|&nbsp;|&lt;|&gt;|&gt)*/g,"")

    console.log( alvo )
    return alvo
}