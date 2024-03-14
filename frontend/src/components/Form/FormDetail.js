import React, { useState, useEffect } from 'react';
import FormQuestion from './FormQuestion';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const FormDetail = (props) => {
    let { state } = useLocation();
    const formName = state.form;
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
            <h2 className='survey-header'>{formName}</h2>
            <FormQuestion questions={questions} />
        </div>
    );
};

export default FormDetail;
