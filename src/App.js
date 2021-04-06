import './App.css';
import React,{useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
// import TokenDisplay from './Components/TokenDisplay'
import Web3 from 'web3';
import useForm from './util/hook';
import { Formik, Form, Field } from 'formik';

//  from Web3
//Markcuba: 0x95abDa53Bc5E9fBBDce34603614018d32CED219e
//my: 0x723d170F1795F6365f0546Fb28288a08e7e86327
function App() {
  // const { loginWithRedirect } = useAuth0();
  const [tokens, setTokens] = useState("")
  // const { values, onChange, onSubmit } = useForm(createPostCallback, {
	// 	address: "",
	// });
  const BN = Web3.utils.BN
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

  function createPostCallback() {
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

  // async function getAccount() {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   const account = accounts[0];
  //   console.log(account)
  // }

  // async function getChainID(){
  //   const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  //   console.log(chainId)
  // }

  async function getMyWallet(address){
    const amber =  process.env.REACT_APP_AMBER;
    axios.get('https://web3api.io/api/v2/addresses/'+address+'/token-balances/latest?includePrice=true&fields=symbol,address,price_amount_quote,price_amount_total',{
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
    const amber = process.env.REACT_APP_AMBER;
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
    

    const balanceWeiString = props.amount
    const balanceWeiBN = new BN(balanceWeiString)

    const decimals = props.decimals
    const decimalsBN = new BN(decimals)
    const divisor = new BN(10).pow(decimalsBN)

    const beforeDecimal = balanceWeiBN.div(divisor)
    // const afterDecimal  = balanceWeiBN.mod(divisor)

    // console.log(beforeDecimal.toString())    // >> 31
    // console.log(afterDecimal.toString())     // >> 415926500000000000
    return (
      <div className="w-full">
        <div className="font-serif font-thin text-xl w-full pb-8 border px-4 pt-4 shadow-xl rounded-lg bw">
        {props.name}<br />{beforeDecimal.toString()}
          
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
      {/* <button onClick={()=>getMyWallet()}>Get Wallet</button><br/>
      <button onClick={()=>getContractDetails()}>Get Contract Details</button><br/> */}
      
      {/* <div class="mt-5 md:mt-0 md:col-span-2">
      <form action="#" onSubmit={getMyWallet}>
              <div class="col-span-6 sm:col-span-3">
                <label class="block text-sm font-medium text-gray-700">Wallet Address</label>
                <input type="text" onChange={onChange} name="first_name" id="walletAddress" value={values.address} class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get Wallet
            </button>
          </div>
        
      </form>
      </div> */}
      <Formik
       initialValues={{ address: '' }}
       onSubmit={(values, { setSubmitting }) => {
         console.log("Submitting")
         setTokens("")
         getMyWallet(values.address)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="address" />
           <button type="submit">
             Submit
           </button>
         </Form>
       )}
     </Formik>
      {tokens===""?(<div>nothing</div>):(tokens.payload.records.length>0?<div class="grid grid-flow-row grid-cols-3 gap-4">{tokens.payload.records.map((item)=>AI(item))}</div>:<div>No Holding</div>)}
    </div>
  );
}

export default App;
