import React, { useState, useEffect } from 'react';
import './form.css';
import axios from "axios";

const getForms = () => {
    axios
      .get("http://localhost:4000/api/form/all")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

  };


const Forms = () => {
    getForms();
    return ;
}


export default Forms;
