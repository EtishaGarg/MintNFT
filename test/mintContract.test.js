
const assert = require('assert');
const Web3 = require('web3'); //Portal to the ethereum world
const web3 = new Web3('HTTP://127.0.0.1:7545'); // Will change based on the Ethereum network we want to connect to. Always have to specify a provider to web3
const data = require('../build/contracts/mintContract.json');
const abiArray = data.abi;
const contract_address = '0xf66cE6dCEa240C74c243dE907B090E36Bf99DAbe';

let accounts;
let art;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    art = await new web3.eth.Contract(abiArray,contract_address)
});

describe('ArtCollectible', () => {

    it('checks the owner', async () =>{
        let owner = await art.methods.owner().call()
        assert.equal(owner,accounts[0])
    });

    it('checks owner of Token ID 1', async () => {
        const tokenURI = 'ABCD';
        await art.methods.mintNFT(tokenURI).send({from: accounts[0], gas: '1000000'});
        //let balance = await art.methods.balanceOf(accounts[0]).call()
        let owner = await art.methods.ownerOf(1).call();
        assert.equal(owner,accounts[0]);
    });
});