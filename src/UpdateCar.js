import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

export default function UpdateCar(props) {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()

    const { id, cid } = useParams();
    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(cid))
    

    const [data, setData] = useState([])
    const [year, setYear] = useState()
    const [fuel_type, setFueltype] = useState()
    const [litrage, setLitrage] = useState()
    
    useEffect(() => {
        fetchCar(countryid, carid);
    }, [countryid, carid])

    async function fetchCar(countryid, carid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid)
        setData(JSON.parse(JSON.stringify(result.data)));
        setYear(JSON.parse(JSON.stringify(result.data.year)));
        setFueltype(JSON.parse(JSON.stringify(result.data.fuel_type)));
        setLitrage(JSON.parse(JSON.stringify(result.data.litrage)));
    }

    async function updateCar(e) {
        e.preventDefault()

        let details = { year, fuel_type, litrage }
        let json = JSON.stringify(details);

        await axios.put('http://localhost:5000/api/country/' + countryid + '/car/' + carid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/CarList/" + countryid)
            })
            .catch(error => {
                
            });

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <h2>Edit car</h2>
                <br />
                <div className="col-sm-4 offset-sm-4">
                    <div style={{ textAlign: 'left' }}>
                        <b>Make: </b> {data.make}
                        <br />
                        <b>Model: </b> {data.model}
                    </div>
                    <Form onSubmit={updateCar}>
                        <fieldset>
                        <label htmlFor='year'>Year:</label>
                            <input type="date" name='year' value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Year" required />
                            <br />
                            <label htmlFor='fueltype'>Fuel Type:</label>
                            <select name="fueltype" value={fuel_type} onChange={(e) => setFueltype(e.target.value)} className="form-control" required>
                                <option value="diesel">Diesel</option>
                                <option value="gasoline">Gasoline</option>
                                <option value="gasolinelpg">Gasoline/LPG</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                            <br />
                            <label htmlFor='litrage'>Litrage:</label>
                            <select name="litrage" value={litrage} onChange={(e) => setLitrage(e.target.value)} className="form-control" required>
                                <option value="0.8">0.8</option>
                                <option value="1.0">1.0</option>
                                <option value="1.1">1.1</option>
                                <option value="1.2">1.2</option>
                                <option value="1.4">1.4</option>
                                <option value="1.5">1.5</option>
                                <option value="1.6">1.6</option>
                                <option value="1.7">1.7</option>
                                <option value="1.8">1.8</option>
                                <option value="1.9">1.9</option>
                                <option value="2.0">2.0</option>
                                <option value="2.1">2.1</option>
                                <option value="2.2">2.2</option>
                                <option value="2.3">2.3</option>
                                <option value="2.4">2.4</option>
                                <option value="2.5">2.5</option>
                                <option value="2.6">2.6</option>
                                <option value="2.7">2.7</option>
                                <option value="2.8">2.8</option>
                                <option value="3">3.0</option>
                                <option value="4">4.0</option>
                                <option value="5">5.0</option>
                                <option value="8">8.0</option>
                            </select>
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Change</Button>
                        </fieldset>
                    </Form>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
