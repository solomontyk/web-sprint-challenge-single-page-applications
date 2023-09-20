import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
    name:'',
    size:'',
    sauce:'',
    specialInstructions:'',
    cheese: false,
    mushrooms: false,
    peppers: false,
    jalepeno: false,
    pepperoni: false,
}

const initialPizzaOrder = []

const emptyFormValues = {
    name:'',
    size:'',
    sauce:'',
    specialInstructions:'',
    cheese: false,
    mushrooms: false,
    peppers: false,
    jalepeno: false,
    pepperoni: false,
};

const emptyErrors = {
    name:'',
    size:'',
    sauce:'',
    specialInstructions:'',
    cheese: '',
    mushrooms: '',
    peppers: '',
    jalepeno: '',
    pepperoni: '',
}

function pizzaForm() {
    const [pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [validName, setValidName] = useState(true)
    const [errors, setErrors] = useState(emptyErrors)
    const newOrderPost = newOrder => {
        axios.post('https://reqres.in/api/orders', newOrder)
        .then(res => {
            setPizzaOrder([...pizzaOrder, res.data])
            console.log(pizzaOrder)
        })
        .catch(err => {
            console.log(`Please try again! ${err}`)
        })
        setFormValues(initialFormValues)
    }
}

const [newPizza, setNewPizza] = useState([]);

const handleSubmit = (evt) => {
    axios
    .post('https://reqres.in/api/orders', formValues)
    .then(
        (res) => setNewPizza([res.data, ...newPizza]),
        setFormValues(emptyFormValues)
    )
    .catch((err) => console.log(err));
};

const  formSchema = yup.object().shape({
    name: yup
    .string()
        .trim()
        .min(2, 'name must be at last 2 characters'),
        size: yup
        .string()
        .oneOf(['Small', 'Medium', 'Large'], 'Select a size'),
        cheese: yup
        .boolean(),
        pepperoni: yup
        .boolean(),
        peppers: yup
        .boolean(),
        jalepeno: yup
        .boolean(),
        mushrooms: yup
        .boolean(),
        specialInstructions: yup
        .string()
})

const validate = (name,value) => {
    yup
    .reach(formSchema, name)
    .validate(value)
    .then(() => {
        setErrors({ ...errors, [name]: ''});
    })
    .catch((err) => setErrors({ ...errors, [name]: err.errors[0]}));
};

const inputChange = (name, value) => {
    setFormValues({
        ...formValues,
        [name]: value
    })
}
const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name,value);
    setFormValues({...formValues, [name]: value });
};

const formSubmit = () => {
    const newPizzaOrder = {
        name:formValues.name,
        size: formValues.size,
        sauce: formValues.sauce.trim(),
        specialInstructions: formValues.specialInstructions.trim(),
        toppings: ['cheese', 'pepperoni', 'peppers', 'mushrooms', 'jalepeno'].filter(topping => formValues[topping])
    }
    newOrderPost(newPizzaOrder)
}

const onChange = evt => {
    const {name, value, checked, type} = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    inputChange(name, valueToUse)
}

const onSubmit = evt => {
    evt.preventDefault()
    formSubmit()
}

useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {});
}, [formValues]);

return (
    <div>
        <h3>Build Your Own Pizza!</h3>
        <form onSubmit={onSubmit}
        id='pizza-form'
        submit={handleSubmit}
        change={handleChange}
        >
            <label>
                Name:
                <input 
                type='text'
                id='name-input'
                name='name'
                value={formValues.name}
                onChange={handleChange}
            />
            </label>
            <h5>{errors.name}</h5>
            <label>Size Choice
                <div>
                    <select id='size-dropdown' name='size' onChange={onChange}>
                        <option value=''>Select Size</option>
                        <option value='s'>Small</option>
                        <option value='m'>Medium</option>
                        <option value='l'>Large</option>
                    </select>

                </div>
        
        </label>

        <h3>Add Toppings</h3>
        <label>Cheese
            <input
            type='checkbox'
            name='cheese'
            checked={formValues.cheese}
            onChange={onChange}
            />
            </label>
            <label> Pepperoni
            <input
            type='checkbox'
            name='cheese'
            checked={formValues.pepperoni}
            onChange={onChange}
            />
            </label>
            <label>Peppers
            <input
            type='checkbox'
            name='cheese'
            checked={formValues.peppers}
            onChange={onChange}
            />
            </label>
            <label>Jalepeno
            <input
            type='checkbox'
            name='cheese'
            checked={formValues.jalepeno}
            onChange={onChange}
            />
            </label>
            <label>Mushrooms
            <input
            type='checkbox'
            name='cheese'
            checked={formValues.mushrooms}
            onChange={onChange}
            />
            </label>

            <h3>Any Special Instructions or Requests?</h3>
            <input
            value={formValues.specialInstructions}
            onChange={onChange}
            name='specialInstructions'
            id='special-text'
            type='text'
            />
            <br></br>
            <button className="submit" id="order-button">submit</button>
        </form>

        </div>

)

export default Form;