import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import Logo from './logo.svg'
import axios from 'axios'

export default function Header() {

    const navigate = useNavigate()
    let username = localStorage.getItem('username')

    let userRoles = localStorage.getItem("roles");

    const [errorMessage, setErrorMessage] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    function checkEmail() {
        let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        if (re.test(email)) {
            setValidEmail(true);
        }
        else {
            setErrorMessage("Invalid email")
            setValidEmail(false)
        }
    }


    // Modal login
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function signIn() {

        checkEmail();
        if (validEmail === false) {
            return false
        }

        let details = { email, password }
        let json = JSON.stringify(details)

        await axios.post('http://localhost:5000/api/login', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                let user = JSON.parse(JSON.stringify(response.data))
                localStorage.setItem("access-token", user.accesToken)
                localStorage.setItem("refresh-token", user.refreshToken)
                localStorage.setItem("username", user.username)
                localStorage.setItem("roles", user.roles)
                localStorage.setItem("id", user.userid)
                handleCloseLogin()
                navigate("/")
            })
            .catch(function (error) {
                if (error.response) {
                    console.warn(error.response.data);
                    setErrorMessage(error.response.data);
                }
            })
    }

    // -------------------------- //

    /*** Modal register ***/

    const [userName, setUsername] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [type, setType] = useState("Buyer")


    async function signUp() {

        checkEmail();
        if (validEmail === false) {
            return false
        }

        let details = { userName, name, surname, email, password, type }
        let json = JSON.stringify(details)

        await axios.post('http://localhost:5000/api/register', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                handleCloseRegister()
                signIn();
                navigate("/")
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            })
    }

    // -------------------------- //


    function Logout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/' className='logo'><img style={{ width: 80 }} className='filter-lightgray' src={Logo} alt="Logo" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/ChooseCountry' className='link'>Car List</Link></Nav.Link>
                            {
                                localStorage.getItem('access-token') ?
                                    <>
                                        <Nav className="">
                                        </Nav>
                                        {
                                            userRoles.includes("Admin") ?
                                                <>
                                                    <NavDropdown
                                                        className="link"
                                                        menuVariant='dark'
                                                        title={<span className="usernamecolor">Admin panel</span>}>
                                                        <NavDropdown.Item><Link to='/CountryList' className='link'>Country List</Link></NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        <NavDropdown.Item><Link to='/CarList' className='link'>Car List</Link></NavDropdown.Item>
                                                    </NavDropdown>
                                                </>
                                                :
                                                <>
                                                </>
                                        }


                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </Nav>
                        {
                            localStorage.getItem('access-token') ?
                                <></>
                                :
                                <>
                                    <Nav className="mr-auto">
                                        <Nav.Link className='link' onClick={handleShowLogin}>Login</Nav.Link>
                                        <Nav.Link className='link' onClick={handleShowRegister}>Register</Nav.Link>
                                    </Nav>
                                </>
                        }

                        {
                            localStorage.getItem('access-token') ?
                                <>
                                    <Nav>
                                        <NavDropdown
                                            className="usernamecolor"
                                            title={<span className="usernamecolor">{username && username}</span>}
                                            menuVariant="dark"
                                        >
                                            {
                                                userRoles.includes("Seller") ?
                                                <>
                                                    <NavDropdown.Item><Link to="/OwnerCarList" className='link'>My cars</Link></NavDropdown.Item>
                                                </>
                                                :
                                                <></>
                                            }

                                            {
                                                userRoles.includes("Buyer") ?
                                                <>
                                                    <NavDropdown.Item><Link to="/MyBets" className='link'>My Bets</Link></NavDropdown.Item>
                                                </>
                                                :
                                                <></>
                                            }
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                                :
                                null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <>
                <Modal show={showLogin} onHide={handleCloseLogin} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <label htmlFor='email'>Email:</label>
                            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                            <br />
                            <label htmlFor='password'>Password:</label>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                            <br />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signIn}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <>
                <Modal show={showRegister} onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                        <Form>
                            <fieldset>
                                <label htmlFor='username'>Username:</label>
                                <input type="text" id='username' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
                                <br />
                                <label htmlFor='name'>Name:</label>
                                <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required />
                                <br />
                                <label htmlFor='surname'>Surname:</label>
                                <input type="text" id='surname' value={surname} onChange={(e) => setSurname(e.target.value)} className="form-control" placeholder="Surname" required />
                                <br />
                                <label htmlFor='email'>Email:</label>
                                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                                <br />
                                <label htmlFor='password'>Password:</label>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                                <br />
                                <Form.Label as="legend" className='text-center'>
                                    Account type
                                </Form.Label>
                                <div key={'inline-radio'} className="mb-3 text-center">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Buyer"
                                        name="buyer"
                                        id="buyer"
                                        value="Buyer"
                                        defaultChecked
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Seller"
                                        name="buyer"
                                        id="seller"
                                        value="Seller"
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>
                            </fieldset>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={signUp}>
                            Register
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div >
    )
}
