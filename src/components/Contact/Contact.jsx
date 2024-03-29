import React, { Component, Fragment } from 'react'
import { Col, Container, Form, Row,Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faExternalLink} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import contactUs from '../../asset/image/contact-us.png';
import RestClient from '../../RestAPI/RestClient'
import AppUrl from '../../RestAPI/AppUrl'
import Loading from '../Loading/Loading'
import Errorpage from '../404Page/Errorpage'
import ReactHtmlParser from 'react-html-parser'

class Contact extends Component {

    constructor(){
        super();
        this.state={
          address:"",
          email:"",
          phone:"",
          loading:true,
          error:false
        }
    }

    componentDidMount(){
        RestClient.GetRequest(AppUrl.FooterData).then(result=>{

            if(result === null){
                this.setState({error:true,loading:false})
            }else{

            this.setState({
            address:result[0]['address'],
            email:result[0]['email'],
            phone:result[0]['phone'],
            loading:false});
                }
            }).catch(error=>{
                this.setState({error:true})
            })
    }

    sendContact(){
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        let jsonObject = {name:name,email:email,message:message}
        RestClient.PostRequest(AppUrl.ContactUs,JSON.stringify(jsonObject)
            ).then(result=>{
                alert(result);
            }).catch(error=>{
                alert("Error");
            })
    }

    render() {


    if(this.state.loading === true){
        return <Loading />
    }
    else if(this.state.loading === false){
        return (

          <Fragment>
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <h1 className="storiesName">Connect With Us</h1>
                        <hr />
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control id="name" type="text" placeholder="Enter Your Name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter Your Email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control id="message" as="textarea" rows={3} />
                        </Form.Group>

                        <Button onClick={this.sendContact} variant="warning">
                            Submit
                        </Button>
                        </Form>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                      <p>
                      <img className="contactCard" src={contactUs} alt="logo" />
                      </p>
                      <p className="analysisDescription text-center">
                    <FontAwesomeIcon icon={faHome} /> {this.state.address}<br></br>
                    <FontAwesomeIcon icon={faEnvelope} /> {ReactHtmlParser(this.state.email)}<br></br>
                    <FontAwesomeIcon icon={faPhone} /> {ReactHtmlParser(this.state.phone)}
                    </p>
                    </Col>
                </Row>
            </Container>

          </Fragment>
        )
        }// end else
        else if(this.state.error === true){
            return <Errorpage />
        }// end if for error
      }
    }
export default Contact
