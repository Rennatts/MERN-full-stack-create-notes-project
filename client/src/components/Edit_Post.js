import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import './css/Edit_post.css';


export class Edit_Post extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            titleOfThePost: "",
            textOfThePost: "",
            data: new Date(),
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/api/posts/' +this.props.match.params.id)
        .then(response => {
          this.setState({
            titleOfThePost: response.data.titleOfThePost,
            textOfThePost: response.data.textOfThePost,
            date: new Date(response.data.date)
          })   
        })
        .catch(function (error) {
          console.log(error);
        })

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

        const post = {
            titleOfThePost: this.state.titleOfThePost,
            textOfThePost: this.state.textOfThePost,
            date: this.state.date
        }

        console.log(post);

        axios.post('http://localhost:5000/api/posts/update/' +this.props.match.params.id, post)
        .then(res=> console.log(res.data));


        window.location = "/";

    }


    render() {
        return (
            <div className="container">
                <div className="main_container">
                    <h2 className="create_post">Edit Note</h2>

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
                                value="Submit Note"
                                className="btn">
                                </input>
                            </div>
                        </form>
               </div>
            </div>

        )
    }
}

export default Edit_Post