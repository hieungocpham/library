import axios from "axios";
import { useState } from "react";
export default function SignUp(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const [message,setMessage]=useState("");
    const roles = ["user"];
    function signUpForm(e){
        e.preventDefault();
        let check = true
        if(!password){
            check = false
            setMessage("Chưa điền password !!!")
        }
        if(!email){
            check = false
            setMessage("Chưa điền email !!!")
        }
        if(!username){
            check = false
            setMessage("Chưa điền trường username !!!")
        }
        if(check == true) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signup',
                data: {
                  username: username,
                  password: password,
                  roles: roles,
                  email: email
                }
              })
              .then((response) => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/login"
              })
              .catch( error => {
                setMessage("Đăng ký không thành công !!!!");
            });
        }
        
    }
    return (
        <div>
            <div className="container row mt-5 d-flex justify-content-center">
                <div className="col-5">
                    <h3>Sign up</h3>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input type="text" class="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <small id="emailHelp" class="form-text text-muted">{message}</small>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={signUpForm}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}