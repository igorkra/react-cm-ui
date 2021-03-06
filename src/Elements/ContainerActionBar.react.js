'use strict';

import ClassNames from 'classnames';
import React, { Component } from 'react';

import Utils from '../utils/Utils.js';

class ContainerActionBar extends Component {

    render() {
        const { as, className, color, stretch, style } = this.props;
        const containerClasses = ClassNames('container-action-bar', className, {
            'container-action-bar-color-inverse': color === 'inverse',
            'container-action-bar-color-light': color === 'light',
            'container-action-bar-color-nest': color === 'nest',
            'container-action-bar-color-transparent': color === 'transparent',
            'container-stretch': stretch
        });
        const ElementType = Utils.getElementType(as || 'header', this.props);

        return (
            <ElementType className={containerClasses} style={style}>
                {this.props.children}
            </ElementType>
        );
    }

}

const asEnums = [ 'div', 'header' ,'section' ];

ContainerActionBar.propTypes = {
    as: React.PropTypes.oneOf(asEnums),
    className: React.PropTypes.string,
    color: React.PropTypes.oneOf(Utils.colorEnums()),
    stretch: React.PropTypes.bool,
    style: React.PropTypes.object
};

export default ContainerActionBar;
