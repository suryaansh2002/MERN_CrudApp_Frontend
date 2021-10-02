import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyToast from "./MyToast.jsx";

import {
  faSearch,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Container } from "react-bootstrap";

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {},
      search: "",
      filtered: [],
      show: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://suryaansh-crud.herokuapp.com/posts")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDelete = (postId) => {
    axios
      .delete("https://suryaansh-crud.herokuapp.com/posts/" + postId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 2000);
        } else {
          this.setState({ show: false });
        }

        this.setState({
          posts: this.state.posts.filter((post) => post._id !== postId),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleUpdate = (postId) => {
    axios
      .get("https://suryaansh-crud.herokuapp.com/posts/" + postId)
      .then((response) => {
        // alert(response.data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSearch = (e) => {
    const { posts } = this.state;
    let temp = posts[0].title;
    console.log(e.target.value);
    console.log(this.state.posts);
    this.setState({
      filtered: posts.filter(
        (post) => (
          (temp = post.title),
          temp.toLowerCase().includes(e.target.value.toLowerCase())
        )
      ),
      search: e.target.value,
    });
    console.log(this.state.filtered);
    console.log(e.target.value);
    console.log(2);
  };
  render() {
    const { posts, filtered, search } = this.state;
    return (
      <div className="main">
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            children={{
              show: this.state.show,
              message: "Post Deleted Successfully",
              type: "danger",
            }}
          ></MyToast>
        </div>

        <div className="search">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="search"
            className="search-bar"
            key="random"
            placeholder="Search By Title"
            name="search"
            onChange={this.handleSearch}
          />
        </div>

        {search.length ? (
          filtered.length ? (
            filtered.map((post) => (
              <Card style={{ width: "60rem" }}>
                <Card.Body>
                  <Card.Title className="text-center">{post.title}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted right">
                    -By {post.author}
                  </Card.Subtitle>

                  <Card.Text className="justify">{post.content}</Card.Text>
                  <br></br>
                  <Card.Subtitle className="mb-2 text-muted">
                    Views: {post.views}
                  </Card.Subtitle>

                   
                  {this.props.cookie.user.username===post.author?    <Container className="right">
                      <Button
                        variant="danger"
                        className="mar"
                        onClick={this.handleDelete.bind(this, post._id)}
                      >
                        Delete{" "}
                        <FontAwesomeIcon className="mar2" icon={faTrashAlt} />
                      </Button>

                      <Button variant="primary" className="mar">
                        <Link to={"edit/" + post._id} className="update">
                          Update
                        </Link>
                        <FontAwesomeIcon className="mar2" icon={faEdit} />
                      </Button>
                    </Container>:null}
                  
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="no">No Posts</div>
          )
        ) : (
          posts.map((post) => (
            <Card className="card">
              <Card.Body>
                <Card.Title className="text-center">{post.title}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted right">
                  -By {post.author}
                </Card.Subtitle>

                <Card.Text className="justify">{post.content}</Card.Text>
                <br></br>
                <Card.Subtitle className="mb-2 text-muted">
                  Views: {post.views}
                </Card.Subtitle>

              {
                
              this.props.cookie.user ? 
                this.props.cookie.user.username===post.author?  <Container className="right">
                  <Button
                    variant="danger"
                    className="mar"
                    onClick={this.handleDelete.bind(this, post._id)}
                  >
                    Delete{" "}
                    <FontAwesomeIcon className="mar2" icon={faTrashAlt} />
                  </Button>

                  <Button variant="primary" className="mar">
                    <Link to={"edit/" + post._id} className="update">
                      Update
                    </Link>
                    <FontAwesomeIcon className="mar2" icon={faEdit} />
                  </Button>
                </Container>:null:null}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    );
  }
}
