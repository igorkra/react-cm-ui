'use strict';

import ClassNames from 'classnames';
import MediaQuery from 'react-responsive';
import React, { Component } from 'react';

import Header from '../Elements/Header.react';

class TitleBar extends Component {

    render() {
        const containerClasses = ClassNames('ui', 'title-bar', this.props.className);

        return (
            <header className={containerClasses} style={this.props.style}>
                <MediaQuery maxWidth={767}>
                    {matches => {
                        return (
                            <Header as={matches ? 'h2' : 'h1'}>{this.props.title}</Header>
                        );
                    }}
                </MediaQuery>
            </header>
        );
    }

};

TitleBar.propTypes = {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    title: React.PropTypes.string
};

export default TitleBar;
