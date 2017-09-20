import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const COMMANDS = {
    '/start': 'quizStart',
    '/stop': 'quizStop',
    '/reset': 'quizReset'
};

export default class Input extends Component {

    componentDidMount () {
        this.el = document.querySelector('.input__form');
        this.el.addEventListener('keyup', this.handleInput.bind(this));
    }

    getTemplate () {
        return (
            <input className="input__form" autoFocus="true" placeholder="Type here ..." />
        );
    }

    handleInput (e) {
        const { actions } = this.props;

        let value = this.el.value;

        if (e.keyCode === 13 && this.el.value.length) {
            this.el.value = '';

            if (COMMANDS[value]) {
                return actions[COMMANDS[value]]();
            }

            actions.addLogData({text: value});
        }
    }

    render () {
        let template = this.getTemplate();

        return (
            <article className="input">
                { template }
            </article>
        );
    }
}

Input.PropTypes = {
    actions: PropTypes.object.isRequired
};
