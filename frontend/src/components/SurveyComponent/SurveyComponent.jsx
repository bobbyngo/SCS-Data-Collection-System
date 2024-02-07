import React, { useState } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const SurveyComponent = ({ formId, onBack, isEditModeEnabled }) => {
  const surveyForms = {
    'form1': {
      title: "Client Survey",
      pages: [
        {
          questions: [
            {
              type: "text",
              name: "name",
              title: "Preferred name",
              isRequired: false
            },
            {
              type: "radiogroup",
              name: "gender",
              title: "Self-identified gender reported by client",
              isRequired: true,
              choices: ["Male", "Female", "Other", "Prefer not to say"]
            },
            {
              type: "checkbox",
              name: "substanceConsumed",
              title: "Substance consumed",
              isRequired: true,
              choices: [
                "Cocaine", 
                "Crack", 
                "Methamphetamine", 
                "Amphetamine",
                "Heroin", 
                "Fentanyl", 
                "Oxycontin/Oxycodone", 
                "Morphine",
                "Hydromorphone/Dilaudid", 
                "Unspecified opioid", 
                "Speedball", 
                "Other substance",
                "Unknown/Unspecified"
              ]
            },
            {
              type: "dropdown",
              name: "overdoseEvent",
              title: "Overdose event",
              isRequired: true,
              choices: [
                "Non-fatal",
                "Fatal",
                "None"
              ]
            }
          ]
        }
      ]
    },
    'form2': {
      title: "Sample Survey",
      pages: [
        {
          questions: [
            {
              type: "text",
              name: "favoriteColor",
              title: "What is your favorite color?",
              isRequired: true
            },
            {
              type: "radiogroup",
              name: "likesCoffee",
              title: "Do you like coffee?",
              isRequired: true,
              choices: ["Yes", "No"]
            },
            {
              type: "checkbox",
              name: "hobbies",
              title: "Select your hobbies",
              choices: ["Reading", "Gaming", "Traveling", "Cooking"]
            }
          ]
        }
      ]
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableSurveyJSON, setEditableSurveyJSON] = useState(surveyForms[formId] || {});

  const toggleEditMode = () => {
    if (isEditModeEnabled) {
      setIsEditMode(!isEditMode);
    }
  };

  const handleSurveyJSONChange = (event) => {
    try {
      setEditableSurveyJSON(JSON.parse(event.target.value));
    } catch (error) {
      console.error("Invalid JSON", error);
    }
  };

  const onSurveyComplete = (survey) => {
    console.log("Survey results: ", survey.data);
    // Handle survey completion here
  };

  return (
    <div>
      <button onClick={onBack}>Back</button>
      {isEditModeEnabled && (
        <button onClick={toggleEditMode}>
          {isEditMode ? "Save" : "Enter Edit Mode"}
        </button>
      )}

      {isEditMode ? (
        <textarea
          value={JSON.stringify(editableSurveyJSON, null, 2)}
          onChange={handleSurveyJSONChange}
          style={{ width: '100%', height: '300px', marginTop: '10px' }}
        />
      ) : (
        <Survey.Survey
          model={new Survey.Model(editableSurveyJSON)}
          onComplete={onSurveyComplete}
        />
      )}
    </div>
  );
};

export default SurveyComponent;