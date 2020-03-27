import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().min(2, "Name must be atleast 2 characters long").required("Name is required"),
    whiteSauce: yup.boolean(),
    redSauce: yup.boolean(),
    pizzaSize: yup.string(),
    redOnions: yup.boolean(),
    jalapenos: yup.boolean(),
    chicken: yup.boolean(),
    pepperoni: yup.boolean(),
    garlic: yup.boolean(),
    special: yup.string()

});

export default function Form(props) {
    const [formState, setFormState] = useState({
        name: "",
        whiteSauce: "",
        redSauce: "",
        pizzaSize: "",
        redOnions: "",
        jalapenos: "",
        chicken: "",
        pepperoni: "",
        garlic: "",
        special: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        whiteSauce: "",
        redSauce: "",
        pizzaSize: "",
        redOnions: "",
        jalapenos: "",
        chicken: "",
        pepperoni: "",
        garlic: "",
        special: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [post, setPost] = useState([]);


    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = event => {
        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            })
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };
    const formSubmit = e => {
        e.preventDefault();

        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log(res);
                setPost(res.data); // get just the form data from the REST api
                console.log("success", post);
                setFormState({
                    name: "",
                    whiteSauce: "",
                    redSauce: "",
                    pizzaSize: "",
                    redOnions: "",
                    jalapenos: "",
                    chicken: "",
                    pepperoni: "",
                    garlic: "",
                    special: ""
                });
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                      <input id="name" type="text" name="name" value={formState.name} onChange={inputChange} />
                    {errors.name.length > 2 ? <p className="error">{errors.name}</p> : null}
                </label>

                <h1 class="bigger"> Sauce: </h1>
                <label class="bigger">
                    White
            <input type="checkbox" name="whiteSauce" onChange={inputChange} checked={null} />
            Red
            <input type="checkbox" name="redSauce" onChange={inputChange} checked={null} />

                </label>
                <div>
                    <label htmlFor="pizzaSize">
                        <h2> What size pizza would you like? </h2>
                        <select id="pizzaSize" name="pizzaSize" onChange={inputChange}>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Extra Large">Extra Large</option>
                        </select>
                    </label>
                </div>
                <div>
                    <h1>Pick your toppings </h1>
                    <label>
                        Red Onions
    <input
                            name="redOnions"
                            type="checkbox"
                            checked={formState.redOnions}
                            onChange={inputChange} />
                    </label>
                    <label>
                        Jalapenos
    <input
                            name="jalapenos"
                            type="checkbox"
                            checked={formState.jalapenos}
                            onChange={inputChange} />
                    </label>
                    <label>
                        Chicken
    <input
                            name="chicken"
                            type="checkbox"
                            checked={formState.chicken}
                            onChange={inputChange} />
                    </label>
                    <label>
                        Pepperoni
    <input
                            name="pepperoni"
                            type="checkbox"
                            checked={formState.pepperoni}
                            onChange={inputChange} />
                    </label>
                    <label>
                        Garlic
    <input
                            name="garlic"
                            type="checkbox"
                            checked={null}
                            onChange={formState.garlic} 
                            value="yes"/>
                    </label>
                    <label htmlFor="special">
                        <h2>Special Instructions?</h2>
                        <input id="special" type="special" name="special" value={formState.special} onChange={inputChange} />
                        {errors.special.length > 0 ? <p className="error">{errors.special}</p> : null}
                    </label>
                </div>

                <button name="order">Add to Order</button>
            </form>
            <div>
                <h1>Order Details</h1>

                <pre>{JSON.stringify(post, null, 2)}</pre>
            </div>
        </div>

    );





}