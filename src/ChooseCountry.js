import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table, Container} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function ChooseCountry() {

    const [countrys, setCountrys] = useState([]);

    useEffect(() => {
        fetchCountrys();
    }, [])

    async function fetchCountrys() {
        let result = await axios.get('http://localhost:5000/api/country')
        setCountrys(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <br />
                <h2 >Choose country</h2>
                <div className="col-sm-6 offset-sm-3">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                countrys.map((item) =>
                                    <tr>
                                        <td><Link to={"/CarList/"+item.id} className='link'>{item.name}</Link></td>
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