import React, { Component } from "react";
import { Toast } from "react-bootstrap";

class MyToast extends Component {
  render() {
    
    return <div  className="">
        <Toast className={`${this.props.children.type ==="success" ? "border text-white border-success bg-success":"border text-white border-danger bg-danger"}`}show={this.props.children.show}>

        <Toast.Header className={`${this.props.children.type ==="success" ? "bg-success text-white":"bg-danger text-white"}`} closeButton={false}>
            <strong className="ml-auto">
        Success
            </strong>
        </Toast.Header>
        <Toast.Body>
            {this.props.children.message}
        </Toast.Body>
        </Toast>

    </div>;
  }
}

export default MyToast;
