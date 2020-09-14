import React from 'react';
import { Field, FieldContainer } from './TagSelector.styled';
import { Tag } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

type SelectorProps = {
    selectCb(data: { name: string; id: string; color: string } | string): void;
    type: string;
    tagArray?: Tag[];
    listArray?: string[];
};

const TagSelector: React.FC<SelectorProps> = (props) => {
    const { selectCb, type, tagArray, listArray } = props;

    return (
        <FieldContainer isList={type === 'list'}>
            {type === 'tag' ? (
                <>
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
                    {tagArray
                        ? tagArray.map((element: Tag) => (
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
                          ))
                        : null}
                </>
            ) : (
                <>
                    {listArray
                        ? listArray.map((element: string) => (
                              <Field
                                  key={uuidv4()}
                                  onClick={() => selectCb(element)}
                              >
                                  {element.length < 20
                                      ? element
                                      : element.substring(0, 20) + '...'}
                              </Field>
                          ))
                        : null}
                </>
            )}
        </FieldContainer>
    );
};

export default React.memo(TagSelector);
