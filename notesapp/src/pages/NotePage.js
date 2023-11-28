import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = (props) => {
    let n1=useParams()
    console.log(n1)
    let noteid=n1.id
    let [note, setNote]=useState(null)
    
    useEffect(()=>{
        getnote()
    }, [noteid])

    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteid}`, {
            method : 'PUT', 
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let createNote = async () => {
        await fetch(`http://localhost:8000/notes/`, {
            method : 'POST', 
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteid}`, {
            method : 'DELETE', 
            headers: {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(note)
        })
    }

    let getnote = async () => {
        if(noteid==='new')return
        let response = await fetch(`http://localhost:8000/notes/${noteid}`)
        let data = await response.json()
        setNote(data)
    }

    let handleSubmit = () => {
        if(noteid!=='new' && !note.body){
            deleteNote()
        }
        else if(noteid!=='new'){
            updateNote()
        }
        else if(note!==null){
            createNote()
        }
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to={"/"}>
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            <Link to={"/"}>
            {noteid!=='new'? (<button onClick={deleteNote}>Delete</button>): (<button onClick={createNote}>Done</button>)}
                    
            </Link>
        </div>
        <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} value={note?.body}>
        </textarea>
    </div>
  )
}

export default NotePage