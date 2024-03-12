import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormDetail = () => {
    const { formId } = useParams(); // Get the formId from the URL params
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/form/${formId}/question/all`,
                {
                    withCredentials: true,
                }
            );
            //console.log(response.data);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, [formId]); // Fetch questions whenever formId changes

    return (
        <div className='mt-5'>
            <h2>Questions for Form {formId}</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.question_id}>{question.question_text}</li>
                ))}
            </ul>
        </div>
    );
};

export default FormDetail;
