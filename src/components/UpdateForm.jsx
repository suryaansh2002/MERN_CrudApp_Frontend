import React, { Component } from "react";
import axios from 'axios';
import MyToast from './MyToast.jsx'

import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";


class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id:"",
      title: "",
      author: props.cookie.user.username,

      content: "",
      views:"",
      date:"",
      show:false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }
  componentDidMount(){
    const postId=window.location.pathname.slice(5)
    console.log(postId)
    if(postId){
      axios
      .get("https://crud-server-jwpup3fpm-suryaansh2002.vercel.app/posts/"+postId)
      .then((response) => {
        this.setState({ 
          _id: response.data._id,
          title: response.data.title,
          author:response.data.author,
          content: response.data.content,
          views: response.data.views,
          date: response.data.date,


         });
         //console.log(this.state)
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }

  handleChange = e =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }



 
handleSubmit = e =>{
  e.preventDefault();
  const blog={
    _id: this.state._id,
    title: this.state.title,
    author: this.state.author,
    content: this.state.content,
    views: this.state.views,
    date: this.state.date,

  }
//  console.log(this.state)
  axios.patch('https://crud-server-jwpup3fpm-suryaansh2002.vercel.app/posts/'+this.state._id , blog)
  .then((response) => {
    console.log(response);
    if(response.data !== null){
      this.setState({"show":true});
     
      setTimeout(()=>
      this.setState({"show":false}),
      2000
      );
    }else{
      this.setState({"show":false})

    }
  })
  .catch((error) => {
    console.log(error);
  });
}
handleReset = e=>{
  this.setState({
    _id:"",
    title: "",
    author: "",
    content: "",
  }
  )
}
  render() {
    const { title, author, content, views } = this.state;

    return (
      <div className="main">
      <Container className="text-center">
      <div style={{"display":this.state.show ? "block":"none"}}>
          <MyToast children={{show:this.state.show, message:"Post Updated Successfully",type:"success"}}>

          </MyToast>
        </div>

      <Container className="text-center header">
        Update Post
      </Container>
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <Row className="row">
            <Col md xs={3}></Col>
            <Col md xs={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  id="title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Blog Title"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="row2">
            <Col md xs={3}></Col>

            <Col md xs={6}>
              <FloatingLabel controlId="floatingInput" label="Author">
                <Form.Control
                  type="text"
                  placeholder="Author Name"
                  id="author"
                  name="author"
                  value={this.props.cookie.user.username}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="row2">
            <Col md xs={3}></Col>

            <Col md xs={6}>
              <FloatingLabel controlId="floatingTextarea" label="Content">
                <Form.Control
                  as="textarea"
                  placeholder="Blog Content"
                  style={{ height: "100px" }}
                  id="content"
                  name="content"
                  value={content}
                  onChange={this.handleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="row2">
            <Col md xs={3}></Col>

            <Col md xs={6}>
              <FloatingLabel controlId="floatingInput" label="Views">
                <Form.Control
                  type="number"
                  placeholder="Views"
                  id="views"
                  name="views"
                  value={views}
                  onChange={this.handleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>


          <Button type="submit" variant="success" className="mar">
            Update
          </Button>
          <Button type="reset" variant="primary" className="mar">
            Reset
          </Button>
        </Form>
      </Container>
      
    </div>
    )   
  }
}

export default UpdateForm;
