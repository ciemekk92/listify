import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from './ListItem';
import ListItemButton from '../ListItemButton/ListItemButton';

configure({ adapter: new Adapter() });

describe('ListItem', () => {
    it('should render one button if item is completed', () => {
        const wrapper = shallow(<ListItem completed />);

        expect(wrapper.find(ListItemButton)).toHaveLength(1);
    });
});
