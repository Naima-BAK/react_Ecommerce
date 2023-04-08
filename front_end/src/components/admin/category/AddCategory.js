import React from 'react'
import './category.css';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddCategory() {
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        errorsList: [],
    });

    const handlInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
        }
        axios.post('api/add_Category', data).then(res => {
            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
                document.getElementById('CATEGORY_FORM').reset();
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, errorsList: res.data.errors });
            }
        })
    }

    return (

        <div className="registration-form">
            <form onSubmit={submitCategory} id='CATEGORY_FORM'>
                <div className="form-title">
                    <h4>Ajouter une catégorie</h4>
                    <br />
                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.name} className="form-control item" name="name" placeholder="nom de la catégorie" />
                    <small className='text-danger'>{categoryInput.errorsList.name}</small>

                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.slug} className="form-control item" name="slug" placeholder="slug" />
                    <small className='text-danger'>{categoryInput.errorsList.slug}</small>

                </div>
                <div className="form-group">
                    <input type="text" onChange={handlInput} value={categoryInput.description} className="form-control item" name="description" placeholder="description" />
                </div>


                <div className="form-check mb-3">
                    <label className="form-check-label" htmlFor="statusCheck">Status</label>
                    <input id="statusCheck" className='form-check-input' type="checkbox" name='status' onChange={handlInput} value={categoryInput.status} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block ajouter">Ajouter</button>
                </div>
            </form>

        </div>


    )
}
