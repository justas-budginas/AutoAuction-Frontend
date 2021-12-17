import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function UpdateCountry(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()
    
    const { id } = useParams();
    let jid = JSON.parse(JSON.stringify(id))

    const [data, setData] = useState([])
    const [name, setName] = useState([])
    

    useEffect(() => {
        fetchCountry(jid);
    }, [jid])

    async function fetchCountry(jid) {
        let result = await axios.get('http://localhost:5000/api/country/' + jid)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function updateCountry(e) {
        e.preventDefault()

        let details = {name}
        let json = JSON.stringify(details);

        await axios.put('http://localhost:5000/api/country/' + jid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/CountryList")
            })
            .catch(error => {
                console.log(error.response.data);
            });

    }

    return (
        <div className="App">
            <Header />
            <Container>
                <Form onSubmit={updateCountry}>
                    <h2>Edit country</h2>
                    <br />
                    <div className="col-sm-6 offset-sm-3">
                        <fieldset>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={data.name} className="form-control" required />
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Change</Button>
                        </fieldset>
                    </div>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}
