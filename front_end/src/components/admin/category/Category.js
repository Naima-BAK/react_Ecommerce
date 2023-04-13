import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Category() {

    const [loading, setLoading] = useState(true);
    const [category_list, setCategory_list] = useState([]);

    // On utilise useEffect pour indiquer que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        axios.get('/api/view_category').then(res => {
            // console.log(res.data.Category);
            if (res.data.status === 200) {
                setCategory_list(res.data.category);
            }
            setLoading(false);
        })
    }, []);

    var viewCategory_HTMLTABLE = [];
    if (loading) {
        return (
            <h2>Loading ... </h2>
        )
    }
    else {
        // viewCategory_HTMLTABLE : The HTML element represents categories data
        viewCategory_HTMLTABLE =
            // La .map()méthode vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
            category_list.map((item) => {
                return (
                    <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                        <div className='py-3 col-1 text-start'>{item.id}</div>
                        <div className='py-3 col-2'>{item.name}</div>
                        <div className='py-3 col-2'>{item.slug}</div>
                        <div className='py-3 col-3'>{item.description}</div>
                        <div className='py-3 col-2'>{item.status}</div>
                        <div className='py-3 col-2 text-center'>
                            <div className='row'>
                                <div className='col-6'><Link to="#" className='btn btn-success btn-sm'>Edit</Link></div>
                                <div className='col-6'><button type='button' className='btn btn-danger btn-sm'>Delete</button></div>
                            </div>
                        </div>
                    </div>
                )
            })
    }
    return (
        <div className="container p-5">
            <div className='card shadow'>
                <div className="card-header">
                    <h5 className='mb-3 mb-md-0'>Categories
                        <Link to="/admin/Addcategory" className='btn btn-primary btn-sm float-end'>Add Category</Link>
                    </h5>
                </div>
                <div className="p-0 card-body">
                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-2'>Nom</div>
                        <div className='col-2'>Slug</div>
                        <div className='col-3'>Description</div>
                        <div className='col-2'>Status</div>
                        <div className='col-2'>Actions</div>
                    </div>

                    {viewCategory_HTMLTABLE}
                </div>
            </div>

        </div>
    )

}
