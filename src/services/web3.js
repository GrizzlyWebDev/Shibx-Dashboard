import Web3 from "web3";
import axios from "axios";
import Decimal from "decimal.js";


const abi = require("@/contract/abi.json");

const web3 = new Web3("https://bsc-dataseed.binance.org/");

export async function getTokenTxs(wallet) {
  let query = `query($network: EthereumNetwork!, $address: String!, $wallet: String!) {
    ethereum(network: $network) {
        address(address: { is: $wallet }) {
            balances(currency: { is: $address }) {
                history {
                    value
                    transferAmount
                    timestamp
                    block
                }
                value
            }
        }
    }
  }
  `;
  let variables = {
    network: "bsc",
    wallet: wallet,
    address: "0xaA357b0F167923Efc1D6978a868f81866cA6E98c",
  };
  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}

export async function getAllTokenTxs() {
  let query = `{
    ethereum(network: bsc) {
      transfers(options: {desc: "block.timestamp.time", limit: 100000, offset: 0}, date: {since: "2021-05-25", till: null}, amount: {gt: 0}, currency: {is: "0xaA357b0F167923Efc1D6978a868f81866cA6E98c"}) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        sender {
          address
          annotation
        }
        receiver {
          address
          annotation
        }
        transaction {
          hash
        }
        amount
        currency {
          symbol
        }
        external
      }
    }
  }`
  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query},
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}

export async function getRewardTxs(wallet) {
  let query = `
  query ($network: EthereumNetwork!,
          $address: String!,
          $receiver: String!,
          $limit: Int!,
          $offset: Int!,
          $currency: String!,
          
          $from: ISO8601DateTime,
          $till: ISO8601DateTime){
ethereum(network: $network){
transfers(options:{desc: "block.timestamp.time", limit: $limit, offset: $offset},
  date: {since: $from till: $till },
  amount: {gt: 0},
  currency: {is: $currency},
  
  sender: {is: $address},
  receiver: {is: $receiver}

  ) {

  block {
    timestamp {
      time (format: "%Y-%m-%d %H:%M:%S")
    }
    height
  }
  address: receiver {
    address
    annotation
  }
  currency {
    address
    symbol
  }
  amount
  transaction {
    hash
  }
  external
}
}
}`;
  let variables = {
    limit: 10000,
    offset: 0,
    network: "bsc",
    address: "0xE247f989fF0827eE5fb20EFC512cf8E71da4FA4a",
    currency: "0x2859e4544c4bb03966803b044a93563bd2d0dd4d",
    receiver: wallet,
    from: null,
    till: null,
    dateFormat: "%Y-%m"
  }

  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}
export async function getShibTxs(wallet) {
  let query = `
  query ($network: EthereumNetwork!,
          $address: String!,
          $limit: Int!,
          $offset: Int!,
          $currency: String!,
          
          $from: ISO8601DateTime,
          $till: ISO8601DateTime){
ethereum(network: $network){
transfers(options:{desc: "block.timestamp.time", limit: $limit, offset: $offset},
  date: {since: $from till: $till },
  amount: {gt: 0},
  currency: {is: $currency},
  sender: {is: $address},

  ) {

  block {
    timestamp {
      time (format: "%Y-%m-%d %H:%M:%S")
    }
    height
  }
  address: receiver {
    address
    annotation
  }
  currency {
    address
    symbol
  }
  amount
  transaction {
    hash
  }
  external
}
}
}`;
  let variables = {
    limit: 10000,
    offset: 0,
    network: "bsc",
    address: wallet,
    currency: "0x2859e4544c4bb03966803b044a93563bd2d0dd4d",
    from: null,
    till: null,
    dateFormat: "%Y-%m"
  }

  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}

export function getRewardTotal(reward){
  var total = 0;
  if (reward.data.data.ethereum.transfers.length != 0){
    for (var idx=0; idx <= reward.data.data.ethereum.transfers.length-1; idx++) {
      total += reward.data.data.ethereum.transfers[idx].amount;
    }
  } else {
    total = 0;
  }
  return total;
}

export async function getAllTxs(wallet) {
  let query = `query($network: EthereumNetwork!, $wallet: String!) {
    ethereum(network: $network) {
        address(address: { is: $wallet }) {
            balances {
                currency {
                  address
                  symbol
                  decimals
                  name
              }
              history {
                  value
                  transferAmount
                  timestamp
                  block
              }
              value
            }
        }
    }
  }
  `;
  let variables = {
    network: "bsc",
    wallet: wallet,
  };
  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}
