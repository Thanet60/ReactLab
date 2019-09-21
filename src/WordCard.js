import React , { Component } from 'react'
import CharacterCard from './CharacterCard'
import _ from 'lodash';



const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: [],
        completed: false
    }
}


export default class WordCard extends Component{
    constructor(props){
        super(props)
        this.state=prepareStateFromWord(props.value)
    }
    

    activationHandler = (c) => { 
        console.log(`${c} has been activated.`) 
        let guess = [...this.state.guess, c]
        this.setState({guess})
        if(guess.length == this.state.chars.length){
            if(guess.join('').toString() == this.state.word){
                this.setState({guess: [], completed: true})
            }
            else{
                this.setState({guess: [], attempt: this.state.attempt + 1})
                if(this.state.attempt == 4) {
                    alert("You LOSE -----------ans is REACTLAB-------------")
                    window.location.reload()
                }
            }
        }
    }

    render(){

        return(
            <div>
                <h1>The name of this lap is</h1>
                {Array.from(this.state.chars).map(( c , i ) => <CharacterCard value = {c} key = {i} attempt= {this.state.attempt} activationHandler={this.activationHandler}></CharacterCard>)}
                <button onClick={ (e) => window.location.reload()}><h1>Click for Restart</h1></button>
                <h1>---->{this.state.guess}</h1>
                <h1>{this.state.completed ? 'REACTLAB': ''}</h1>
                <h2>Your Round = {this.state.attempt} / 4 </h2>
                <h2>{this.state.attempt == 2? 'Try again':''}</h2>
                <h2>{this.state.attempt == 3? 'You can do this':''}</h2>
                <h2>{this.state.attempt == 4? 'This is your last chance':''}</h2>
                <h2>{this.state.completed ? 'YOU WIN': ''}</h2>
            </div>
            
        );
    }
}
