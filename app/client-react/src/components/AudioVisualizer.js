import React, { Component, PropTypes } from 'react';

export default class AudioVisualizer extends Component {

    render () {
        let myFile = require('file-loader!./static/assets/audio/thomas-bergersen-merchant-prince.mp3');
        console.log('MY FILE', myFile);

        const { src, author, title } = this.props;

        return (
            <div className="av">
                <audio id="myAudio"
                       src={ src }
                       data-author={ author }
                       data-title={ title }>
                </audio>

                <img src="assets/images/egarden.png" />

                <div className="av__canvas-wrapper">
                    <canvas id="myCanvas" className="av__canvas" width="800" height="400"></canvas>
                </div>
            </div>
        );
    }
}

AudioVisualizer.PropTypes = {

};
