import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Logger from '../components/Logger';
import Input from '../components/Input';
import { getRandomNumber } from '../utils/utils';

const QUESTION_DURATION = 12000;

const Quiz = React.createClass({

    getInitialState () {
        return {started: false};
    },

    componentDidMount () {
        this.answered = false;
        this.answer = {
            fullAnswer: '',
            semiAnswer: ''
        };
    },

    componentDidUpdate () {
        const { quizActive } = this.props;

        if (quizActive && this.state.started) {
            this.checkAnswered();
        }

        if (quizActive && !this.state.started) {
            this.setState({started: true}, () => {
                this.quizStart();
            });
        }

        if (!quizActive && this.questionInterval) {
            this.quizStop();
        }
    },

    quizStart () {
        this.addLog({text: `Starting quiz ...`});
        this.questionInterval = setInterval(() => {
            let value = this.getRandomQuestion();

            if (this.answer.fullAnswer && !this.answered) {

                let t = setTimeout(() => {
                    if (this.questionInterval) {
                        this.addLog({text: `The answer is: ${this.answer.fullAnswer}`});

                        let t = setTimeout(() => {
                            this.start(value);
                        }, QUESTION_DURATION / 6);
                    }
                }, QUESTION_DURATION / 4);
            } else {
                this.start(value);
            }
        }, QUESTION_DURATION);
    },

    start (value) {
        this.addLog({text: `Question: ${value.text}`});
        this.answered = false;
        this.answer.fullAnswer = value.answer;
        this.answer.semiAnswer = '';
        this.answerStart();
    },

    quizStop () {
        clearInterval(this.questionInterval);
        this.questionInterval = null;
        this.addLog({text: `Quiz stopped.`});
        this.setState({started: false});
    },

    answerStart (params) {
        let idx = 0;

        let interval = setInterval(() => {

            this.getMappedAnswer();

            if (idx === 2 || !this.questionInterval || this.answered) {
                clearInterval(interval);
                interval = null;
                idx = 0;
                return;
            }

            this.addLog({text: this.answer.semiAnswer});
            idx++;
        }, QUESTION_DURATION / 3);
    },

    addLog (param) {
        const { actions } = this.props;

        actions.addLogData({text: param.text});
    },

    checkAnswered () {
        if (this.getAnswered()) {
            this.addLog({text: 'Correct!'});
            this.answered = true;
        }
    },

    getAnswered () {
        const { logData } = this.props;

        let last = logData.length && logData[logData.length - 1].text || null;

        return this.answer.fullAnswer === last;
    },

    getMappedAnswer () {
        let mapped = this.answer.fullAnswer.replace(/[a-zA-Z0-9]/g, '*').split('');
        let len = this.answer.fullAnswer.length;
        let iCount = Math.ceil((len * 10) / 100);
        let answer = this.answer.semiAnswer && this.answer.semiAnswer.split('') || mapped;

        for (let i = 0; i < iCount; i++) {
            this.mapString(answer, len, (res) => {
                this.answer.semiAnswer = res;
            });
        }
    },

    mapString (mapped, len, cb) {
        let rand = getRandomNumber(0, len);

        if (mapped[rand] === '*') {
            mapped[rand] = this.answer.fullAnswer.charAt(rand);
            return cb && cb(mapped.join(''));
        } else {
            this.mapString(mapped, len, cb);
        }
    },

    getRandomQuestion () {
        const { questions } = this.props;

        let rand = getRandomNumber(0, questions.length);
        return questions[rand];
    },

    getTemplate () {
        const { actions, logData } = this.props;

        return (
            <div>
                <Logger data={ logData } />
                <Input actions={ actions } />
            </div>
        );
    },

    render () {
        let template = this.getTemplate();

        return (
            <article className="quiz">
                { template }
            </article>
        );
    }
});

Quiz.PropTypes = {
    actions: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    logData: PropTypes.array.isRequired,
    quizActive: PropTypes.bool.isRequired
};

export default Quiz;
