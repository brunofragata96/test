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
      frases: [],
      frase_adicionar: "",
      estado_frase: "",
      update_state_message: "",
    }
    this.toggleTick = this.toggleTick.bind(this);
    this.novaFrase = this.novaFrase.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  componentWillMount() {
    //console.log("componentWillMount");
    //this.interval = setInterval(this.tick.bind(this), 1000) 
    this.setupTick(this.state.ticking)
    this.setRandomFrase()
    this.getLocalFrases()
    //this.setLocalFrases([])
  }
  componentDidMount() {
  //console.log("componentDidMount");
  this.frase_adicionar.focus()
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
    this.setState({
      frase: !!frasesAUtilizar[frasesIndex]
      ? frasesAUtilizar[frasesIndex.text] : ""
    });
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

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      //os [] permitem adicionar um nome dinâmico à função
      [event.target.name]: event.target.value
    })
  }

  handleSubmitForm(event) {
    event.preventDefault();
    if(this.state.frase_adicionar !== "") {
      this.state.frases.push({
        text: this.state.frase_adicionar,
        done: this.state.estado_frase === "porFazer" ? false : true,
      });
      //o set state volta a injectar dentro do state os novos dados
      this.setState({
        frases: this.state.frases,
        frase_adicionar: "",
      })
      this.frase_adicionar.focus();
    }else{
      alert("a frase tem de estar preenchida!")
    }
    this.setLocalFrases(this.state.frases)
  }

  handleRemove(fraseIndex, e) {
      this.state.frases.splice(fraseIndex, 1);
      this.setState({frases: this.state.frases})
      localStorage.setItem("frases", this.state.frases)
      this.setLocalFrases(this.state.frases)
  }

  handleEdit(fraseIndex, e) {
    this.setState({
      frase_editing: this.state.frase_editing === fraseIndex ? null : fraseIndex    
    })
    setTimeout(() => console.log(this.state.frase_editing, this.state.frase_editing >= 0,!isNaN(this.state.frase_editing)), 10)
  }

  handleChangeFraseName(fraseIndex, e) {
    console.log("handleChangeFraseName", fraseIndex, e)
    this.state.frases[fraseIndex].text = e.target.value
    this.setState({
      frases: this.state.frases
    })
    this.setLocalFrases(this.state.frases)
  }

  handleToggleDone(fraseIndex, e) {
    this.state.frases[fraseIndex].done = !this.state.frases[fraseIndex].done 
    this.setState({
      frases: this.state.frases
    })
    this.setLocalFrases(this.state.frases)
  }

  getLocalFrases() {
    let frases = localStorage.getItem("frases");
    if (frases === null) {
      frases = [];
    }else{
      frases = JSON.parse(frases)
    }
    this.setState({frases});
  }

  setLocalFrases (frases) {
    this.setState({update_state_message: "A gravar dados localmente..."})
    localStorage.setItem("frases", JSON.stringify(frases))
    setTimeout(() => {
      this.setState({update_state_message: ""})
    },2000)
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
          <ul>
            {this.state.frases.map((item, index) => {
              return <li key={"frase" + index} className={item.done ? "done" : "tbd"}> 
              {
                (this.state.frase_editing === index) ?
                <input onChange={this.handleChangeFraseName.bind(this, index)} value={item.text}/>
                : <span>{item.text}</span>
              }
              <button 
                onClick={this.handleToggleDone.bind(this, index)}>
                Toggle
              </button>

              <button 
                onClick={this.handleRemove.bind(this, index)}  
                disabled={(!isNaN(this.state.frase_editing) && this.state.frase_editing !== null) ? "disabled" : "" }>
                Remover
              </button>

              <button 
                onClick={this.handleEdit.bind(this, index)}>
                {(this.state.frase_editing === index) ? "stop edit" : "Edit"}
              </button>

              </li>
            })}
          </ul>  
        </div>

        <div>
          {this.state.update_state_message}
          <form onSubmit={this.handleSubmitForm}>
            <input ref={(el) => {this.frase_adicionar = el}} type="text" name="frase_adicionar" onChange={this.handleInputChange} value={this.state.frase_adicionar}></input>
            <select name="estado_frase" onChange={this.handleInputChange} value={this.state.estado_frase}> 
              <option value="feito"> Feito </option>
              <option value="porFazer"> Por Fazer </option>
            </select>
          </form>
          <p> {this.state.frase_adicionar} </p>
        </div>
      
      </div>
    );
  }
}

export default App;

