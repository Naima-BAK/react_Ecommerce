import React, { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingCat from './LoadingCat';
import swal from 'sweetalert';
function EditCategory(props) {
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        // console.log(id);
        axios.get(`/api/edit_category/${id}`).then(res => {

            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ViewCategory');
            }
            setLoading(false);
        });


    }, [id, navigate]);



    const updateCategory = (e) => {
        e.preventDefault();

        const data = categoryInput;
        axios.put(`/api/update_category/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("Tous les champs sont obligatoires", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('admin/viewCategory');
            }
        });
    }


    if (loading) {
        return <LoadingCat />
    }


    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Modifier la  Categorie
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={updateCategory}>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <small className="text-danger">{error.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <small className="text-danger">{error.name}</small>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} />
                                </div>

                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Modifier</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default EditCategory;