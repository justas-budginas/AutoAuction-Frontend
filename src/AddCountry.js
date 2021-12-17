import React, { useState } from 'react'
import { Container, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

import Header from './Header'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

export default function AddCountry() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate()

    const [name, setName] = useState("")

    async function addCountry(e) {
        e.preventDefault();

        let details = {name}
        let json = JSON.stringify(details);

        await axios.post('http://localhost:5000/api/country', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/CountryList")
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            });
    }

    return (
        <div className="App">
            <Header />
            <br />
            <div className="col-sm-6 offset-sm-3">
                <h2>Add country</h2>
                <br />
                {errorMessage && <Alert variant="danger"> {errorMessage} </Alert>}
                <Container>
                    <Form onSubmit={addCountry}>
                        <fieldset>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Country" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-primary">Add</button>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div>
    )
}
