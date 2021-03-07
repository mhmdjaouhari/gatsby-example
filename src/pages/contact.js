import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import axios from "axios";

import styled from "styled-components";

const Form = styled.form.attrs(() => ({ className: "form-group mb-3" }))``;

const InputGroup = styled.div.attrs(() => ({
  className: "input-group mb-2",
}))``;

const InputGroupPrepend = styled.div.attrs(() => ({
  className: "input-group-prepend",
}))``;

const InputGroupText = styled.div.attrs(() => ({
  className: "input-group-text",
}))``;

const Input = styled.input.attrs(() => ({
  className: "form-control",
}))``;

const TextArea = styled.textarea.attrs(() => ({
  className: "form-control",
}))``;

const Button = styled.button.attrs(props => ({
  className: `btn btn-${props.color}`,
}))``;

const Alert = styled.div.attrs(props => ({
  className: `alert alert-${props.color}`,
}))``;

const Contact = () => {
  const [state, setState] = useState({
    form: {
      name: "",
      email: "",
      subject: "",
      text: "",
    },
    alerts: [],
  });

  const handleChange = e => {
    setState({
      ...state,
      form: { ...state.form, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://webhook.site/ae803e21-56e5-4779-996d-b4e1e9bb80fd",
        state.form,
        config
      );
      if (res.status === 200)
        setState({
          ...state,
          alerts: [
            ...state.alerts,
            { text: "Message sent successfully.", type: "success" },
          ],
        });
    } catch (err) {
      if (err.response)
        setState({
          ...state,
          alerts: [
            ...state.alerts,
            { text: err.response.data.msg || "Server error.", type: "danger" },
          ],
        });
    }
  };
  return (
    <Layout>
      <SEO title="Contact" />
      <h1>Contact</h1>
      {state.alerts.map((alert, i) => (
        <Alert key={i} color={alert.type} uncontrolled>
          {alert.text}
        </Alert>
      ))}
      <Form onSubmit={e => handleSubmit(e)}>
        <InputGroup>
          <InputGroupPrepend>
            <InputGroupText>Name</InputGroupText>
          </InputGroupPrepend>
          <Input
            required
            type="text"
            value={state.form.name}
            name="name"
            onChange={e => handleChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupPrepend>
            <InputGroupText>E-mail</InputGroupText>
          </InputGroupPrepend>
          <Input
            required
            type="email"
            value={state.form.email}
            name="email"
            onChange={e => handleChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupPrepend>
            <InputGroupText>Subject</InputGroupText>
          </InputGroupPrepend>
          <Input
            required
            type="text"
            value={state.form.subject}
            name="subject"
            onChange={e => handleChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <TextArea
            rows="8"
            value={state.form.text}
            name="text"
            placeholder="Type your message here..."
            onChange={e => handleChange(e)}
          />
        </InputGroup>
        <Button color="primary" type="submit">
          Send
        </Button>
      </Form>
    </Layout>
  );
};

export default Contact;
