import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const grandeTextoDeWelcome ="E aqui está um grande texto de welcome"
const grandeTextoDeWelcome2 =<strong>E aqui está um grande texto de welcome</strong>
const outraCena = talvez =>{
  return <i>Cena outra {talvez}</i>
}
const maisCoisas = outraCena("coisas")

/* const H1 = ({classNameAColocar, prefixoDeTexto , children}) => {
  return <div className={classNameAColocar}>{prefixoDeTexto} o nosso h1 {children}</div>
} */

function H1 (props) {
  return (
    <div className={props.classNameAColocar}>
      {props.prefixoDeTexto} o nosso h1 {props.children}
    </div>
  )
} 

const Todo = ({titulo, data, estado}) =>{
  return(
    <li>
      <span>{titulo} : </span>
      <span>{data.toLocaleString() } </span>
      <span>{estado ? "Sim" : "Não"} </span>
    </li>
  )
}

const TodoList = () =>{
  return(
    <ul>
      <Todo titulo="ir a pesca" 
        data={new Date(2018, 4, 3)} 
        estado={false}/>
      <Todo titulo="dar banho ao cão" 
        data={new Date(2018, 4, 1)} 
        estado={true}/> 
      <Todo titulo="Lavar o carro" 
        data={new Date(2018, 4, 2)} 
        estado={true}/>
      <Todo titulo="Viagem a Marte" 
        data={new Date(2038, 6, 3)} 
        estado={false}/>
    </ul>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: new Date(),
      ticking: true,
      frase: "ainda não está aleatória",
      frases: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "Sed in justo blandit",
        "Nulla sit amet imperdiet ipsum",
      ]
    }
    this.toggleTick = this.toggleTick.bind(this);
    this.novaFrase = this.novaFrase.bind(this);
  }
  componentWillMount() {
    //console.log("componentWillMount");
    //this.interval = setInterval(this.tick.bind(this), 1000) 
    this.setupTick(this.state.ticking)
    this.setRandomFrase()
  }
  componentDidMount() {
  //console.log("componentDidMount");
  }
  componentWillReceiveProps() {
  //console.log("componentWillReceiveProps");
  }
  shouldComponentUpdate() {
  //console.log("shouldComponentUpdate");
  return this.state.newDate.getSeconds();
  }
  componentWillUpdate() {
  //console.log("componentWillUpdate");
  }
  componentDidUpdate() {
  //console.log("componentDidUpdate");
  }
  componentWillUnmount() {
  //console.log("componentWillUnmount");
  }

  setRandomFrase () {
    const frasesAUtilizar = this.state.frases;
    let frasesIndex = Math.round(Math.random() * (frasesAUtilizar.length - 1));
    this.setState({frase: frasesAUtilizar[frasesIndex]});
  }

  tick () {
    this.setState({newDate: new Date()})
  }

  setupTick (doTick) {
    if (doTick) {
      this.interval = setInterval(this.tick.bind(this), 1000);
      this.tick()
    }else{
      clearInterval(this.interval);
    }
  }

  toggleTick () {
    console.log(this.interval, "toggleTick");
    
    this.setState(prevState => {
      //o ! indica o contrário, se estiver true ao clicar fica false e vice-versa
      let nextTickState = !this.state.ticking;
      ticking: nextTickState
      this.setupTick(nextTickState)
      return{
       ticking: nextTickState
      }
    })
    
  }

  novaFrase() {
      this.setRandomFrase();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <H1 classNameAColocar="App-title" prefixoDeTexto="Prefixo de texto do header, ">Welcome to React</H1>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {grandeTextoDeWelcome}<br/>
          {grandeTextoDeWelcome2}
        </p>
      <div>
        <TodoList/>
      </div>
      <br/>
      <div>
          {!!this.state.newDate ? this.state.newDate.toLocaleString() : ""}
      </div>
      <br/>
      <div>
        <button onClick={this.toggleTick}>
          {this.state.ticking ? "Parar relógio" : "Iniciar relógio"}
        </button> 
      </div>
      <br/>
      <div>
        {this.state.ticking ? "Está ticking" : "Não está ticking"}
      </div>

      <div>
        <p>
          frase aleatória é: {this.state.frase}
        </p>
        <button onClick={this.novaFrase}>
          {this.state.ticking}<span>Nova Frase</span>
        </button> 
      </div>

      <div>
      </div>
        <ul>
          {this.state.frases.map((item, index) => {
            return <li key={"frase" + index} >{item}</li>
          })}
        </ul>  
      </div>
    );
  }
}

export default App;

