import React, { useEffect, useState, useMemo } from 'react'
import Header from './Header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import Footer from './Footer';

export default function MyBets() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [data, setData] = useState([]);

    useEffect(() => {
    })

    useMemo(()=>{
        fetchBets();
        // eslint-disable-next-line
    }, [])

    async function fetchBets() {
        let result = await axios.get('http://localhost:5000/api/bets/' + localStorage.getItem("id"))
        let json = await JSON.parse(JSON.stringify(result.data));
        let count = 0
        await json.forEach(e=>
                fetchCar(e.countryid, e.carid).then(r=> {
                    e.make = r.make
                    e.model = r.model
                    count++
                    if(count === json.length)
                    {
                        setData(json)
                    }
                })
            )
    }

    if(data === undefined)
    {
        return <></>
    }


     function fetchCar(countryid, carid) {
        let result = axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid).then(r=>JSON.parse(JSON.stringify(r.data)))
        return result
    }

    async function deleteBet(countryid, carid, betid) {
        let url = 'http://localhost:5000/api/country/' + countryid + "/car/" + carid + "/bet/" + betid;
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchBets();
    }

    return (
        <div className="">
            <Header />
            <Container>
                <br />
                <h2 style={{ textAlign: "center" }}>My bets</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Make</th>
                                <th style={{ textAlign: "center" }}>Model</th>
                                <th style={{ textAlign: "center" }}>Bet</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td style={{ verticalAlign: "middle" }} >{item.make}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.model}</td>
                                        <td style={{ verticalAlign: "middle" }} >{item.betting_price}</td>
                                        <td style={{ verticalAlign: "middle" }} width={'19%'}>
                                            <div className='text-center'>
                                                <Button variant="danger" size="sm" onClick={() => deleteBet(item.countryid, item.carid, item.id)}>Delete</Button>
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
