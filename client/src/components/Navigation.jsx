/* eslint-disable jsx-a11y/anchor-is-valid,import/no-extraneous-dependencies,react/forbid-prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavigationLink from './NavigationLink';
import NavigationToggle from './NavigationToggle';
import SocialMedia from './SocialMedia';
import navData from '../data/navigation.json';

class Navigation extends Component {
	state = {
		overlayColor: '',
		isOpen: false
	};

	componentDidMount() {
		this.setDefaultOverlayColor();
	}

	onToggleClickHandler = toggledOn => {
		this.setState({ isOpen: toggledOn });
	};

	onNavLinkClickHandler = () => {
		this.setState({ isOpen: false });
	};

	setDefaultOverlayColor() {
		const color = this.getDefaultOverlayColor();
		this.setState({ overlayColor: color });
	}

	getDefaultOverlayColor = () =>
		navData.filter(({ path }) => path === this.props.location.pathname)[0].overlayColor;

	changeOverlayColorHandler = (color = '') => {
		const overlayColor = color === '' ? this.getDefaultOverlayColor() : color;
		this.setState({ overlayColor });
	};

	renderNavLinks = () =>
		navData.map(item => (
			<NavigationLink
				key={item.path}
				{...item}
				changeOverlayColor={this.changeOverlayColorHandler}
				onClickCallback={this.onNavLinkClickHandler}
			/>
		));

	render() {
		const overlayStyle = {
			backgroundColor: this.state.overlayColor
		};

		const classes = classNames('Navigation', { 'is-open': this.state.isOpen });

		return (
			<div className={classes} data-test="navigation">
				<NavigationToggle
					onClickCallback={this.onToggleClickHandler}
					toggledOn={this.state.isOpen}
				/>
				<nav className="navbar">
					<ul className="links" data-test="nav-links">
						{this.renderNavLinks()}
					</ul>
					<SocialMedia />
				</nav>
				<div className="overlay" style={overlayStyle} data-test="overlay" />
			</div>
		);
	}
}

Navigation.propTypes = {
	location: PropTypes.object.isRequired
};

export default withRouter(Navigation);
export { Navigation };
