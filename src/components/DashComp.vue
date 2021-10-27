<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="12">
        <v-row>
          
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loading"
            >
              <v-card-title class="headline font-weight-bold"
                >Total Burned</v-card-title
              >
              <v-card-text class="c-card__text text-weight-600"
                >{{ burnt }} ({{ burntPerc }})
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loading"
            >
              <v-card-title class="headline font-weight-bold"
                >Market Cap</v-card-title
              >
              <v-card-text class="c-card__text text-weight-600"
                >${{ cap }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loading"
            >
              <v-card-title class="headline font-weight-bold"
                >Circulating Supply</v-card-title
              >
              <v-card-text class="c-card__text text-weight-600">{{
                circSup
              }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loadingShib"
            >
              <v-card-title class="headline font-weight-bold"
                >Total Shib Rewarded 
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  icon
                  href="https://bscscan.com/address/0xE247f989fF0827eE5fb20EFC512cf8E71da4FA4a"
                  target="_blank"
                >
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="c-card__text text-weight-600">{{
                balanceShib
              }} ({{balanceShibUSD}})</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loadingLiq"
            >
              <v-card-title class="headline font-weight-bold"
                >Liquidity Pool Balance
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  icon
                  href="https://bscscan.com/address/0x2BD26aAb74d0484A905166420b1aae13DB6C07bB"
                  target="_blank"
                >
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="c-card__text text-weight-600">{{
                balanceLiq
              }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="card-gradient"
              dark
              color="#ffffff"
              elevation="10"
              :loading="loadingLiq"
            >
              <v-card-title class="headline font-weight-bold"
                >Liquidity Locked Until
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  icon
                  href="https://www.pinksale.finance/#/pinklock/record/135?chain=BSC"
                  target="_blank"
                >
                  <v-icon>mdi-lock-clock</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="c-card__text text-weight-600">{{
                timer
              }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col col="12">
        <v-card
          class="card-gradient"
          dark
          color="#ffffff"
          elevation="2"
          :loading="loadingMarket"
        >
          <v-card-title class="headline font-weight-bold"
            >Marketing Wallet Balance
            <v-spacer></v-spacer>
            <v-btn
              color="white"
              icon
              @click="fetchMarketing"
              :disabled="loadingMarket"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              color="white"
              icon
              href="https://bscscan.com/address/0x99f3c7388A360EAA292cA653E367301931B4696A"
              target="_blank"
            >
              <v-icon>mdi-wallet-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="c-card__text text-weight-600"
            >{{ balanceMarketing }}
          </v-card-text>
        </v-card>

        <h4 class="my-6">Marketing Wallet Transactions</h4>
        <v-data-table
          dark
          class="elevation-1 mytable"
          @click:row="handleClick"
          :items-per-page="6"
          fixed-header
          :loading="loadingMarket"
          :headers="headersMarketing"
          :items="marketingTxsData"
          :item-class="row_classes"
          :footer-props="{
            'items-per-page-options': [6],
          }"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiInformationOutline } from "@mdi/js";


import {
  getBnbToUsd,
  getTokenBalanceWeb3,
  getTokenTotalSupply,
  getTokenToBnb,
  getBurnt,
  getShibTxs,
  getRewardTotal,
  inFlowTxs,
  outFlowTxs,
  convertDecimal,
} from "@/services/web3";

export default {
  data: () => ({
    infoIcon: mdiInformationOutline,
    headersMarketing: [
      {
        text: "Block",
        align: "start",
        sortable: false,
        value: "block",
      },
      { text: "Transaction amount", value: "transferAmount", align: "end" },
      { text: "Currency", value: "currency" },
      { text: "Date", value: "timestamp", align: "end" },
    ],
    burnt: 0,
    burntPerc: 0,
    balance: 0,
    balanceMarketing: 0,
    balanceLiq: 0,
    balanceShib: 0,
    balanceShibUSD: 0,
    circSup: 0,
    loading: false,
    loadingMarket: false,
    loadingLiq: false,
    loadingShib: false,
    balanceUsd: 0,
    wallet: "0xaA357b0F167923Efc1D6978a868f81866cA6E98c",
    earned: 0,
    earnedUsd: 0,
    cap: 0,
    current: 0,
    transactionBalance: null,
    txs: [],
    marketingTxsData: [],
    resetTxs: false,
    interval: null,
    timer: "",
  }),

  mounted() {
    this.wallet = "0xaA357b0F167923Efc1D6978a868f81866cA6E98c";
    this.fetchData();
    this.fetchShib();
    this.fetchMarketing();
    this.fetchLiq();
  },
  created() {
       setInterval(this.countDown, 1000);
    },
  methods: {
     countDown(){
       
 let countDownDate = new Date("2022-01-07T20:57:00Z").getTime();

 

   
   let now = new Date().getTime();
    
   
   let distance = countDownDate - now;
    
   
   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
   let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
   
   this.timer = days + "d " + hours + "h "
   + minutes + "m " + seconds + "s ";
    
   
   if (distance < 0) {
     clearInterval();
     this.timer = "Liquidity Unlocked!";
   }
   return {
     timer: this.timer
   }
 },
    
    row_classes(item) {
      return item.type;
    },
    handleClick(row) {
      window.open("https://bscscan.com/tx/" + row.hash);
    },
    async fetchShib() {
      this.loadingShib = true;
      let reward = await getShibTxs("0xE247f989fF0827eE5fb20EFC512cf8E71da4FA4a");
               this.latestReward = (reward.data.data.ethereum.transfers[0].block.timestamp.time);
               let latestTxnHash = (reward.data.data.ethereum.transfers[0].transaction.hash);
               this.url = ("https://bscscan.com/tx/" + latestTxnHash);
             
             let totalShib = await getRewardTotal(reward);
             let balance = await getTokenBalanceWeb3(
              "0xaA357b0F167923Efc1D6978a868f81866cA6E98c",
              this.wallet,
              4
            );
             let bnbToUsd = await getBnbToUsd();
             let pair = "0x6b7b3523a6660a5fce3c28e1536cc8dd8d57f7e0";
             let tokenToBnbResp = await getTokenToBnb(pair, balance);
             let tokenToBnb = tokenToBnbResp.price;
             let exchangeVal = tokenToBnbResp.exchangeVal;
             if (tokenToBnb == null) {
               return;
             }
             let tokenToUsd = tokenToBnb * bnbToUsd;
             let balanceUsd = (balance * tokenToUsd).toFixed(2);
             let exchangeValUsdt = exchangeVal * 0.98 * bnbToUsd;
             if (exchangeValUsdt > balanceUsd) {
               exchangeValUsdt = balanceUsd;
             }
             let ShibtoBNB = (tokenToBnb * bnbToUsd * 1).toFixed(10);
             this.balanceShibUSD = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(ShibtoBNB * totalShib);
             this.balanceShib = this.numberWithCommas(parseFloat(totalShib).toFixed(2));
      this.loadingShib = false;
    },
    async fetchData() {
        this.loading = true;
          let balance = await getTokenBalanceWeb3(
            "0xaA357b0F167923Efc1D6978a868f81866cA6E98c",
            this.wallet,
            5
          );
          let earned = parseFloat(balance)
          let tokenData = await this.getTokenData(balance, earned);
          this.burnt = this.numberWithCommas(tokenData.burnt);
          this.burntPerc =
            parseFloat((tokenData.burnt / tokenData.supply) * 100).toFixed(2) +
            "%";
          this.cap = tokenData.cap;
          this.circSup = tokenData.circSup;
          this.loading = false;
      },

    async fetchMarketing() {
      this.loadingMarket = true;
      let Marketing = await inFlowTxs(
        "0x99f3c7388A360EAA292cA653E367301931B4696A"
      );

        let marketingTxsData = [];
        Marketing.data.data.ethereum.transfers.map(async (mtxItem) => {
                  let mtxRow = {
                  type: "buy",
                  hash: mtxItem.transaction.hash,
                  transferAmount: this.numberWithCommas(parseFloat(mtxItem.amount).toFixed(2)),
                  timestamp: mtxItem.block.timestamp.time,
                  block: mtxItem.block.height,
                  currency: mtxItem.currency.symbol,
                }
                marketingTxsData.push(mtxRow);
              });
        let MarketingOut = await outFlowTxs(
         "0x99f3c7388A360EAA292cA653E367301931B4696A"
        );
              MarketingOut.data.data.ethereum.transfers.map(async (mtxItem) => {
                  let mtxRow = {
                  type: "sell",
                  hash: mtxItem.transaction.hash,
                  transferAmount: this.numberWithCommas(parseFloat(mtxItem.amount *-1).toFixed(2)),
                  timestamp: mtxItem.block.timestamp.time,
                  block: mtxItem.block.height,
                  currency: mtxItem.currency.symbol,
                }
                marketingTxsData.push(mtxRow);
              });
        let txsMTable = marketingTxsData.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        this.marketingTxsData = txsMTable;
        let bnbToUsd = await getBnbToUsd();
        let MBalance = await this.axios({
          method: "get",
          url: "https://api.bscscan.com/api?module=account&action=balance&address=0x99f3c7388A360EAA292cA653E367301931B4696A&tag=latest&apikey=QWZRFARREHKQXIRG11FQS9TII8524DE8B4",
        });
        MBalance = await convertDecimal(MBalance.data.result, 18).toFixed(2);
        let totalUsd = MBalance * bnbToUsd;
        this.balanceMarketing = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(totalUsd).toFixed(2));
        this.loadingMarket = false;
    },

    
    async fetchLiq() {
      this.loadingLiq = true;
      let bnbToUsd = await getBnbToUsd();
      let LiqBalance = await this.axios({
        method: "get",
        url: "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&address=0x2BD26aAb74d0484A905166420b1aae13DB6C07bB&apikey=MGQDPUN5QVS2FVII27I73CP7WFPM2CHJRB",
      });
      LiqBalance = await convertDecimal(LiqBalance.data.result, 18).toFixed(2);
      let totalUsd = +LiqBalance * bnbToUsd;
      this.balanceLiq = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(totalUsd).toFixed(2));
      this.loadingLiq = false;
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getTokenData(balance, earned) {
      let vm = this;
      let decimals = 4;

      let bnbToUsd = await getBnbToUsd();
      let token = "0xaA357b0F167923Efc1D6978a868f81866cA6E98c";
      let pair = "0x2BD26aAb74d0484A905166420b1aae13DB6C07bB";
      let supply = await getTokenTotalSupply(token, decimals);

      let tokenToBnbResp = await getTokenToBnb(pair, balance);

      let tokenToBnb = tokenToBnbResp.price;
      let exchangeVal = tokenToBnbResp.exchangeVal;

      if (tokenToBnb == null) {
        return;
      }

      let tokenToUsd = tokenToBnb * bnbToUsd;

      let balanceUsd = (balance * tokenToUsd).toFixed(2);

      let exchangeValUsdt = exchangeVal * 0.98 * bnbToUsd;

      if (exchangeValUsdt > balanceUsd) {
        exchangeValUsdt = balanceUsd;
      }

      let exchangeValUsdtFormated = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(exchangeValUsdt).toFixed(2));

      let burnt = await getBurnt(token, decimals);
      let circSup = parseFloat(supply) - parseFloat(burnt);
      let cap =
        (parseFloat(supply) - parseFloat(burnt)) *
        parseFloat(tokenToBnb) *
        parseFloat(bnbToUsd);
      let earnedUsd = 0;
      if (earned) {
        earnedUsd = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format((earned * tokenToUsd).toFixed(2));
      }

      return {
        decimals: decimals,
        balance: vm.numberWithCommas(balance),
        burnt: burnt,
        circSup: vm.numberWithCommas(parseFloat(circSup).toFixed(2)),
        earned: vm.numberWithCommas(parseFloat(earned).toFixed(3)),
        earnedNum: earned,
        earnedUsd: earnedUsd,
        currentBal: balance,
        exchangeValUsdt: exchangeValUsdtFormated,
        balanceUsd: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(balanceUsd),
        balanceUsdNum: balanceUsd,
        current: (tokenToBnb * bnbToUsd * 1).toFixed(10),
        cap: vm.numberWithCommas(parseFloat(cap).toFixed(2)),
        address: token,
        supply: supply,
      };
    },
  },
};
</script>
