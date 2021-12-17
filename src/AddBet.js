import React, { useState, useEffect, useMemo } from 'react'
import Header from './Header'
import { Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function AddBet() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const { id, id2 } = useParams();
    const [betting_price, setBetting_Price] = useState(0);
    const navigate = useNavigate()
    const [lastbet, setLastBet] = useState(0);
    const [car, setCar] = useState();

    let countryid = JSON.parse(JSON.stringify(id))
    let carid = JSON.parse(JSON.stringify(id2))

    useEffect(() => {
        fetchCar(countryid, carid);
    }, [countryid, carid])

    useMemo(()=>{
        if(car !== undefined)
        {
            fetchBet(countryid, carid,car);
        }
        
    }, [countryid, carid, car])

    async function fetchCar(countryid, carid) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid)
        let resultjson = JSON.parse(JSON.stringify(result.data))
        setCar(resultjson);
    }

    async function fetchBet(countryid, carid, car) {
        let result = await axios.get('http://localhost:5000/api/country/' + countryid + '/car/' + carid + '/bet')
        let resultjson = await JSON.parse(JSON.stringify(result.data))
        if(resultjson.length > 0)
        {
            await setLastBet(resultjson[resultjson.length-1].betting_price+1);
            await setBetting_Price(resultjson[resultjson.length-1].betting_price+1)
        }else{
            await setLastBet(car.starting_price+1)
            await setBetting_Price(car.starting_price+1)
        }
        
    }

    if(lastbet === undefined)
    {
        return <></>
    }

    if(car === undefined)
    {
        return <></>
    }

    async function addBet(e) {
        e.preventDefault();

        console.log(betting_price)

        let details = { betting_price }
        let json = JSON.stringify(details);

        await axios.post('http://localhost:5000/api/country/' + countryid + '/car/' + carid + '/bet' , json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/BetsList/"+ countryid + '/' + carid)
            })
            .catch(error => {
                //setErrorMessage(error.response.data);
                console.log(error)
            });
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <h2>Add bet for {car.make} {car.model}</h2>
                    <br />
                    <Form onSubmit={addBet}>
                        <fieldset>
                            <input type="number" min={lastbet} defaultValue={lastbet}  value={betting_price} onChange={(e) => setBetting_Price(e.target.value)} className="form-control" placeholder="Price" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Add</button>
                            <Link to={"/BetsList/" + countryid + '/' + carid} ><Button variant='danger' className='my-1 m-1'>Back to list</Button></Link>
                        </fieldset>
                    </Form>

                </div>
            </Container>
            <Footer />
        </div>
    )
}