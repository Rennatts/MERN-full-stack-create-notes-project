import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/create_post.css';

export default class CreatePost extends Component{
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            titleOfThePost: "",
            textOfThePost: "",
            date: new Date(),
        }
    }

    onChangeTitle(e) {
        this.setState({
            titleOfThePost: e.target.value
        });
    }

    onChangeText(e){
        this.setState({
            textOfThePost: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const posts = {
            titleOfThePost: this.state.titleOfThePost,
            textOfThePost: this.state.textOfThePost,
            date: this.state.date
        }

        console.log(posts);

        axios.post('http://localhost:5000/api/posts/add', posts)
        .then(res=> console.log(res.data));


        window.location = "/";
    }


    render() {
        return (
            <div className="container">
                <div className="main_container">
                    <h2 className="create_post">Create a Post</h2>

                        <form className="main_form"onSubmit={this.onSubmit}>
                            <div className="form">
                                <label>Title: </label>
                                <input
                                    type="text"
                                    className="input-form"
                                    value={this.state.titleOfThePost}
                                    onChange={this.onChangeTitle}>
                                </input>
                            </div>

                            <div className="form">
                                <label>Text: </label>
                                <textarea
                                    type="text"
                                    className="input-text"
                                    value={this.state.textOfThePost}
                                    onChange={this.onChangeText}>
                                </textarea>
                            </div>


                            <div className="form_date">
                                <label>Date:</label>
                                <div classaName="input-form">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}>
                                    </DatePicker>
                                </div>
                            </div>

                            <div className="form">
                                <input
                                type="submit"
                                value="Create Post"
                                className="btn">
                                </input>
                            </div>
                        </form>
               </div>
            </div>

        )
    }

}