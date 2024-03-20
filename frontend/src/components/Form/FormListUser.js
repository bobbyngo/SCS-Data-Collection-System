import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/FormList.css';

const FormListUser = () => {
    const [forms, setForms] = useState([]);

    const getForms = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4000/api/form/all',
                {
                    withCredentials: true,
                }
            );
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    useEffect(() => {
        getForms();
    }, []);

    return (
        <div className='mt-5'>
            <h2>Form List</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Form Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form.form_id}>
                            <td>{form.form_id}</td>
                            <td>{form.form_name}</td>
                            <td>
                                <Link
                                    to={`/form/${form.form_id}`}
                                    state={{ form: form.form_name }}
                                    className='btn btn-primary'
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormListUser;
