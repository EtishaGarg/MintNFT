require('dotenv').config()

const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
const clientURL = `https://rpc-mumbai.maticvigil.com`;
const provider = new HDWalletProvider(mnemonic, clientURL);
const web3 = new Web3(provider);

const data = require('../build/contracts/ArtCollectible.json');
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;

const deploy = async() => {
  const accounts = await web3.eth.getAccounts(); //Because we could have multiple accounts on our Metamask wallet

  console.log('Attempting to deploy from account', accounts[0]);

  const art = await new web3.eth.Contract(abiArray,contract_address)
  await art.methods.mintNFT('https://ipfs.io/ipfs/Qmdi4meC2rRhtqzTJHqHa4WtC14NkvavDid3TXsv59DDvt').send({from: accounts[0], gas: '1000000'});
  console.log("Yay! NFT is minted");

};

deploy();