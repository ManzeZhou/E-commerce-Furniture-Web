import {useEffect, useState} from "react";
import NavBar from "../navBar/NavBar";
import "./AddressInfo.scss"
import {useNavigate} from "react-router-dom";
import CheckBoxOutlineBlankTwoToneIcon from '@mui/icons-material/CheckBoxOutlineBlankTwoTone';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {googleAutoComplete} from "./googleAutoComplete";
import {useForm} from "react-hook-form";

export const AddressInfo = () => {
    // let addressInfo = {
    //     fullName: '',
    //     email: '',
    //     phoneNumber: '',
    //     address: '',
    //     city: '',
    //     province: '',
    //     postalCode: '',
    //     country: '',
    // }
    // let addressMsg = JSON.parse(localStorage.getItem('addressInfo'))


    // const [formData, setFormData] = useState(
    //     addressMsg ? addressMsg : addressInfo
    // )

    const navigate = useNavigate()

    const {register,handleSubmit,control, formState:{errors}} = useForm()
    const onSubmit = (formData) => {
        console.log(formData)
        localStorage.setItem('addressInfo', JSON.stringify(formData))
        navigate('/payment')
    }

    // const changeHandler = (e) => {
    //     let name = e.target.name
    //     let value = e.target.value
    //
    //          setFormData( (currentState) => {
    //              return{...currentState, [name]:value}
    //
    //         })
    //      localStorage.setItem('addressInfo', JSON.stringify(formData))
    // }

    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')


    useEffect(() => {
        googleAutoComplete(setStreet,  setCity, setProvince, setPostalCode, setCountry)
    }, [street])

    // const navigate = useNavigate()
    //
    //
    // const [complete, setComplete] = useState(true)

    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     // localStorage.setItem('addressInfo', JSON.stringify(formData))
    //     let addressInfoArr = Object.values(formData)
    //     let addressMsg = Object.values(formData)
    //     console.log('addressMsg:localstorage',addressMsg)
    //     console.log('formData', formData)
    //     console.log('addressInfoArr',addressInfoArr)
    //     console.log(addressInfoArr.includes(''))
    //
    //     addressInfoArr.includes('') ? setComplete(false) : navigate('/payment')
    // }

    // const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon']
    const [checked, setChecked] = useState(false)

    return (
        <>
            <NavBar/>
            <h1 className="edit-address">Please Edit Your Shipping Address</h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label >Full Name</label>
                    <input {...register("fullName", {required: true})} placeholder="Enter your Name"/>
                    <p>{errors.fullName?.message}</p>

                    <label>Email</label>
                    <input {...register("email", {required: true})} placeholder="Enter your email"/>
                    <p>{errors.email?.message}</p>

                    <label>Phone Number</label>
                    <input {...register("phoneNumber", {required: true})} placeholder="Enter your phone number"/>
                    <p>{errors.phoneNumber?.message}</p>

                    <label>Address</label>
                    <input id="autoComplete" {...register("street", {required: true})} placeholder="Enter your address"
                           onChange={(evt) => {setStreet(evt.target.value)}}
                           value={street}
                    />

                    <label>City</label>
                    <input id="city" {...register("city", {required: true})}
                           value={city}
                           onChange={(evt) => setCity(evt.target.value)}/>

                    <label>Province/Territory</label>
                    <select id="province" {...register("province")}value={province} onChange={(evt) => {setProvince(evt.target.value)}}>
                        {/*{*/}
                        {/*    provinces.map((province, index) => {*/}
                        {/*        return (*/}
                        {/*            <option value={province}*/}
                        {/*                    key={index}*/}
                        {/*                    name={province}*/}
                        {/*                    id={province}*/}
                        {/*            >*/}
                        {/*                {province}*/}
                        {/*            </option>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                        <option value="AB">Alberta</option>
                        <option value="ON">Ontario</option>
                        <option value="BC">British Columbia</option>
                        <option value="QC">Quebec</option>
                        <option value="MA">Manitoba</option>
                    </select>

                    <label>Postal Code</label>
                    <input id="postalCode" {...register("postalCode", {required: true})}
                           value={postalCode}
                           onChange={(evt) => {setPostalCode(evt.target.value)}}
                           required
                    />

                    <label>Country/Region</label>
                    <input id="country" {...register("country", {required: true})}
                           value={country}
                           onChange={(evt) => {setCountry(evt.target.value)}}
                           required
                    />

                <p className="default-address">
                    <span className='icon' onClick={() => setChecked(!checked)}>
                        {checked? <CheckBoxRoundedIcon/> : <CheckBoxOutlineBlankTwoToneIcon/>}
                    </span>
                    Make this my default address
                </p>
                <p>Delivery instructions (optional)</p>
                <p className="add-preferences">
                    <span>
                        <ArrowRightIcon/>
                    </span>
                    Add preferences, note, access codes and more
                </p>

                <div className="continue-to-payment">
                {/*    <div className={complete? "complete-form" : "complete-form active"}>*/}
                {/*        <ReportProblemIcon/>*/}
                {/*        <span className="complete-word">Please complete the form</span>*/}
                {/*    </div>*/}
                    <button type="submit">Continue to payment</button>
                </div>
        </form>
            </div>
        </>
            )
}