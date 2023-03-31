import Header from "../partner/header";
import { useState,useEffect } from "react";
import axios from "axios";

export default function AddBook(){
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [dateRelease,setDateRealse] = useState("");
    const [totalPage,setTotalPage] = useState("");
    const [typeBook,setTypeBook] = useState("");
    const [files,setFiles] = useState("");
    const [img,setImg]= useState("")
    const [err,setErr]= useState("")
    function previewFiles(e) {
        setFiles(e.target.files)
        setImg(URL.createObjectURL(e.target.files[0])); 
    }
    function submitForm(e){
        let check = true
        if(!files){
            check = false
            setErr("Chưa điền upload ảnh !!!")
        }
        if(!totalPage){
            check = false
            setErr("Chưa điền trường tổng số trang !!!")
        }
        if(!dateRelease){
            check = false
            setErr("Chưa điền trường ngày ra mắt !!!")
        }
        if(!description){
            check = false
            setErr("Chưa điền trường mô tả !!!")
        }
        if(!author){
            check = false
            setErr("Chưa điền trường tác giả !!!")
        }
        if(!title){
            check = false
            setErr("Chưa điền trường tiêu đề !!!")
        }
        e.preventDefault();
        let bodyFormData = new FormData();
        if(check == true){
            bodyFormData.append("title",title);
            bodyFormData.append("author",author);
            bodyFormData.append("description",description);
            bodyFormData.append("dateRelease", dateRelease);
            bodyFormData.append("totalPage",totalPage);
            bodyFormData.append("typeBook",typeBook);
            for(let i = 0;i< files.length;i++){
                bodyFormData.append("files",files[i]);
            }
            
            console.log(bodyFormData.entries,files)
            axios({
                method: 'post',
                url:'http://localhost:8080/api/book/insert', 
                data: bodyFormData,
                headers: { 
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                console.log(response)
                window.location.href = "http://localhost:3000/admin"
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div class="wrapper-tpl">
                {/* <Header></Header> */}
                <div class="container mt-5">
                    <div class="title">
                        <h3> Add book</h3>
                    </div>
                    <div className="err">
                            {err}
                    </div>
                    {/* <form class="row mt-4">
                        <div class="col-4">
                            <div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Title</label>
                                    <input onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Author</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter author" onChange={(e)=>setAuthor(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Type of book</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter type of book" onChange={(e)=>setTypeBook(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Total page</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Total page" onChange={(e)=>setTotalPage(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Date release</label>
                                    <input type="date" class="form-control" id="exampleInputPassword1" placeholder="" onChange={(e)=>setDateRealse(e.target.value)}/>
                                </div>
                            
                                <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="mb-3">
                                <label for="validationTextarea">Description</label>
                                <textarea class="form-control is-invalid"  id="validationTextarea" placeholder="Required description" required onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="validatedCustomFile" multiple onChange={(e)=>setFiles(e.target.files)} required/>
                                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                                <div class="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                        </div>
                    </form> */}
                    <form class="mt-5">
                        <div class="wrapper row">
                            <div class="left col-6">
                                <div class="row d-flex justify-content-between">
                                    <div class="col-5">
                                        <label for="exampleInputEmail1">Title</label>
                                        <input onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                    </div>
                                    <div class="col-5">
                                        <label for="exampleInputEmail1">Author</label>
                                        <input onChange={(e)=>setAuthor(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div className="col-12">
                                    <label for="validationTextarea">Description</label>
                                    <textarea class="form-control is-invalid"  id="validationTextarea" placeholder="Required description" required onChange={(e)=>setDescription(e.target.value)} rows="10"></textarea>
                                    </div>
                                </div>
                                <div class="row d-flex justify-content-between mt-2">
                                    <div class="col-5">
                                        <label for="exampleInputPassword1">Date release</label>
                                        <input type="date" class="form-control" id="exampleInputPassword1" placeholder="" onChange={(e)=>setDateRealse(e.target.value)}/>
                                    </div>
                                    <div class="col-5">
                                        <label for="exampleInputPassword1">Total page</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Total page" onChange={(e)=>setTotalPage(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label for="exampleInputPassword1">Type of book</label>
                                        <select class="custom-select custom-select-lg mb-3" placeholder="Enter type of book" onChange={(e)=>setTypeBook(e.target.value)}>
                                            <option selected value="Giải trí">Giải trí</option>
                                            <option value="Học Tập">Học tập</option>
                                            <option value="Khoa học">Khoa học</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="right col-6">
                                <label for="exampleInputPassword1">Upload image</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="validatedCustomFile" multiple onChange={previewFiles} required/>
                                    <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                                    <div class="invalid-feedback">Example invalid custom file feedback</div>
                                </div>
                                <div id="preview">
                                    <img src={img} alt="" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}