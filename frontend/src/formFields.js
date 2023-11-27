const formFields = [
  {
    name: "firstName",
    placeholder: "First Name",
    initialValue: "",
    maxLength: 15,
    required: false
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    initialValue: "",
    maxLength: 20,
    required: false
  },
  {
    name: "age",
    placeholder: "Age",
    initialValue: "",
    required: true,
    type: "number",
    minAge: 18
  },
  {
    name: "phoneNumber",
    placeholder: "Phone Number",
    initialValue: "",
    required: false
  },
  {
    name: "dateOfVisit",
    placeholder: "Date of Visit",
    initialValue: "",
    required: true,
    type: "date"
  },
  {
    name: "timeOfVisit",
    placeholder: "Time of Visit",
    initialValue: "",
    required: true,
    type: "time"
  },
  {
    name: "locationOfVisit",
    placeholder: "Location of Visit",
    initialValue: "",
    required: true,
    type: "select",
    options: ["Location 1", "Location 2", "Location 3", "Location 4", "Location 5"]
  },
  {
    name: "substanceUsed",
    placeholder: "Substance Used",
    initialValue: "",
    required: true
  },
  {
    name: "amountOfSubstanceUsed",
    placeholder: "Amount of Substance Used (with unit)",
    initialValue: "",
    required: true
  },
  {
    name: "medicalAidNeeded",
    placeholder: "Medical Aid Needed?",
    initialValue: false,
    required: false,
    type: "checkbox"
  },
  {
    name: "overdose",
    placeholder: "Overdose",
    initialValue: false,
    required: false,
    type: "checkbox"
  }
];

export default formFields;
