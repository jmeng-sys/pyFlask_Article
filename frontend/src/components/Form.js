import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function Form(props) {
    const[title, setTitle] = useState('')
    const[body, setBody] = useState('')

    useEffect(() => {
        setTitle(props.article.title)
        setBody(props.article.body)
    },[props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, body})
        .then(resp => props.updatedData(resp))
        .catch(err => console.log(err))
    }

    const addArticle = () => {
        APIService.AddArticle({title, body})
        .then(resp => props.addedArticle(resp))
        .catch(err => console.log(err))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" 
                    placeholder="Please Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="body" className="form-label">Description</label>
                    <textarea rows="5" className="form-control" 
                    placeholder="Please Enter Description"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    />
                    
                    {
                        props.article.id ? 
                        <button
                        className="btn btn-success mt-3"
                        onClick={updateArticle}
                        >Save Update</button>
                        :
                        <button
                        className="btn btn-success mt-3"
                        onClick={addArticle}
                        >Save Add</button>
                    }
                </div>
            ):null}
        </div>
    )
}

export default Form