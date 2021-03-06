'use strict';

import ClassNames from 'classnames';
import React, { Component } from 'react';

import TableBody from './TableBody.react';
import TableCell from './TableCell.react';
import TableHeader from './TableHeader.react';
import TableHeaderCell from './TableHeaderCell.react';
import TableRow from './TableRow.react';

import Utils from '../utils/Utils.js';

class Table extends Component {

    render() {
        const { basic, celled, className,
            collapsing, definition, fixed, fontSize, fullWidth, selectable, singleLine, stretch, style, stackable, striped } = this.props;
        const containerClasses = ClassNames(
            'ui',
            'table', {
                'table-basic': basic,
                'table-celled': celled,
                'table-collapsing': collapsing,
                'table-definition': definition,
                'table-fixed': fixed,
                'table-font-size-large': fontSize === 'large',
                'table-font-size-medium': fontSize === 'medium',
                'table-font-size-small': fontSize === 'small',
                'table-font-size-xlarge': fontSize === 'xlarge',
                'table-font-size-xsmall': fontSize === 'xsmall',
                'table-font-size-xxsmall': fontSize === 'xxsmall',
                'table-full-width': fullWidth,
                'table-selectable': selectable,
                'table-single-line': singleLine,
                'table-stretch': stretch && stretch !== 'very',
                'table-stretch-very': stretch === 'very',
                'table-striped': striped,
                'table-stackable': stackable,
                'table-unstackable': stackable === false
            },
            className
        );

        return (
            <table className={containerClasses} style={style}>
                {this.props.children}
            </table>
        );
    }

}

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;

const colorEnums = [ 'bottom', 'middle', 'top' ];

Table.propTypes = {
    basic: React.PropTypes.bool,
    celled: React.PropTypes.bool,
    className: React.PropTypes.string,
    collapsing: React.PropTypes.bool,
    color: React.PropTypes.oneOf(colorEnums),
    definition: React.PropTypes.bool,
    fixed: React.PropTypes.bool,
    fontSize: React.PropTypes.oneOf(Utils.sizeEnums()),
    fullWidth: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    singleLine: React.PropTypes.bool,
    stackable: React.PropTypes.bool,
    stretch: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.oneOf(['very'])
    ]),
    striped: React.PropTypes.bool,
    style: React.PropTypes.object
};

export default Table;