export async function outFlowTxs(wallet) {
  let query = `query ($network: EthereumNetwork!,
    $address: String!,
    $offset: Int!
    $from: ISO8601DateTime,
    $till: ISO8601DateTime){
ethereum(network: $network){
transfers(options:{desc: "block.timestamp.time"  asc: "currency.symbol" offset: $offset},
date: {since: $from till: $till },
amount: {gt: 0},
sender: {is: $address}) {

block {
timestamp {
time (format: "%Y-%m-%d %H:%M:%S")
}
height
}
address: sender {
address
annotation
}
currency {
address
symbol
}
amount
transaction {
hash
}
external
}
}
}`;
  let variables = {"offset":0,"network":"bsc","address":wallet,"currency":"","from":null,"till":null,"dateFormat":"%Y-%m"}

  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}
export async function inFlowTxs(wallet) {
  let query = `query ($network: EthereumNetwork!,
    $address: String!,
    $offset: Int!
    $from: ISO8601DateTime,
    $till: ISO8601DateTime){
ethereum(network: $network){
transfers(options:{desc: "block.timestamp.time"  asc: "currency.symbol" offset: $offset},
date: {since: $from till: $till },
amount: {gt: 0},
receiver: {is: $address}) {

block {
timestamp {
time (format: "%Y-%m-%d %H:%M:%S")
}
height
}
address: sender {
address
annotation
}
currency {
address
symbol
}
amount
transaction {
hash
}
external
}
}
}
  `;
  let variables = {"offset":0,"network":"bsc","address":wallet,"from":null,"till":null,"dateFormat":"%Y-%m"}

  return await axios({
    method: "post",
    url: "https://graphql.bitquery.io",
    data: { query, variables },
    headers: {
      "X-API-KEY": "BQY6NTTBM0qaPTGs0oVPCWwjrL8lbh92",
    },
  });
}
export async function getTokenBalanceWeb3(token, wallet, decimals) {
  try {
    var tokenInst = new web3.eth.Contract(abi, token);
    let val = await tokenInst.methods.balanceOf(wallet).call();
    return convertDecimal(val, decimals).toFixed(3);
  } catch (e) {
    console.log(e);
  }
}

export async function getBnbToUsd() {
  return axios
    .get("https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD")
    .then((response) => {
      return response.data.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getBurnt(token, decimals) {
  let burnt = await getTokenBalanceWeb3(
    token,
    "0x000000000000000000000000000000000000dead",
    decimals
  );

  if (burnt == 0) {
    burnt = await getTokenBalanceWeb3(
      token,
      "0x0000000000000000000000000000000000000001",
      decimals
    );
  }

  return burnt;
}

export async function getTokenTotalSupply(token, decimals) {
  try {
    var tokenInst = new web3.eth.Contract(abi, token);
    let supply = await tokenInst.methods.totalSupply().call();
    return convertDecimal(supply, decimals).toFixed();
  } catch (e) {
    console.log(e);
  }
}


export async function getTokenToBnb(pair, balance) {
  try {
    var pairContract = await new web3.eth.Contract(abi, pair);

    let token1Address = await pairContract.methods.token1().call();
    let token0Address = await pairContract.methods.token0().call();

    let token1Decimals = await getTokenDecimals(token1Address);
    let token0Decimals = await getTokenDecimals(token0Address);

    let reserves = await getReserves(pair);
    let reserve0 = parseFloat(
      convertDecimal(reserves.reserve0, token0Decimals).toFixed()
    );
    let reserve1 = parseFloat(
      convertDecimal(reserves.reserve1, token1Decimals).toFixed()
    );


    let val = 1 / (reserve1 / reserve0);

    let exchangeVal =
      reserve0 - (reserve0 * reserve1) / (parseFloat(balance) + reserve1);

    if (val > 1) {
      val = 1 / (reserve0 / reserve1);
      exchangeVal =
        reserve1 - (reserve0 * reserve1) / (parseFloat(balance) + reserve0);
    }
    return {
      price: val,
      exchangeVal: exchangeVal,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getReserves(pair) {
  try {
    var pairContract = await new web3.eth.Contract(abi, pair);

    return await pairContract.methods.getReserves().call();
  } catch (e) {
    console.log(e);
  }
}

export async function checkAddress(address) {
  if (
    address == "0x000000000000000000000000000000000000dead" ||
    address == "0x0000000000000000000000000000000000000001"
  ) {
    return false;
  }
  let valid = await web3.utils.isAddress(address);
  return valid;
}
export function convertDecimal(token_amount, token_decimal) {
  return new Decimal(token_amount).dividedBy(Decimal.pow(10, token_decimal));
}

export async function getTokenDecimals(address) {
  var contract = await new web3.eth.Contract(abi, address);

  return await contract.methods.decimals().call();
}
