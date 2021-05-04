import React, {Component} from 'react';
import axios from 'axios';
import './css/notes.css';
import {Link} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';




export default class Notes extends Component {
    constructor(props){
        super(props);

        this.state= {
            posts: [],
        }
    };

    componentDidMount() {
        this.getPost();
    };


    getPost = () => {
        axios.get('http://localhost:5000/api/posts')
        .then((res)=>{
            const data= res.data;
            this.setState({posts: data});
            console.log("Data has been received");
            console.log(data);
        })
        .catch(()=> {
          alert("error retriving data");
        });
    }
    
   
    
    displayPost = (posts) => {

        if(!posts.length) return null;

        return posts.map((post, index)=> (
        <div key={index} className="post_display">
            <h2>{post.titleOfThePost}</h2>
            <p className="date">{post.date}</p>
            <button><Link to={"/edit/" + post._id}>Edit</Link></button>
            <button><a href="#" onClick={()=> {this.deletePost(post._id)}}>Delete</a></button>
            <ReadMoreReact
            classNam="read_more"
            text={post.textOfThePost}
            min={20}
            ideal={30}
            max={200}
            readMoreTex="Read More"></ReadMoreReact>
        </div>
        ));
    }

    deletePost(id) {
        axios.delete('http://localhost:5000/api/posts/delete_post/' + id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          posts: this.state.posts.filter(post => post._id !== id)
        })
    }



    render() {
        console.log('state: ', this.state)
        return(
            <div>
                <div className="post_container">
                {this.displayPost(this.state.posts)}
                </div>
                    
            </div>

        );
    }

}