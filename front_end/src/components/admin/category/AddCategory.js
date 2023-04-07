import React from 'react'
import './category.css';
import { useState } from 'react';

export default function AddCategory() {
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: ''
    });

    const handlInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const submitCategory = () => { }
    return (

        <div className="registration-form">
            <form onSubmit={submitCategory}>
                <div className="form-title">
                    <h4>Ajouter une catégorie</h4>
                    <br />
                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.name} className="form-control item" name="slug" placeholder="slug" />
                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.name} className="form-control item" name="name" placeholder="nom de la catégorie" />
                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.description} className="form-control item" name="description" placeholder="description" />
                </div>


                <div className="form-check mb-3">
                    <label className="form-check-label" htmlFor="statusCheck">Status</label>
                    <input id="statusCheck" className='form-check-input' type="checkbox" name='status' onChange={handlInput} value={categoryInput.status} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-block ajouter">Ajouter</button>
                </div>
            </form>

        </div>


    )
}
