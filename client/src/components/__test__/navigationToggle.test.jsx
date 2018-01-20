/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

import NavigationToggle from '../NavigationToggle';

function mountComponent(props = {}) {
	const propsToUse = {
		onClickCallback: jest.fn(),
		...props,
	};

	return shallow(<NavigationToggle {...propsToUse} />)
}

function sel(id) {
	return `[data-test="${id}"]`
}

test('the component mounts with defaults', () => {
	const wrapper = mountComponent();
	expect(wrapper).toMatchSnapshot();
});

test('it toggles "is-open" class when clicked', () => {
	const wrapper = mountComponent();
	const toggle = wrapper.find(sel('nav-toggle'));
	toggle.simulate('click');

	expect(wrapper.find(sel('nav-toggle')).hasClass('is-open')).toBe(true);
});
