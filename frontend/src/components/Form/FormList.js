import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/FormList.css';

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [showCreateFormModal, setShowCreateFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [newFormName, setNewFormName] = useState('');
    const [selectedFormId, setSelectedFormId] = useState('');
    let userData = localStorage.getItem('user');
    let token = JSON.parse(userData).jwtToken;

    const isAdmin = () => {
        // Retrieve userData within the function to get the latest information
        let userData = localStorage.getItem('user');
    
        if (!userData) {
            console.log("No user data found in local storage.");
            return false;
        }
    
        try {
            const user = JSON.parse(userData);
            console.log("Parsed user data:", user);
    
            // Check for admin role ids: 0 (Administrator)
            const adminRoles = [0, 1, 3]; // Based on the user object structure provided
            const isUserAdmin = adminRoles.includes(user.user.role_id);
    
            console.log(`User Role ID: ${user.user.role_id}, Is Admin: ${isUserAdmin}`);
            return isUserAdmin;
    
        } catch (error) {
            console.error("Error parsing user data:", error);
            return false;
        }
    };

    const handleCreateForm = async () => {
        try {
            await axios.post(
                'http://localhost:4000/api/form/create',
                { form_name: newFormName },
                {
                    withCredentials: true,
                }
            );
            getForms();
            setShowCreateFormModal(false);
            setNewFormName('');
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    const handleUpdateForm = async () => {
        try {
            await axios.put(
                `http://localhost:4000/api/form/${selectedFormId}`,
                { form_name: newFormName },
                {
                    withCredentials: true,
                }
            );
            getForms();
            setShowUpdateFormModal(false);
            setNewFormName('');
        } catch (error) {
            console.error('Error updating form:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/form/${id}`, {
                withCredentials: true,
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
        document.title = "Form List";
    }, []);


    return (
        <div className='mt-5'>
            <h2>Form List</h2>
            {/* Conditionally render the Create Form button for admins */}
            {isAdmin() && (
                <button
                    className='btn btn-success mb-3'
                    onClick={() => setShowCreateFormModal(true)}
                >
                    Create New Form
                </button>
            )}
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
                                    className='btn btn-primary mr-2'
                                >
                                    View/Fill Out
                                </Link>
                                {/* Conditionally render the "View Submissions" button for admins */}
                                {isAdmin() && (
                                    <>
                                        <Link
                                            to={`/submissions/${form.form_id}`}
                                            className='btn btn-info mr-2'
                                        >
                                            View Submissions
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setNewFormName(form.form_name);
                                                setSelectedFormId(form.form_id);
                                                setShowUpdateFormModal(true);
                                            }}
                                            className='btn btn-warning mr-2'
                                        >
                                            Rename
                                        </button>
                                        <button
                                            onClick={() => handleDelete(form.form_id)}
                                            className='btn btn-danger'
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
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
                        <button
                            className='create-button'
                            onClick={handleCreateForm}
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}

            {showUpdateFormModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setShowUpdateFormModal(false)}
                        >
                            &times;
                        </span>
                        <h2>Update Form</h2>
                        <input
                            type='text'
                            value={newFormName}
                            onChange={(e) => setNewFormName(e.target.value)}
                            placeholder='Enter new form name'
                        />
                        <button
                            className='update-button'
                            onClick={handleUpdateForm}
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
            {showUpdateFormModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setShowUpdateFormModal(false)}
                        >
                            &times;
                        </span>
                        <h2>Update Form</h2>
                        <input
                            type='text'
                            value={newFormName}
                            onChange={(e) => {
                                setNewFormName(e.target.value);
                            }}
                            placeholder='Enter new form name'
                        />
                        <button
                            className='update-button'
                            onClick={handleUpdateForm}
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormList;

