import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function CarListOwner() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCars();
    }, [])

    async function fetchCars() {
        let result = await axios.get('http://localhost:5000/api/cars/' + localStorage.getItem("id"))
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function deleteCar(countryid, carid) {
        let url = 'http://localhost:5000/api/country/' + countryid + "/car/" + carid;
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchCars();
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>Car list</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}></th>
                                <th style={{ textAlign: "center" }}>Make</th>
                                <th style={{ textAlign: "center" }}>Model</th>
                                <th style={{ textAlign: "center" }}>Fuel type</th>
                                <th style={{ textAlign: "center" }}>Litrage</th>
                                <th style={{ textAlign: "center" }}>Price</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td><img className='img_car_list' src={"http://localhost:5000/" + item.carImage} alt="Car" /></td>
                                        <td style={{ verticalAlign: "middle" }} >{item.make}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.model}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.fuel_type}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.litrage}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.price}</td>
                                        <td style={{ verticalAlign: "middle" }}  width={'19%'}>
                                            <div className='d-inline'>
                                                <Link to={"/updatecar/" + item.countryId + '/' + item.id}><Button variant="info" size="sm">Edit</Button></Link>{' '}
                                                <Button variant="danger" size="sm" onClick={() => deleteCar(item.countryId, item.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
