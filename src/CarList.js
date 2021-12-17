import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function CarList() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [country, setCountry] = useState([]);

    let countryid = JSON.parse(JSON.stringify(id))
    let userRoles = localStorage.getItem("roles");

    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    useEffect(() => {
        fetchCountry(countryid);
        fetchCars(countryid);
    }, [countryid])

    async function fetchCars(countryid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchCountry(countryid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid)
        setCountry(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>{country.name}'s list</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("Seller") ?
                                <>
                                    <Link to={"/AddCar/" + countryid} ><Button variant='success' size='sm' className='my-1'>Add car</Button></Link>
                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/ChooseCountry"} ><Button variant='danger' size='sm' className='my-1 m-1'>Back to list</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th key="photo"></th>
                                <th key="make">Make</th>
                                <th key="model">Model</th>
                                <th key="fuel">Fuel type</th>
                                <th key="litrage">Litrage</th>
                                <th key="price">Price</th>
                                <th key="actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <div className='text-center'>
                                            <td><img className='img_car_list' src={"http://localhost:5000/" + item.carImage} alt="Car" key="{1*item.id}" /></td>
                                        </div>
                                        <td style={{ verticalAlign: "middle" }} key="{2*item.id}">{item.make}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{3*item.id}">{item.model}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{4*item.id}">{item.fuel_type}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{5*item.id}">{item.litrage}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{6*item.id}">{item.price}</td>
                                        <td style={{ verticalAlign: "middle" }} key="{7*item.id}">
                                            <div className='text-center'>
                                                <Link to={"/BetsList/" + item.countryId + '/' + item.id}><Button variant="success" size="sm">Bets</Button></Link>
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
