import axios from "axios";
import { useState } from "react";
import Header from "../partner/header";
import './login.css'
import {useNavigate ,
    useHistory,
    useLocation} from 'react-router-dom';

export default function Login(){
    const [username,setUsername]= useState("");
    const [password,setPassword] = useState("");
    const [jwt,setJwt] = useState("");
    const [message,setMessage]=useState("");
    function loginForm(e){
        e.preventDefault()
        let check = true
        if(!password){
            check = false
            setMessage("Chưa điền password !!!")
        }
        if(!username){
            check = false
            setMessage("Chưa điền trường username !!!")
        }
        if(check == true){
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signin',
                data: {
                  username: username,
                  password: password
                }
              })
              .then((response) => {
                   
                    console.log(response)
                    setJwt(response.data.accessToken)
                    localStorage.setItem("token",response.data.accessToken)
                    localStorage.setItem("username",response.data.username)
                    window.location.href = "http://localhost:3000/"
              }, (error) => {
                setMessage("Tài khoản hoặc mật khẩu không chính xác !!!");
              });
        }  
       
    }
    return (
        <div>
            <div class="container mt-5 d-flex justify-content-center row">  
                <div className="col-5">
                    <div>
                        <h3>Login</h3>
                    </div>
                    <div className="row">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            {/* <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div> */}
                            <div className="form-group">
                                <small id="emailHelp" class="form-text text-muted">{message}</small>
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={loginForm}>Login</button>
                        </form>
                     </div>
                </div>
            </div>
        </div>
    );
}