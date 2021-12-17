import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function CountryList() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCountrys();
    }, [])

    async function deleteCountry(id) {
        let url = 'http://localhost:5000/api/country/' + id;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchCountrys();
    }

    async function fetchCountrys() {
        let result = await axios.get('http://localhost:5000/api/country')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <h2>Country management</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        <Link to={"/AddCountry"} ><Button variant='success' size='sm' className='my-1'>Add country</Button></Link>
                        <br />
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Country</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={"/updatecountry/" + item.id}><Button variant="info" size="sm">Edit</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteCountry(item.id)}>Delete</Button>
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
