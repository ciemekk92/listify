import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../../store/actions';
import { v4 as uuidv4 } from 'uuid';
import { Wrapper, Selector, Picker, Color } from './ColorPicker.styled';

const ColorPicker: React.FC<PropsFromRedux> = (props) => {
    const { onSettingColor } = props;
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#2196F3');

    const pickerVisibilityHandler = () => {
        setShowPicker(!showPicker);
    };

    const colors: string[] = [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673ab7',
        '#3F51B5',
        '#2196F3',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#607D8B'
    ];

    const setCurrentColor = (color: string) => {
        setSelectedColor(color);
        onSettingColor(color);
        pickerVisibilityHandler();
    };

    return (
        <Wrapper>
            <p>Selected color:</p>
            <Selector value={selectedColor} onClick={pickerVisibilityHandler} />
            {showPicker ? (
                <Picker>
                    {colors.map((element) => (
                        <Color
                            key={uuidv4()}
                            value={element}
                            onClick={() => setCurrentColor(element)}
                        />
                    ))}
                </Picker>
            ) : null}
        </Wrapper>
    );
};

const mapDispatchToProps = {
    onSettingColor: (color: string) => actions.setCurrentColor(color)
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ColorPicker);
