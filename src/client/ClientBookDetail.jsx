import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser'
import Header from '../partner/header'
import './clientBookDetail.css'
import axios from "axios"
import { useParams } from 'react-router-dom'
export default function(){
    const [book,setBook] = useState("")
    const [ratings,setRatings] = useState("")
    const [comment,setComment] = useState(null)
    const [star,setStar] = useState(null)
    const [img,setImg] = useState("")
    const [err,setErr] = useState("")
    const [message,setMessage] = useState("")
    const [count,setCount] = useState("1")
    let { id } = useParams();
    function linkImg(img) {
        let url = "http://localhost:8080/api/files/"+img;
        return url;
    }
    function getStar(ratings){
        // let total = 0
        // let avg = 0
        // // ratings.forEach(rating =>{
        // //     total+=rating.star;
        // // })
        // return total
        // console.log("rating",ratings)
        console.log("1")
    }
    
    function test(rating){
        let res = ""

        for(let i=1;i<=parseInt(rating.star);i++){
            res+="<span class='fa fa-star checked'></span>";                       
        }
        for(let i=parseInt(rating.star)+1;i<=5;i++){    
            res+="<span class='fa fa-star'></span>";                         
        }
        return res;
    }
    function submitForm(e){
        e.preventDefault()
        let check = true
       
        if(!comment){
            setErr("Bạn chưa đưa ra nhận xét !!!")
            check = false
        }
        if(!star){
            setErr("Bạn chưa đưa ra đánh giá !!!")
            check = false
        }
        if(check==true){
            let bodyFormData = new FormData();
            bodyFormData.append("comment",comment)
            bodyFormData.append("star",star)
            axios({
                method: 'post',
                url:`http://localhost:8080/api/book/${id}/comments`, 
                data: bodyFormData,
                headers: { 
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                console.log(response)
                window.location.href = `http://localhost:3000/book/${id}`
            })
            .catch(err => console.log(err))
        }
    }
    function chooseStar(e){
        var x = parseFloat(e.target.dataset.star)
        var liStars = document.getElementsByClassName("star")
        for (let item of liStars) {
            if(item.classList.contains("selected"))
            item.classList.remove("selected")
        }
        for (let item of liStars) {
            if(parseFloat(item.dataset.star)<=x)
            item.classList.add("selected")
        }
        setStar(x)
        
    }
    function addToCart(){
        if(localStorage.getItem("cart")){
            let cart = JSON.parse(localStorage.getItem("cart"))
            if(count<1){
                setMessage("Số lượng không hợp lệ")
            }
            else {
                let check = false
                cart.forEach(product => {
                    if(product.book.id == book.id){
                        check = true
                        product.quantity = String(parseInt(product.quantity)+parseInt(count));
                        console.log(product)
                    }
                })
                if(check == true){
                    localStorage.setItem("cart",JSON.stringify(cart))
                }
                else {
                    cart.push({
                        "book":book,
                        "quantity":count
                    })
                    localStorage.setItem("cart",JSON.stringify(cart))
                }
                
                // console.log(JSON.stringify(cart))
            }
        }
        else {
            let cart = []
            let product = {
                "book":book,
                "quantity":count
            }
            cart.push(product)
            localStorage.setItem("cart",JSON.stringify(cart))
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/api/book/'+id)
        .then(data => 
          {
            setBook(data.data.data)
            // console.log(data.data.data)
            setImg(`http://localhost:8080/api/files/${data.data.data.imageFeatureBooks[0].url}`)
          })
        .catch(err => console.log(err))

        axios.get(`http://localhost:8080/api/book/${id}/comments`)
        .then(data => 
          {
            setRatings(data.data.data)
            // console.log(data.data.data)
          })
        .catch(err => console.log(err))
    },[]);
    return (
        <div class="container mt-5">
        <div class="row">
         <div class="col-6">
             <img class="img" src={img} alt=""/>
         </div>
         <div class="col-6">
             <div class="info-part row">
                <div className="d-flex">
                    <h4 class="title text-truncate mr-3">{book.title}</h4>
                    <h4 class="title text-truncate">{book.author}</h4>
                </div>
             </div>
             <div class="info-part row">
                 <div className="d-flex">
                    <div class="rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div class="qlt ml-3">
                        {ratings.length} đánh giá
                    </div>
                 </div>
             </div>
             <div class="info-part row mt-3">
                 <div class="type-book">
                     {book.typeBook}
                 </div>
             </div>
             <div class="info-part row mt-1">
                 <div class="mr-3">
                     <input type="date" value={book.dateRelease}/>
                 </div>
                 <div className='mt-1'>
                     {book.totalPage} trang
                 </div>
             </div>
             <div class="info-part row mt-1">
                    <div class="text-justify des">
                        {book.description}
                    </div>
             </div>
             <div class="row">
                 <div className="d-flex">
                    <div class="mr-3 col-2">
                        <input type="number"  onChange={e => setCount(e.target.value)} class="form-control" min={0}/>
                        
                    </div>
                    <button class="btn btn-success" onClick={addToCart} data-toggle="modal" data-target={`#exampleModal${book.id}`}>Add to cart</button>
                    <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add to cart</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Add to cart successfull
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
        </div>
        <div class="row mt-5">
             <div class="col">
                 <div class="row">
                    <div className='alert alert-primary'>
                            Review History
                    </div>
                 </div>
                {
                    ratings && ratings.map(rating => {
                        return (
                            <div class="row mt-2">
                            <div class="col">
                                <div className="row">
                                    <div className="d-flex pl-0">
                                       <div class="col-1 pl-0">{rating.user.username}</div> 
                                       <div class="rating">
                                            {
                                                parse(test(rating))
                                            }
                                           {/* <span class="fa fa-star checked"></span>
                                           <span class="fa fa-star checked"></span>
                                           <span class="fa fa-star checked"></span>
                                           <span class="fa fa-star"></span>
                                           <span class="fa fa-star"></span> */}
                                       </div>
                                    </div>
                                </div>
                                <div class="row pt-0 pb-0">
                                   <div class="col-6 pl-0 pt-0 pb-0">
                                        {rating.comment}
                                   </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
                 <div class="row pl-0 mt-3">
                    <div className='alert alert-warning'>Comment Section</div>
                    <div>{err}</div>
                     <form  id="usrform" className="pl-0">
                         <ul class="ratings">
                             <li class="star" onClick={chooseStar} data-star = "5"></li>
                             <li class="star" onClick={chooseStar} data-star = "4"></li>
                             <li class="star" onClick={chooseStar} data-star = "3"></li>
                             <li class="star" onClick={chooseStar} data-star = "2"></li>
                             <li class="star" onClick={chooseStar} data-star = "1"></li>
                           </ul>
                         <textarea rows="4" cols="70" name="comment" form="usrform" onChange={e=>setComment(e.target.value)}></textarea>
                         <br></br>
                         <button class="btn btn-success" onClick={submitForm}>
                             Comment
                         </button>
                     </form>
                 </div>
             </div>
        </div>
     </div>
    )
}