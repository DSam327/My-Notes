import React from 'react'
import { Link } from 'react-router-dom';

const getDate = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

const getTitle = (note) => {
    let title = note.body.split('\n')[0]
    
    if(title.length > 45){
        return title.slice(0,45);
    }
    return title
}

let getContent = (note) =>{
    let title =getTitle(note)
    let content=note.body.replaceAll('\n', ' ')
    content=content.replaceAll(title, '')

    if(content.length > 45){
        return content.slice(0, 45)
    }
    return content
}

export const ListItem = (props) => {
  return (
    <Link to={`/note/${props.note.id}`}>
    <div className='notes-list-item'>
    {getTitle(props.note)}
    <p><span>{getDate(props.note)}</span> {getContent(props.note)}</p>
    </div>
    </Link>
  )
}

export default ListItem;
