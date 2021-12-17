import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router';
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function BetsList() {

    const { id, id2 } = useParams();
    const [data, setData] = useState([]);
    const [car, setCar] = useState([]);

    let userRoles = localStorage.getItem("roles");

    if(userRoles === null)
    {
        userRoles = "Svečias";
    }

    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fetchCar(countryid, carid);
        fetchBets(countryid, carid);
    }, [countryid, carid])

    async function fetchBets(countryid, carid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid + '/bet')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchCar(countryid, carid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid)
        setCar(JSON.parse(JSON.stringify(result.data)));
    }

    if (car === undefined) {
        return <></>
    }

    return (
        <div>
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>{car.make} {car.model} bets list</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        {
                            userRoles.includes("Buyer") ?
                                <>
                                    <Link to={"/AddBet/" + countryid + '/' + carid} ><Button variant='success' size='sm' className='my-1'>Add bet</Button></Link>

                                </>
                                :
                                <>
                                </>
                        }
                        <Link to={"/CarList/" + countryid} ><Button variant='danger' size='sm' className='my-1 m-1'>Back to list</Button></Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Bet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.betting_price}</td>
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