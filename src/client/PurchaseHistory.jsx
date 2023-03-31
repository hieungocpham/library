import { useState } from 'react';
import { useEffect } from 'react'
import './purchaseHistory.css'
import axios from 'axios';
export default function(){
    function getStatus(status){
        switch (status) {
            case "INIT":
                return "Create order"
            case "DELAY":
                return "Delay order"
            case "CONFIRM":
                return "Confirm order"
            case "COMPELETE":
                return "Compelete order"
        }

    }
    const [carts, setCarts] = useState("")
    useEffect(()=>{
    axios({
        method: 'get',
        url: 'http://localhost:8080/api/orders',
        headers: { 
            "Authorization":"Bearer "+localStorage.getItem("token")
        }})
        .then(data => {
            setCarts(data.data.data.reverse())
            console.log(data.data.data)
        })
        .catch(err => console.log(err));
    },[])
    return (
        <div class="container mt-5">
        <div class="card-wrapper container row">
            <div class="col">
                {/* <div class="card-customer row">
                    <div class="col-2">
                        <img class="img-product" src="data:image/jpeg;base64,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" alt=""/>
                    </div>
                    <div class="col-5 ml-3 pl-0">
                        <div class="row pl-0">
                            <div className="d-flex pl-0">
                                <p>Tieu de</p>
                                <span>-</span>
                                <p>Tac gia</p>
                            </div>
                        </div>
                        <div class="row text-justify ">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </div>
                    </div>
                    <div class="col-1 ml-2">
                        <p className='text-center'>
                            Quantity
                        </p>
                        <p className='text-center'>
                            12
                        </p>
                    </div>
                    <div class="col">
                        <p>
                            Status
                        </p>
                        <p>
                            <div className="btn btn-success">
                                Delay
                            </div>
                        </p>
                    </div>
                    <div class="col">
                        <p>
                            Time
                        </p>
                        <p>
                            <div className="">
                                20/12/2022
                            </div>
                        </p>
                    </div>
                </div> */}
                {
                   carts && carts.map(cart => {
                        let orders = cart.orders
                        return orders.map(order => {
                            return (
                                <div class="card-customer row mt-2">
                                    <div class="col-2">
                                        <img class="img-product" src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`} alt=""/>
                                    </div>
                                    <div class="col-4 ml-3 pl-0">
                                        <div class="row pl-0">
                                            <div className="d-flex pl-0">
                                                <p>{order.book.title}</p>
                                                <span>-</span>
                                                <p>{order.book.author}</p>
                                            </div>
                                        </div>
                                        <div class="row text-justify ">
                                            {order.book.description}
                                        </div>
                                    </div>
                                    <div class="col-1 ml-2">
                                        <p className='text-center font-weight-bold'>
                                            Quantity
                                        </p>
                                        <p className='text-center'>
                                            {order.quantity}
                                        </p>
                                    </div>
                                    <div class="col">
                                        <p className='font-weight-bold'>
                                            Status
                                        </p>
                                        <p>
                                            <div className="btn btn-success">
                                                {getStatus(order.status)}
                                            </div>
                                        </p>
                                    </div>
                                    <div class="col">
                                        <p className='font-weight-bold'> 
                                            Initialization time
                                        </p>
                                        <p>
                                            <div className="">
                                                {cart.date}
                                                {/* <input autocomplete="off" type="datetime-local" id="meeting-time" name="meeting-time" value={cart.date}/> */}
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                   })
                }
            </div>
        </div>
    </div>
    )
}