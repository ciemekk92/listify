import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from './ListItem';
import EditButton from '../../ListDetails/EditButton/EditButton';

configure({ adapter: new Adapter() });

describe('ListItem', () => {
    it('should render one button if item is completed', () => {
        const wrapper = shallow(<ListItem completed />);

        expect(wrapper.find(EditButton)).toHaveLength(1);
    });
});
