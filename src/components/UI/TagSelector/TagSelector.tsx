import React from 'react';
import { Field, FieldContainer } from './TagSelector.styled';
import { Tag } from '../../../types';

type SelectorProps = {
    selectCb(tag: { name: string; id: string; color: string }): void;
    tagsArray: Tag[];
};

const TagSelector: React.FC<SelectorProps> = (props) => {
    const { selectCb, tagsArray } = props;

    return (
        <FieldContainer>
            <Field
                onClick={() =>
                    selectCb({
                        name: '',
                        id: '',
                        color: ''
                    })
                }
            >
                None
            </Field>
            {tagsArray.map((element: Tag) => (
                <Field
                    key={element.id}
                    color={element.color}
                    onClick={() =>
                        selectCb({
                            name: element.name,
                            id: element.id,
                            color: element.color
                        })
                    }
                >
                    {element.name.length < 20
                        ? element.name
                        : element.name.substring(0, 20) + '...'}
                </Field>
            ))}
        </FieldContainer>
    );
};

export default React.memo(TagSelector);
