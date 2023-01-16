import { useEffect, useState } from "react"
import { Alert, Col, Row } from "react-bootstrap"

const Newsletter = ({status,message,onValidated}) =>{

    const [email,setEmail] = useState('');
    useEffect(() =>{
        if(status === 'success') clearFields();
    },[status])
    const handleSubmit = (e) =>{
        e.preventDefault();
        email &&
        email.indeOf("@") > -1 && 
        onValidated({
            EMAIL: email 
        })
    }

    const clearFields = () =>{
        setEmail('');
    }

    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }
    return(
        <Col lg={12}>
            <div className="newsletter-bx">
                <Row>
                    <Col lg={12} md={6} xl={5}>
                        <h3>Subscribe to our Newsletter</h3>
                        {status === 'sending' && <Alert>Sending...</Alert>}
                        {status === 'error' && <Alert variant="danger">{message}</Alert>}
                        {status === 'success' && <Alert variant="success">{message}</Alert>}
                    </Col>
                    <Col md={6} xl={7}>
                        <form onSubmit={handleSubmit}>
                            <div className="new-email-bx">
                                <input value={email} type="email" onChange={onChangeEmail} placeholder="Email"></input>
                                <button type="submit">Submit</button>

                            </div>
                        </form>
                    </Col>
                </Row>

            </div>
        </Col>
    )
}

export default Newsletter