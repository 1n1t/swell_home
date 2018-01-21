import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import { Navigation } from '../Navigation';
import navLinks from '../../data/navigation.json';
import smLinks from '../../data/social-media.json';
import { sel } from '../../../../tests/utils';

function mountComponent(props = {}, isShallow = true) {
	const propsToUse = {
		location: {
			pathname: '/'
		},
		...props
	};

	if (isShallow) {
		return shallow(<Navigation {...propsToUse} />);
	}

	return mount(
		<StaticRouter context={{}}>
			<Navigation {...propsToUse} />
		</StaticRouter>
	);
}

test('the component mounts with defaults', () => {
	const wrapper = mountComponent();

	expect(wrapper).toMatchSnapshot();
});

test('it renders correct number of navigation and social media links', () => {
	const wrapper = mountComponent();
	const elNavLinks = wrapper.find(sel('nav-links')).children();
	const elSocialMediaLinks = wrapper.find(sel('social-media-links')).children();

	expect(elNavLinks).toHaveLength(navLinks.length);
	expect(elSocialMediaLinks).toHaveLength(smLinks.length);
});

test('method "getDefaultOverlayColor()" returns correct color', () => {
	const pathname = '/contact';
	const wrapper = mountComponent({ location: { pathname } });
	const color = wrapper.instance().getDefaultOverlayColor();

	expect(color).toBe(navLinks.filter(item => item.path === pathname)[0].overlayColor);
});

xtest('it changes overlay color when user hover over a navigation link', () => {
	const index = 1;
	const wrapper = mountComponent({}, false);
	const linkToHover = wrapper
		.find(sel('nav-links'))
		.children()
		.at(index);

	linkToHover.simulate('mouseEnter');
	wrapper.update();
	let overlayColor = wrapper.find(sel('overlay')).get(0).props.style.backgroundColor;
	expect(overlayColor).toBe(navLinks[index].overlayColor);

	linkToHover.simulate('mouseleave');
	overlayColor = wrapper.find(sel('overlay')).get(0).props.style.backgroundColor;
	expect(overlayColor).toBe(navLinks[0].overlayColor);
});

test('method "changeOverlayColorHandler()" changes overlay color', () => {
	const wrapper = mountComponent();
	const backgroundColor = wrapper.instance().getDefaultOverlayColor();
	const newColor = '#001122';

	//	if color is provided, we expect overlay to have new color
	wrapper.instance().changeOverlayColorHandler(newColor);
	wrapper.update();
	let overlayStyle = wrapper.find(sel('overlay')).get(0).props.style;
	expect(overlayStyle).toEqual({ backgroundColor: newColor });

	//	if color is not provided, we expect overlay to have default color
	wrapper.instance().changeOverlayColorHandler();
	wrapper.update();
	overlayStyle = wrapper.find(sel('overlay')).get(0).props.style;
	expect(overlayStyle).toEqual({ backgroundColor });
});

test('it switch "is-open" class when toggle clicked', () => {
	const wrapper = mountComponent({}, false);
	const toggle = wrapper.find(sel('nav-toggle'));

	toggle.simulate('click');
	expect(wrapper.find(sel('navigation')).hasClass('is-open')).toBe(true);

	toggle.simulate('click');
	expect(wrapper.find(sel('navigation')).hasClass('is-open')).toBe(false);
});
