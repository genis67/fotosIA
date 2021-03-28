import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import Carregando from '../src/images/Bean Eater-1s-200px.gif'

function App() {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEnia] = useState('')
  const [idade, setIdade] = useState('')

  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }
  function obtemFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    const filtraEtinia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtrarIdade = idade.length > 0 ? `&age=${idade}` : ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtinia}${filtrarIdade}&order_by=random`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
        console.log(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição' + error.message)
      })
    setCarregando(false)
  }
  return (
    <div className='app'>
      <h1>Gerador de Fotos com IA</h1>
      <Robot></Robot>
      {
        carregando &&
        <img src={Carregando} title="Aguarde..." alt="Agurde" width="50" />
      }
      <div className='linha'>
        <ListaPessoas pessoas={pessoas} />
      </div>
      <div className='linha'>
        <label>Idade:{idade}</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value="">Todas</option>
          <option value="infant">Infantil</option>
          <option value="child">Criaça</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>
        <label>Etinia: {etnia}</label>
        <select onChange={event => setEnia(event.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branca</option>
          <option value="latino">Asiatica</option>
          <option value="black">Negra</option>
        </select>
      </div>
      <div className='linha'>
        <button type='button' onClick={obtemFoto}>
          Obter Imagens
      </button>
        {pessoas.length > 0 &&
          <button type='button' onClick={() => setPessoas([])}>
            Limpar imagens
      </button>
        }
      </div>
    </div>
  )
}
export default App;
