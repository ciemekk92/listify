import React from 'react';
import { Wrapper } from './TagView.styled';
import { CSSTransition } from 'react-transition-group';
import { Item, Tag } from '../../../types';
import { connect, ConnectedProps } from 'react-redux';
import TagSelector from '../../UI/TagSelector/TagSelector';
import {
    saveEditedItem,
    updateTaggedItem
} from '../../../firebase/ListFunctions';
import { alertError, updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions';

type TagProps = {
    editing: boolean;
    clickedCancel(): void;
};

const TagView: React.FC<Props> = (props) => {
    const {
        editing,
        clickedCancel,
        selectedItem,
        tags,
        lists,
        onGettingUserInfo,
        onSettingSelectedItem
    } = props;

    const submitHandler = (tag: {
        name: string;
        id: string;
        color: string;
    }) => {
        const updatedItem = updateObject(selectedItem, {
            tag: {
                name: tag.name,
                id: tag.id,
                color: tag.color
            }
        });

        try {
            saveEditedItem(selectedItem.list, selectedItem, updatedItem)
                .then(() => {
                    updateTaggedItem(
                        selectedItem,
                        { lists: lists },
                        { tag: tag }
                    )
                        .then(() => {
                            onGettingUserInfo();
                            onSettingSelectedItem(updatedItem);
                            clickedCancel();
                        })
                        .catch((error) => alertError(error));
                })
                .catch((error) => alertError(error));
        } catch (error) {
            alertError(error);
        }
    };

    let tagsArray = Object.values(tags);

    return (
        <CSSTransition
            in={editing}
            timeout={400}
            mountOnEnter
            unmountOnExit
            classNames="height"
        >
            <Wrapper editing={editing}>
                <TagSelector selectCb={submitHandler} tagsArray={tagsArray} />
            </Wrapper>
        </CSSTransition>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
    };
    user: {
        userInfo: {
            tags: { [name: string]: Tag };
            lists: { [name: string]: any };
        };
    };
}) => {
    return {
        selectedItem: state.list.selectedItem,
        tags: state.user.userInfo.tags,
        lists: state.user.userInfo.lists
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSettingSelectedItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & TagProps;

export default connector(React.memo(TagView));
