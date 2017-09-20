import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Logger extends Component {

    componentDidMount () {
        this.el = document.querySelector('.logger');
    }

    componentDidUpdate () {
        this.el.scrollTop = this.el.scrollHeight;
    }

    getTemplate () {
        const { data } = this.props;

        let logs = (() => {
            return data.map((log, idx) => {
                return (
                    <div key={ idx }>
                        { log.time } -- { log.text }
                    </div>
                );
            });
        })();

        return (
            <div className="logger__list">
                { logs }
            </div>
        );
    }

    render () {
        let template = this.getTemplate();

        return (
            <article className="logger">
                { template }
            </article>
        );
    }
}

Logger.PropTypes = {
    data: PropTypes.array.isRequired
};
