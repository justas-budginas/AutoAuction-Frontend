import React, { useState } from 'react'
import Header from './Header'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router';
import Footer from './Footer';

export default function AddCar() {

    const navigate = useNavigate()

    const initialFueltype = () => {
        const value = "Diesel";
        return value;
    };

    const initialLitrage = () => {
        const value = "0.8";
        return value;
    };

    const { id } = useParams();
    let countryid = JSON.parse(JSON.stringify(id))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [make, setMake] = useState()
    const [model, setModel] = useState()
    const [year, setYear] = useState()
    const [fueltype, setFueltype] = useState(initialFueltype)
    const [litrage, setLitrage] = useState(initialLitrage)
    const [sprice, setSprice] = useState()
    const [photo, setPhoto] = useState()

    async function addCar(e) {
        e.preventDefault()
        //console.log(make, model, year, fueltype, litrage, sprice, photo)
        const formData = new FormData();
        formData.append("Make", make);
        formData.append("Model", model);
        formData.append("Year", year);
        formData.append("Fuel_type", fueltype);
        formData.append("Litrage", parseFloat(litrage))
        formData.append("Starting_price", sprice);
        formData.append("CarImage", photo);

        await axios.post('http://localhost:5000/api/country/' + countryid + '/car', formData)
            .then(response => {
                let result = JSON.parse(JSON.stringify(response.data))
                console.log(result);
                navigate("/CarList/"+countryid)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <Header />
            <br />
            <div className="col-sm-6 offset-sm-3">
                <h2>AddCar</h2>
                <br />
                <Container>
                    <Form onSubmit={addCar}>
                        <fieldset>
                            <label htmlFor='make'>Make:</label>
                            <input type="text" name='make' value={make} onChange={(e) => setMake(e.target.value)} className="form-control" placeholder="Make" required />
                            <br />
                            <label htmlFor='model'>Model:</label>
                            <input type="text" name='model' value={model} onChange={(e) => setModel(e.target.value)} className="form-control" placeholder="Model" required />
                            <br />
                            <label htmlFor='year'>Year:</label>
                            <input type="date" name='year' value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Year" required />
                            <br />
                            <label htmlFor='fueltype'>Fuel Type:</label>
                            <select name="fueltype" defaultValue={fueltype} onChange={(e) => setFueltype(e.target.value)} className="form-control" required>
                                <option value="diesel">Diesel</option>
                                <option value="gasoline">Gasoline</option>
                                <option value="gasolinelpg">Gasoline/LPG</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                            <br />
                            <label htmlFor='litrage'>Litrage:</label>
                            <select name="litrage" defaultValue={litrage} onChange={(e) => setLitrage(e.target.value)} className="form-control" required>
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
                                <option value="3.0">3.0</option>
                                <option value="4.0">4.0</option>
                                <option value="5.0">5.0</option>
                                <option value="8.0">8.0</option>
                            </select>
                            <br />
                            <label htmlFor='price'>Starting price:</label>
                            <input type="number" min='1' name='price' value={sprice} onChange={(e) => setSprice(e.target.value)} className="form-control" placeholder="Starting price" required />
                            <br />
                            <label htmlFor='photo'>Choose photo</label>
                            <input type='file' className='form-control' placeholder='Photo' accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Add</button>
                            <Link to={"/CarList/"+countryid} ><Button variant='danger' className='my-1 m-1'>Back to list</Button></Link>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div >
    )
}
