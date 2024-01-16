import './MainPageStyling.css';
import { titleStyling } from '../helperFiles/generalStyling';
import  React from "react";
import IsLoggedIn from '../helperFiles/isLoggedIn';

import NavBar from '../helperFiles/navBar';
import ItemRenderer from '../itemRender/itemRenderer';
import { mockItems } from '../helperFiles/mockData';
import axios from "axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line

function MainPage() {
  IsLoggedIn();

  // const mockItemsArray = mockItems

  //Get request for getting all the tags
  let [items, setItems] = useState([]);
  useEffect(() => {
      let currentEmail = JSON.parse(window.localStorage.getItem("email"));
      axios.get(process.env.REACT_APP_DATABASE_URL + '/test/get_all_item/'+currentEmail).then(resp => {
      console.log(resp.data);

      //gets the tags in the form of a useable array
      let data = JSON.stringify(resp.data);
      let itemArr = JSON.parse(data);
      setItems(itemArr);
      });
  }, []);

  /*
  email: "bilsl1994@gmail.com"
image_url: "/image/get_image/undefined"
itemLoanedTo: "NoOne"
itemLocation: "cabinet"
itemName: "jeans"
itemStatus: "LOAN"
tags: []
  */

  return (
    <>
      <div className="NavBar" >
        <NavBar />
          <div className='Centre'>
            <p style={titleStyling}>
              Item Location Tracker
            </p>
          </div>
            <div className="Right">
            </div>
      </div>
      <div>
        <ItemRenderer items={items}/>
      </div>
    </>
  );
}

export default MainPage;
