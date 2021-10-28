import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const abiDiv = require("@/contract/abiDiv.json");

let provider;
let connection;
let accounts;
let chain;
let web3Modal;


export async function init() {
  
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: 'https://bsc-dataseed.binance.org/'
        },
        network: 'binance',
        chainId: 56,
      }
    }
  };

  web3Modal = new Web3Modal({
    network: "binance", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  provider = await web3Modal.connect();
  connection = new Web3(provider);
  accounts = await connection.eth.getAccounts();
}

export async function disconnect(){
  if(provider.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  } else {
    await web3Modal.clearCachedProvider();
    connection.currentProvider._handleDisconnect();
    provider = null;
  }
} 

export async function claimDiv() {
  chain = await connection.eth.getChainId();
  if(chain === 56) {
    let contract = await new connection.eth.Contract(abiDiv, "0xE247f989fF0827eE5fb20EFC512cf8E71da4FA4a");
    await contract.methods.claimDividend().send({from: accounts[0]});
  } else {
    return {alert: true}
  }
}