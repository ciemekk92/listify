import React, { FunctionComponent, useState } from 'react';
import { Wrapper, Display, Input } from './Name.styled';
import { CSSTransition } from 'react-transition-group';
import './Name.css';

type NameProps = {
    changed(event: React.ChangeEvent): void;
    submit(): void;
    value: string;
};

const Name: FunctionComponent<NameProps> = (props) => {
    const { changed, submit, value } = props;
    const [editing, setEditing] = useState(false);

    return (
        <Wrapper>
            <Display>{value}</Display>
            <button
                onClick={() => {
                    setEditing(!editing);
                    // TODO
                }}
            >
                Toggle
            </button>

            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                <Input
                    placeholder={value}
                    onChange={changed}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            submit();
                        }
                    }}
                    value={value}
                />
            </CSSTransition>
        </Wrapper>
    );
};

export default Name;
