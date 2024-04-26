import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="bg-primary text-white">
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-lg">
              Hi! I'm Meena Chand, a web developer with a serious love for
              teaching. I am the founder of eLe easy Learning and a passionate
              Web Developer, Programmer & Instructor.
            </p>
            <p className="text-lg mt-4">
              I have been working online for the last 7 years and have created
              several successful websites running on the internet. I create
              project-based courses that help you learn professionally and make
              you feel like a complete developer. easy learning exists to help
              you succeed in life.
            </p>
            <p className="text-lg mt-4">
              Each course has been hand-tailored to teach a specific skill. I
              hope you agree! Whether you’re trying to learn a new skill from
              scratch or want to refresh your memory on something you’ve learned
              in the past, you’ve come to the right place. Education makes the
              world a better place. Make your world better with new skills.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
