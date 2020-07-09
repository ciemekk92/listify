import React, { useState, useEffect, forwardRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions';
import { CSSTransition } from 'react-transition-group';
import Sidebar from '../../containers/Sidebar/Sidebar';
import ListLayout from '../../containers/ListLayout/ListLayout';
import ListDetails from '../../containers/ListDetails/ListDetails';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Item } from '../../types';
import { Wrapper } from './List.styled';
import './List.css';
import Burger from '../../components/UI/Sidebar/Burger/Burger';

const { Provider } = hiddenListContext;

const List: React.FC<PropsFromRedux> = forwardRef(
    (props, ref: React.Ref<HTMLDivElement>) => {
        const { selectedItem, mobile, onSettingMobile } = props;

        const [hidden, setHidden] = useState(false);
        const [open, setOpen] = useState(false);

        const handleClick = (value: boolean) => {
            setHidden(value);
        };

        const openHandler = () => {
            setOpen(!open);
        };

        const updateMedia = () => {
            onSettingMobile(window.innerWidth <= 768);
        };

        useEffect(() => {
            window.addEventListener('resize', updateMedia);
            return () => {
                window.removeEventListener('resize', updateMedia);
            };
        });

        const [showing, setShowing] = useState(!!selectedItem.id);

        useEffect(() => {
            if (selectedItem.id !== null) {
                setShowing(true);
            } else {
                setShowing(false);
            }
        }, [selectedItem.id]);

        return (
            <Provider value={{ hidden, handleClick }}>
                {mobile ? <Burger setOpen={openHandler} /> : null}
                <Sidebar open={open} setOpen={openHandler} />
                <Wrapper>
                    <ListLayout selected={!!selectedItem.id} />
                    <CSSTransition
                        in={showing}
                        timeout={500}
                        classNames={'layout'}
                        mountOnEnter
                        unmountOnExit
                    >
                        {selectedItem.id ? <ListDetails /> : <ListDetails />}
                    </CSSTransition>
                </Wrapper>
            </Provider>
        );
    }
);

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
    };
    user: {
        mobile: boolean;
    };
}) => {
    return {
        selectedItem: state.list.selectedItem,
        mobile: state.user.mobile
    };
};

const mapDispatchToProps = {
    onSettingMobile: (mobile: boolean) => actions.setMobile(mobile)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(List));
