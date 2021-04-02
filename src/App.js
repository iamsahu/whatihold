import './App.css';
import React,{useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import TokenDisplay from './Components/TokenDisplay'
//Markcuba: 0x95abDa53Bc5E9fBBDce34603614018d32CED219e
function App() {
  const { loginWithRedirect } = useAuth0();
  const [tokens, setTokens] = useState("")
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    console.log(accounts)
  });

  window.ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });

  window.ethereum.on('disconnect',()=>{
    console.log('Disconnect')
  });

  window.ethereum.on('message',(message)=>{
    console.log('Message received')
    console.log(message)
  })

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account)
  }

  async function getChainID(){
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(chainId)
  }

  async function getMyWallet(){
    const amber = 'UAK75bed94d4381b4c3525cd20495579202'
    axios.get('https://web3api.io/api/v2/addresses/0x95abDa53Bc5E9fBBDce34603614018d32CED219e/token-balances/latest?includePrice=true&fields=symbol,address,price_amount_quote,price_amount_total',{
      headers:{
        'x-amberdata-blockchain-id':'1c9c969065fcd1cf',
        'x-api-key':amber
      }
    }).then((repos) => {
      const allRepos = repos.data;
      console.log(allRepos)
      setTokens(allRepos)
    });
  }

  async function getContractDetails(){
    const amber = 'UAK75bed94d4381b4c3525cd20495579202'
    axios.get('https://web3api.io/api/v2/contracts/0x33Df153Fc823f3Ac4c051EDCdDf82f161aBEfa54',{
      headers:{
        'x-amberdata-blockchain-id':'1c9c969065fcd1cf',
        'x-api-key':amber
      }
    }).then((repos) => {
      const allRepos = repos.data;
      console.log(allRepos)
      
    });
  }

  console.log(window.ethereum.isConnected())

  function AI(props){
    return (
      <div className="w-full">
        <div className="font-serif font-thin text-xl w-full pb-8 border px-4 pt-4 shadow-xl rounded-lg bw">
        {props.name}<br />{props.amount}
          
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* <button onClick={() => loginWithRedirect()}>Log In</button>
      <div class="sharethis-inline-share-buttons"></div>
      <button onClick={()=>getAccount()}>Enable Ethereum</button>
      <button onClick={()=>getChainID()}>Get ChainID</button> */}
      <button onClick={()=>getMyWallet()}>Get Wallet</button><br/>
      <button onClick={()=>getContractDetails()}>Get Contract Details</button><br/>
      {tokens===""?(<div>nothing</div>):(tokens.payload.records.length>0?<div>{tokens.payload.records.map((item)=>AI(item))}</div>:<div>No Holding</div>)}
    </div>
  );
}

export default App;
