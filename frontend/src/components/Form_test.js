import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forms = () => {
    const [form, setForm] = useState([]);

    const handleDelete = async (id) => {};
    const getForms = () => {
        axios
            .get('http://localhost:4000/api/form/all')
            .then((res) => {
                console.log(res);
                setForm(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getForms();
    }, []);

    return (
        <div className='mt-5'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Form Name</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {form?.map((item, i) => {
                        return (
                            <tr key={item.form_id}>
                                <td>{item.form_id}</td>
                                <td>{item.form_name}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                    <i
                                        className='fa fa-trash-o'
                                        aria-hidden='true'
                                        onClick={() => handleDelete(item.id)}
                                    ></i>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Forms;
