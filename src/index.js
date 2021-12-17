import {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Header.css'
import './index.css';

import AddCar from './AddCar'
import UpdateCar from './UpdateCar'
import CountryList from './CountryList'
import Protected from './Protected'
import NotFound from './NotFound'
import AddCountry from './AddCountry';
import UpdateCountry from './UpdateCountry';
import CarList from './CarList';
import ChooseCountry from './ChooseCountry';
import CarListOwner from './CarListOwner'
import BetsList from './BetsList';
import AddBet from './AddBet'
import MyBets from './MyBets'
import CarListAdmin from './CarListAdmin'


render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/404" element={<NotFound />} />

        <Route path="/choosecountry" element={<ChooseCountry />} />
        <Route path="/carlist/:id" element={<CarList />} />
        <Route path="/addcar/:id" element={<Protected cmp={AddCar} role={"Seller"}/>} />
        <Route path="/ownercarlist" element={<Protected cmp={CarListOwner} role={"Seller"}/>} />
        <Route path="/updatecar/:id/:cid" element={<Protected cmp={UpdateCar} role={"Seller"}/>} />

        <Route path="/betslist/:id/:id2" element={<BetsList />} />
        <Route path="/addbet/:id/:id2" element={<Protected cmp={AddBet} role={"Buyer"}/>} />
        <Route path="/mybets" element={<Protected cmp={MyBets} role={"Buyer"}/>} />

        <Route path="/countrylist" element={<Protected cmp={CountryList} role={"Admin"}/>} />
        <Route path="/addcountry" element={<Protected cmp={AddCountry} role={"Admin"}/>} />
        <Route path="/updatecountry/:id" element={<Protected cmp={UpdateCountry} role={"Admin"}/>} />
        <Route path="/carlist" element={<Protected cmp={CarListAdmin} role={"Admin"}/>} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
