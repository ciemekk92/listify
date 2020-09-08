import React from 'react';
import { Wrapper } from './ListView.styled';
import { CSSTransition } from 'react-transition-group';
import TagSelector from '../../UI/TagSelector/TagSelector';
import { connect, ConnectedProps } from 'react-redux';
import { Item, Tag } from '../../../types';
import * as actions from '../../../store/actions';
import { alertError, updateObject } from '../../../shared/utility';
import {
    saveEditedItem,
    updateTaggedItem
} from '../../../firebase/ListFunctions';

type ViewProps = {
    clickedCancel(): void;
    editing: boolean;
};

const ListView: React.FC<Props> = (props) => {
    const {
        editing,
        clickedCancel,
        lists,
        selectedItem,
        onGettingUserInfo,
        onSettingSelectedItem
    } = props;

    let listsArray = Object.keys(lists).sort();

    const submitHandler = (list: string) => {
        if (list !== selectedItem.list) {
            const updatedItem = updateObject(selectedItem, {
                list: list
            });

            try {
                saveEditedItem(selectedItem, updatedItem).then(() => {
                    updateTaggedItem(selectedItem, { list: list }).then(() => {
                        onGettingUserInfo();
                        onSettingSelectedItem(updatedItem);
                        clickedCancel();
                    });
                });
            } catch (error) {
                alertError(error);
            }
        } else {
            clickedCancel();
        }
    };

    return (
        <CSSTransition
            in={editing}
            timeout={400}
            mountOnEnter
            unmountOnExit
            classNames="height"
        >
            <Wrapper editing={editing}>
                <TagSelector
                    selectCb={(list: string) => submitHandler(list)}
                    type="list"
                    listArray={listsArray}
                />
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
        lists: state.user.userInfo.lists
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSettingSelectedItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ViewProps;

export default connector(React.memo(ListView));
