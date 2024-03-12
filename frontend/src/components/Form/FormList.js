import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/FormList.css';

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [showCreateFormModal, setShowCreateFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [newFormName, setNewFormName] = useState('');
    let userData = localStorage.getItem('user');
    let token = JSON.parse(userData).jwtToken;

    const handleCreateForm = async () => {
        try {
            await axios.post(
                'http://localhost:4000/api/form/create',
                { form_name: newFormName },
                {
                    withCredentials: true,
                }
            );
            // Refresh the form list after creating a new form
            getForms();
            setShowCreateFormModal(false);
            setNewFormName('');
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/form/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
                },
            });
            setForms(forms.filter((form) => form.form_id !== id));
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

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
            <button
                className='btn btn-success mb-3'
                onClick={() => setShowCreateFormModal(true)}
            >
                Create Form
            </button>
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
                                    className='btn btn-primary mr-2'
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/form/${form.form_id}/edit`}
                                    className='btn btn-warning mr-2'
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(form.form_id)}
                                    className='btn btn-danger'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateFormModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setShowCreateFormModal(false)}
                        >
                            &times;
                        </span>
                        <h2>Create Form</h2>
                        <input
                            type='text'
                            value={newFormName}
                            onChange={(e) => setNewFormName(e.target.value)}
                            placeholder='Enter form name'
                        />
                        <button onClick={handleCreateForm}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormList;
