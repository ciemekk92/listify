import React from 'react';
import { Wrapper } from './ListView.styled';
import { CSSTransition } from 'react-transition-group';
import TagSelector from '../../UI/TagSelector/TagSelector';
import { connect, ConnectedProps } from 'react-redux';
import { Item, Tag } from '../../../types';
import * as actions from '../../../store/actions';

type ViewProps = {
    clickedCancel(): void;
    editing: boolean;
};

const ListView: React.FC<Props> = (props) => {
    const { editing, clickedCancel, lists } = props;

    let listsArray = Object.keys(lists).sort();

    // TODO handle submitting edited data here
    const submitHandler = (list: string) => {};

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
