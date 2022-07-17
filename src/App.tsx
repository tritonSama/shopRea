import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  let custName = "";
  let custPrice = 0;
  let custItem = "";

  const[customers, setCustomer] = useState([
    {
    name: "",
    email: "",
    price: 0,


  }
])

function updateCustName(e: React.ChangeEvent<HTMLInputElement>) {
  custName = e.target.value;
  // console.log(custName);

}

function updateCustItem(e: React.ChangeEvent<HTMLInputElement>) {
  custItem = e.target.value;

}

function updateCustPrice(e: React.ChangeEvent<HTMLInputElement>) {
  custPrice = +e.target.value;
}

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();


  fetch('http://slipstream-env.eba-djivmhme.us-east-2.elasticbeanstalk.com/api/Customer/AddCustomer', {
    method: 'POST',
    headers: {
      'Accept': ' application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        name: custName,
        price: custPrice,
        items: custItem
      })
  });
}


  useEffect(() => {
    fetch("http://slipstream-env.eba-djivmhme.us-east-2.elasticbeanstalk.com/Customer/GetAllCustomer")
    .then(Response => Response.json())
    .then(customers => {
      setCustomer((previousData) => customers)

    })

  }, []) 
  return (
    <div className="App">
      <ul>
        {customers.map(customer => <li>{customer.name}</li>)}
      </ul>
      <div>
        <form>
          <div>
            <label>Customer name</label>
            <input type="text" name="custName" onChange={updateCustName}></input>
          </div>
          <div>
            <label>Customer total</label>
            <input type="number" name="custPrice" onChange= {updateCustPrice}></input>
          </div>
          <div>
            <label>Customer items</label>
            <input type="text" name="custItems" onChange= {updateCustItem}></input>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
