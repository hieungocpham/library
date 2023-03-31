import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './clientListBook.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default function({itemsPerPage}){
    const [books,setBooks] = useState([]);
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [idDelete,setIdDelete] = useState(null)
    const [username,setUsername] = useState(null);
    useEffect(()=>{
        setUsername(localStorage.getItem("username"))
        axios.get('http://localhost:8080/api/books')
        .then(data => {
            setBooks(data.data.reverse())
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(data.data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(data.data.length / itemsPerPage));
        })
        .catch(err => console.log(err));
    },[itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    function linkImg(name) {
        let url = "http://localhost:8080/api/files/"+name;
        return url;
    }
    function Items({ currentItems }){
        return (
            <div class="d-flex flex-wrap">
                {
                    currentItems && currentItems.map(book =>{
                        return (
                            <div class="card col-3" key={book.id}>
                                <img class="card-img-top" src={linkImg(book.imageFeatureBooks[0].url)} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">{book.title}</h5>
                                    <p class="card-text"><small class="text-muted">{book.author}</small></p>
                                    <Link to={`book/${book.id}`} class="btn btn-primary">Show more</Link>
                                </div>
                            </div>
                        )
                    })
                }
             </div> 
        )
    }
    return <div class="container mt-5">
                {/* <div>
                    List books
                </div> */}
                <Items currentItems={currentItems} />
                <div className="mt-3"></div>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
}