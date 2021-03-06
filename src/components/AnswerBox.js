import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const toPlaceholder = (value, answer) =>
    [...value].reduce((placeholder, char) => {
        return placeholder.replace("_", char);
    }, answer.replace(/[^\s]/g, "_"));

const normalise = value => value.toUpperCase().replace(/[^A-Z]/g, "");

const Form = styled.form`
  margin-bottom: 1em;
  position: relative;
`;

const Btn = styled.div`
text-align: center;
`;


const Button = styled.button`
  color: white;
  background: #382f2f;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 10px;
  margin: 10px;
  font-size: 17px;
  cursor: pointer;
`;


const Placeholder = styled.span`
  font-family: courier;
  padding: 0 0 0.2em 0.2em;
  font-size: 2em;
  letter-spacing: 0.2em;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  caret-color: transparent;
  &:focus + ${Placeholder} {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

export default ({ answer, onCorrect, onIncorrect, ...props }) => {
    const [value, setValue] = useState("");

    useEffect(() => setValue(""), [answer]);

    const handleChange = event => {
        setValue(normalise(event.target.value));
    };

    const handleSubmit = event => {
        event.preventDefault();

        value === normalise(answer) ? onCorrect() : onIncorrect();
        setValue("");
        return;
    };

    const placeholder = useMemo(() => toPlaceholder(value, answer), [
        value,
        answer
    ]);

    const maxLength = useMemo(() => normalise(answer).length, [answer]);

    return (
        <div>
        <Form onSubmit={handleSubmit} className='game'>
            <HiddenInput
                onChange={handleChange}
                value={value}
                maxLength={maxLength}
                autoFocus
            />
            <Placeholder>{placeholder}</Placeholder>
        </Form>
            <Btn>
                <Button  onClick={handleSubmit}>Chek Word</Button>
            </Btn>
        </div>

    );
};