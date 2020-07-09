import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Sidebar from '../../containers/Sidebar/Sidebar';
import ListLayout from '../../containers/ListLayout/ListLayout';
import ListDetails from '../../containers/ListDetails/ListDetails';
import { hiddenListContext } from '../../context/hiddenListContext';
import { connect, ConnectedProps } from 'react-redux';
import { Item } from '../../types';
import { Wrapper } from './List.styled';
import './List.css';
import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';

const { Provider } = hiddenListContext;

const List: React.FC<PropsFromRedux> = forwardRef(
    (props, ref: React.Ref<HTMLDivElement>) => {
        const { selectedItem } = props;

        const [hidden, setHidden] = useState(false);

        const handleClick = (value: boolean) => {
            setHidden(value);
        };

        const scrollToRef = (ref: any) =>
            ref.current.scrollIntoView({ behavior: 'smooth' });

        const handleScroll = (scrollRef: any) => scrollToRef(scrollRef);

        const [showing, setShowing] = useState(!!selectedItem.id);

        const topRef = useRef(null);

        useEffect(() => {
            if (selectedItem.id !== null) {
                setShowing(true);
            } else {
                setShowing(false);
            }
        }, [selectedItem.id]);

        return (
            <Provider value={{ hidden, handleClick }}>
                <Sidebar ref={topRef} />
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
}) => {
    return {
        selectedItem: state.list.selectedItem
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(List));
