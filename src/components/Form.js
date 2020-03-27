import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().min(2, "Name must be atleast 2 characters long").required("Name is required"),
    special: yup.string()

});

export default function Form(props) {
    
}