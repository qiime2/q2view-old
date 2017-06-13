import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

export default ({ submit, cancel, placeholder }) => (
    <form onSubmit={submit}>
        <FormGroup>
            <InputGroup bsSize="large">
                <InputGroup.Button>
                    <Button onClick={cancel}>cancel</Button>
                </InputGroup.Button>
                <FormControl
                    type="text"
                    placeholder={placeholder}
                />
                <InputGroup.Button>
                    <Button type="submit" bsStyle="primary">Go!</Button>
                </InputGroup.Button>
            </InputGroup>
        </FormGroup>
    </form>
);
