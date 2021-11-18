import React, { Component } from "react";
import Game from './classes/game';
import Player from './components/player/index';
import './App.css';
import Actor from'./components/actor/index'
import Npc from "./components/npc";
import MonsterNumberOne from "./components/monster-number-one";

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
          Tilemaps examples (with React)
        </div>
        <div className="subheader">
          Scrolling map
        </div>
        <div className="subheader2">
          Use arrow keys to move
        </div>
        <div className="gameContainer">
          <canvas
            ref={this.canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
            <div className='zone-container'>
              <Player skin="$Lanto180" data={data} /> 
            </div>
            <div className="enemy-1">
              <Npc skin="$Lanto179" data={data}/> 
              <MonsterNumberOne skin="$Lanto105" data={data}/>
              <MonsterNumberOne skin="$Lanto108" data={data}/>
              <Actor sprite="/sprites/skins/$Lanto176.png" data={data} position={0, 50}/> 
            </div>
        </div>
      </div>
  );
  }
}

export default App;
