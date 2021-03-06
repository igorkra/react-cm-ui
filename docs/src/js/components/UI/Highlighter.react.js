'use strict';

import 'components/UI/Highlighter.scss';

import { atomOneLight } from 'react-syntax-highlighter/dist/styles';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default class Highlighter extends React.Component {

    render() {

        return (
            <SyntaxHighlighter
                className="ui highlighter"
                customStyle={this.props.customStyle}
                language={this.props.language || 'jsx'}
                lineNumberContainerStyle={{
                    color: '#97a4ab',
                    float: 'left',
                    marginLeft: '-22px',
                    padding: '0 22px',
                    textAlign: 'right',
                    userSelect: 'none'
                }}
                showLineNumbers={true}
                style={atomOneLight}
            >
                {this.props.children}
            </SyntaxHighlighter>
        );
    }

}

Highlighter.propTypes = {
    customStyle: React.PropTypes.object,
    language: React.PropTypes.string
};
