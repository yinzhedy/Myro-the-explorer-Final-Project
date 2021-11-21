import React, { Component } from "react";
import Game from './classes/game';
import Player from './components/player/index';
import './App.css';
import Actor from "./components/actor";
import Jack from "./components/Jack";
import MonsterNumberOne from "./components/monster-number-one";
import MonsterNumberTwo from "./components/monster-number-two";
import Ghost from "./components/ghost";
import Leaf from "./components/Leaf";
import Laurel from "./components/Laurel"


const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;


  // sprite code
  const data = {
    h: 32,
    w: 32,
  }
  // sprite code
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isGameRunning: false
      };
      this.canvasRef = React.createRef();
    }
  
    componentDidMount = () => {
      this.start();
    };
  
    start = async () => {
      if (!this.state.isGameRunning) {
        this.game = new Game(this.getContext());
        await this.game.init();
        this.renderGame();
      }
      this.setState(state => ({ isGameRunning: !state.isGameRunning }));
    };
  
    renderGame = () => {
      requestAnimationFrame((elapsed) => {
        this.game.render(elapsed);
  
        if (this.state.isGameRunning) {
          this.renderGame();
        }
      });
    };
  
    getContext = () => this.canvasRef.current.getContext("2d");

    

  render() {
  return (
    <div>
        <div className="header">
          Myro The Explorer
        </div>
        <div className="subheader">
          "Not all those who wander are lost"
        </div>
        <div className="subheader2">
          Use arrow keys to move
        </div>
        <div id="gameContainer" className="gameContainer">
          <canvas
            ref={this.canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
            <div className='zone-container'>
              <Player skin="$Lanto180" data={data} /> 
            </div>
            <div className="actors">
            <Ghost skin="$monja_dark" data={data}/> 
              <Jack skin="Jack" data={data}/> 
              <MonsterNumberOne skin="$Lanto105" data={data}/>
              <MonsterNumberTwo skin="$Lanto108" data={data}/>
              <Leaf skin="Leaf" data={data}/>
              <Laurel skin="Laurel" data={data}/>
            </div>
        </div>
      </div>
  );
  }

}

export default App;
