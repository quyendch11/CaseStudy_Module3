import React from 'react';
import {motion} from "framer-motion";
import {Col, Container, Row} from "reactstrap";

import '../style/services.css'
import serviceData from "../assets/data/serviceData";


function Services(props) {
    return (
        <section>
            <Container>
                <Row>
                    {
                        serviceData.map((item,index)=> (
                            <Col lg='3' md='4' key={index}>
                                <motion.div
                                    whileHover={{scale :1.1}}
                                    className="services__item"
                                     style={{background:`${item.bg}`}}
                                >
                            <span>
                                <i className={item.icon}></i>
                            </span>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>
    );
}

export default Services;