import {useState} from "react";
import {Form, Button} from "react-bootstrap";

export const Signup = () => {
    const [form ,setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [passwordShown, setPasswordShown] = useState(false)

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        })

        if(!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })

    }
    // const [newUser, setNewUser] = useState(null)
    // const [isLoading, setIsLoading] = useState(false)

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }


    const validateForm = () => {
        const {firstName, lastName, email, password, confirmPassword} = form
        const newErrors = {}

        if(!firstName || firstName ==='')newErrors.firstName = 'Please enter your first name'
        if(!lastName || lastName === '')newErrors.lastName = 'please enter your last name'
        if(!email || email === '')newErrors.email = 'Please enter a valid email address: yourname@example.com'
        if(!password || password === '')newErrors.password  = 'please enter your password'
        if(!confirmPassword || confirmPassword !== password)newErrors.confirmPassword = 'please enter confirm your password again, make sure they are same'
        return newErrors
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            console.log('registration success')
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        console.log(form)

    }


// const handleConfirmationSubmit = async evt => {
//         evt.preventDefault()
//         setIsLoading(true)
// }

        return (
            <>
                <div className="col_2">
                    <div className="log-box">
                        <legend>
                            <h2>Register</h2>
                        </legend>

            <Form>
                <div className="form-row">
                <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                        className={!!errors.firstName && 'red-border'}
                        type="text"
                        value = {form.firstName}
                        onChange={(evt) => setField('firstName', evt.target.value)}
                    ></Form.Control>
                    <div className="error-msg">{errors.firstName}</div>
                </Form.Group>
                <Form.Group size="lg" controlId="lastName">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                        className={!!errors.firstName && 'red-border'}
                        type="text"
                        value={form.lastName}
                        onChange={(evt) => setField('lastName', evt.target.value)}
                     ></Form.Control>
                        <div className="error-msg">{errors.lastName}</div>
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        className={!!errors.email && 'red-border'}
                        type="email"
                        value={form.email}
                        onChange={(evt) => setField('email', evt.target.value)}
                        ></Form.Control>
                    <div className="error-msg">{errors.email}</div>
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                        className={!!errors.password && 'red-border'}
                        type={passwordShown?"text":"password"}
                        value={form.password}
                        onChange={(evt) => setField('password', evt.target.value)}
                    ></Form.Control>
                    <div className="error-msg">{errors.password}</div>
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control
                        className={!!errors.confirmPassword && 'red-border'}
                        type="password"
                        value={form.confirmPassword}
                        onChange={(evt) => setField('confirmPassword', evt.target.value)}
                    ></Form.Control>
                    <div className="error-msg">{errors.confirmPassword}</div>
                </Form.Group>
                    <br></br>
                <Button
                    variant="danger"
                    type="submit"
                    // isLoading={isLoading}
                    onClick={handleSubmit}>
                    Register
                </Button>
            </div>
            </Form>
                    </div>
                </div>
              </>
         )
}

