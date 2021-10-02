import React, { Component } from "react";
import axios from "axios";
import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import MyToast from './MyToast.jsx'
class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: props.cookie.user.username,
      content: "",
      show:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("https://suryaansh-crud.herokuapp.com/posts", this.state)
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
      this.setState({
        title: "",
      author: "",
      content: "",
      })
  };
  handleReset = (e) => {
    this.setState({
      title: "",
      author: "",
      content: "",
    });
  };
  render() {
    const { title, author, content } = this.state;
    return (
       <div className="main">
        <Container className="text-center">
        <div style={{"display":this.state.show ? "block":"none"}}>
          <MyToast children={{show:this.state.show, message:"Post Added Successfully",type:"success"}}>

          </MyToast>
        </div>
        <Container className="text-center header">
          Add A New Post
        </Container>
          <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <Row className="row">
              <Col md xs={3}></Col>
              <Col md xs={6}>
                <FloatingLabel
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
                <FloatingLabel  label="Author">
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
                <FloatingLabel label="Content">
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

            <Button type="submit" variant="success" className="mar">
              Submit
            </Button>
            <Button type="reset" variant="primary" className="mar">
              Reset
            </Button>
          </Form>
        </Container>
        
      </div>
    );
  }
}

export default BlogForm;
