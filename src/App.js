import logo from './logo.svg';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import detectEthereumProvider from '@metamask/detect-provider'
//Markcuban: 0x95abDa53Bc5E9fBBDce34603614018d32CED219e
function App() {
  const { loginWithRedirect } = useAuth0();
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

  console.log(window.ethereum.isConnected())

  return (
    <div className="App">
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <div class="sharethis-inline-share-buttons"></div>
      <button onClick={()=>getAccount()}>Enable Ethereum</button>
      <button onClick={()=>getChainID()}>Get ChainID</button>
    </div>
  );
}

export default App;
