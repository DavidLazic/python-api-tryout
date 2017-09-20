import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import * as ViewActions from '../actions/ViewActions';
import classNames from 'classnames';
import AudioVisualizer from '../components/AudioVisualizer';

/**
* It is common practice to have a 'Root' container/component require our main App (this one).
* Again, this is because it serves to wrap the rest of our application with the Provider
* component to make the Redux store available to the rest of the app.
*/
const App = React.createClass({
    componentDidMount () {
        // fetch('http://localhost:5000/api/v1/projects').then((res) => {
        //     return res.json();
        // }).then((json) => {
        //     console.info('Response', json);
        // }).catch((err) => {
        //     console.error(err);
        // });
    },

    render () {
        const { actions, logData, quizActive } = this.props;

        return (
            <section>
                <AudioVisualizer src="assets/audio/thomas-bergersen-merchant-prince.mp3" 
                                 author="TestAuthor"
                                 title="TestTitle" />
            </section>
        )
    }
});

App.propTypes = {
    actions: PropTypes.object.isRequired
};

/**
* Keep in mind that 'state' isn't the state of local object, but your single
* state in this Redux application. 'active' is a property within our store/state
* object. By mapping it to props, we can pass it to the child component Counter.
*/
function mapStateToProps (state) {
    return {
        logData: state.logData,
        quizActive: state.quizActive
    };
}

/**
* Turns an object whose values are 'action creators' into an object with the same
* keys but with every action creator wrapped into a 'dispatch' call that we can invoke
* directly later on. Here we imported the actions specified in 'ViewActions.js' and
* used the bindActionCreators function Redux provides us.
*
* More info: http://redux.js.org/docs/api/bindActionCreators.html
*/
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(ViewActions, dispatch)
    };
}

/**
* 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
* connects a React component to a Redux store. It never modifies the component class
* that is passed into it, it actually returns a new connected componet class for use.
*
* More info: https://github.com/rackt/react-redux
*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
