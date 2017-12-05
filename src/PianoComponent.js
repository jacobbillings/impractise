import React from 'react';
import ReactHowler from 'react-howler';
import teoria from 'teoria';
import {sampleMap} from './maps';

class PianoComponent extends React.Component {
    constructor(props) {
        super(props);
        // /this.getSample = this.getSample.bind(this);
    }
    
    getSample(midiNote) { //takes MIDI note and returns appropriate sample from sampleMap
        //console.log(midiNote);
        for (var i = 0; i <= 6; i++) {
            //console.log(teoria.note.fromMIDI(midiNote).fq());
            //console.log(55 * i);
            var f = 55 * Math.pow(2, i); //frequency of a sample
            //console.log(f);
            if (teoria.note.fromMIDI(midiNote).fq() < f) { //55 is A1, check against multiples of that since all samples are an A note
                return sampleMap[f]; //return sample filename
            }
        }
        return sampleMap[3520];
    }

    render() {
        const pianoStyle = {
            width: '90vw',
            height: '60vh',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20vh'
        };
        var whiteKeyWidthPercent = (1 / 52) * 100; //52 white keys
        var whiteKeyHeightPercent = 100 / 3;
        var blackKeyWidthPercent = whiteKeyWidthPercent * (1 / 2);
        var blackKeyHeightPercent = whiteKeyHeightPercent * (2 / 3);

        var keys = [];
        for (var i = 120; i >= 33; i--) { //add key component for each of 88 keys
            //get sample filename and frequency
            var s = this.getSample(i);
            //console.log(s);
            var f = 55 * Math.pow(2, Number(s[1] - 1));
            //console.log(s);
            //var f = this.getSample(i)[1];
            //check color of key
            if ([1, 4, 6, 9, 11].includes((i - 33) % 12)) {
                //is black
                keys.push(<KeyComponent 
                    key={i} 
                    note={i} 
                    sample={s} 
                    sampleFq={f}
                    frequency={teoria.note.fromMIDI(i).fq()} 
                    rateFactor={teoria.note.fromMIDI(i).fq() / f}
                    type='black' 
                    width={blackKeyWidthPercent} 
                    height={blackKeyHeightPercent} 
                    playNote={this.playNote}
                />);
            }
            else {
                //is white
                //check if the key is to the right of a black key
                keys.push(<KeyComponent 
                    key={i} 
                    note={i} 
                    sample={s} 
                    sampleFq={f}
                    frequency={teoria.note.fromMIDI(i).fq()}
                    rateFactor={teoria.note.fromMIDI(i).fq() / f}
                    type='white' 
                    width={whiteKeyWidthPercent} 
                    height={whiteKeyHeightPercent} 
                    leftOfWhite={[2, 7].includes((i - 33) % 12)} 
                    playNote={this.playNote} 
                />);
                        
            }
        }       

        return (
            <div style={pianoStyle}>
                { keys }
            </div>
        );

    }
}

class KeyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            howlers: []    
        };
        
    }    

    clickHandler() {
        
    this.player.howler.rate(this.props.frequency / this.props.sampleFq);
        if (!this.state.playing) {
            this.setState({playing: true});
        }
        else {
            this.player.seek(0);
        }
        
        
    }

    render() {
        //const sampleRate = 440;
        //console.log(teoria.note.fromMIDI(this.props.note).fq())
        //var rateFactor = teoria.note.fromMIDI(this.props.note).fq() / sampleRate;
        const blackStyle = {
            backgroundColor: this.state.active ? '#ba55d3' : '#2D3239',
            width: this.props.width + '%',
            height: this.props.height + '%',
            marginRight: (-(this.props.width) / 2) + '%',
            float: 'right',
            zIndex: '1',
            position:'relative'
        };
        const whiteStyle = {
            backgroundColor: this.state.active ? '#ba55d3' : '#fffff8',            
            boxShadow: '0px 0px 0px 1px black inset',
            width: this.props.width + '%',
            height: this.props.height + '%',
            marginRight: (this.props.leftOfWhite ? 0 : (this.props.width * (-1/4))) + '%',
            zIndex: '0',
            float: 'right',
            position:'relative'

        };
        

        return (
            <div style={ this.props.type === "black" ? blackStyle : whiteStyle } onClick={this.clickHandler.bind(this)}>
                <ReactHowler 
                    src={[this.props.sample]}                                       
                    onEnd={() => {this.setState({playing: false})}}
                    playing={this.state.playing}    
                    preload={true}
                    //onPlay={this.player.howler.rate(teoria.note.fromMIDI(this.props.note).fq() / 440)}
                    ref={(ref) => (this.player = ref)}   
                />
            </div>
        );
    }
}
export {PianoComponent, KeyComponent};