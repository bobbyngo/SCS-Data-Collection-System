import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/FormList.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [editId, setEditId] = useState(null); // Used to track which answer is being edited
    const { formId } = useParams(); // Retrieves 'formId' from the URL

    useEffect(() => {
        // Fetches submissions for the form when the component mounts or when 'formId' changes
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/form/${formId}/answers`, {
                    withCredentials: true,
                });
                setSubmissions(response.data); // Sets the fetched data to state
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, [formId]);

    const handleEdit = (answerId) => {
        setEditId(answerId); // Sets the 'editId' to enable editing for the answer
    };

    const handleSave = async (answerId, updatedAnswer) => {
        try {
            if (typeof answerId !== 'number') {
                console.error('Error: The answer ID provided is not a number.');
                return;
            }
    
            const response = await axios.put(`http://localhost:4000/api/form/answers/${answerId}`, updatedAnswer, {
                withCredentials: true,
            });
    
            if (response.status === 200) {
                setSubmissions(submissions.map((ans) =>
                    ans.answer_id === answerId ? { ...ans, ...updatedAnswer } : ans
                ));
                setEditId(null); // Resets 'editId' to null to exit edit mode
            } else {
                console.error('Failed to update the answer. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error updating submission:', error);
        }
    };
    

    return (
        <div className='mt-5'>
            <h2>Submissions for Form {formId}</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Question ID</th>
                        <th>Answer</th>
                        <th>Edit</th> {/* Removed 'Form ID' column as it's redundant */}
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((answer) => (
                        answer.answer_id === editId ?
                            <EditableRow answer={answer} onSave={handleSave} key={answer.answer_id} />
                            :
                            <tr key={answer.answer_id}>
                                <td>{answer.supervised_user_id}</td>
                                <td>{answer.question_id}</td>
                                <td>{answer.answer_text || answer.question_option_id}</td>
                                <td>
                                    <button onClick={() => handleEdit(answer.answer_id)}>Edit</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const EditableRow = ({ answer, onSave }) => {
    const [updatedAnswer, setUpdatedAnswer] = useState({
        answer_text: answer.answer_text,
        question_option_id: answer.question_option_id
    });

    const handleSubmit = () => {
        onSave(answer.answer_id, updatedAnswer);
    };

    return (
        <tr>
            <td>{answer.supervised_user_id}</td>
            <td>{answer.question_id}</td>
            <td>
                <input
                    type="text"
                    value={updatedAnswer.answer_text || ''}
                    onChange={(e) => setUpdatedAnswer({ ...updatedAnswer, answer_text: e.target.value })}
                    style={{ display: updatedAnswer.question_option_id ? 'none' : 'block' }}
                />
                <input
                    type="number"
                    value={updatedAnswer.question_option_id || ''}
                    onChange={(e) => setUpdatedAnswer({ ...updatedAnswer, question_option_id: Number(e.target.value) })}
                    style={{ display: updatedAnswer.question_option_id ? 'block' : 'none' }}
                />
            </td>
            <td>
                <button onClick={handleSubmit}>Save</button>
            </td>
        </tr>
    );
};

export default Submissions;
