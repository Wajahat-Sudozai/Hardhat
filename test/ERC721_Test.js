const { expect, assert} = require("chai");
const { ethers, network } = require("hardhat");
var should = require('chai').should();


describe("ERC721 Contract",function() {
  let ERC721;
  let ERC721contract;
  let Admin;
  let User1;
  let Users;

  before(async function(){
      ERC721=await ethers.getContractFactory("ERC721Custom");
      [Admin,User1,...Users]=await ethers.getSigners();
      ERC721contract=await ERC721.deploy();
      await ERC721contract.deployed();
      console.log(`ERC721 deployed to : ${ERC721contract.address}`);
  });

  describe("Deployed Successfully"+" + Positive Case", function () {
    it("Should set the right Name", async function () {
      expect(await ERC721contract.name()).to.equal('WAJAHAT');
      console.log(`ERC721 Name : ${await ERC721contract.name()}`);
    });
    it("Should set the right Symbol", async function () {
      expect(await ERC721contract.symbol()).to.equal('WAJ');
      console.log(`ERC721 Symbol : ${await ERC721contract.symbol()}`);
    });
  });
  describe("Minting NFT"+" + Positive Case", function () {
    it("Should Mint#1 successfully", async function () {
      await ERC721contract.safeMint("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://gateway.pinata.cloud/ipfs/QmYoiDbJPgcMeUqHefWTz2Tm7Yez3mhFnbJNq86oVoegyD");
      // await new Promise(resolve => setTimeout(resolve, 60000));
      expect(await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")).to.equal(1);
      expect(await ERC721contract.ownerOf(0)).to.equal("0x648523d25c92310B283cf08dAc4169BE6d4c9200");
      console.log(`Owner of NFT#1 is  : ${await ERC721contract.ownerOf(0)}`);
      console.log(`Balance of Address(0x648523d25c92310B283cf08dAc4169BE6d4c9200) is  : ${await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")}`);

    });
    it("Should Mint#2 successfully", async function () {
      await ERC721contract.safeMint("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://gateway.pinata.cloud/ipfs/QmTyDT2AmZqjakCseyvyMHiqseqcvcZ9vg8MXQqpPGhGd8");
      // await new Promise(resolve => setTimeout(resolve, 60000));
      // await ethers.provider.send("evm_setNextBlockTimestamp", [1625097600])
      // await ethers.provider.send("evm_mine")
      assert.equal((await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")), 2,"Balance is equal to 2");  //with msg
      assert.equal((await ERC721contract.ownerOf(1)), "0x648523d25c92310B283cf08dAc4169BE6d4c9200");  //without msg
      console.log(`Owner of NFT#2 is  : ${await ERC721contract.ownerOf(1)}`);
      console.log(`Balance of Address(0x648523d25c92310B283cf08dAc4169BE6d4c9200) of NFT#2 is  : ${await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")}`)
    });
    it("Should Mint#3 successfully", async function () {
      await ERC721contract.safeMint("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://gateway.pinata.cloud/ipfs/QmPwfRte7AfqNNZ8Y4RUGGJ1oB3qixjDvASzd4vSH9vLr8");
      // await new Promise(resolve => setTimeout(resolve, 60000));
      (await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")).should.equal(3);
      (await ERC721contract.ownerOf(2)).should.equal("0x648523d25c92310B283cf08dAc4169BE6d4c9200");
      console.log(`Owner of NFT#3 is  : ${await ERC721contract.ownerOf(2)}`);
      console.log(`Balance of Address(0x648523d25c92310B283cf08dAc4169BE6d4c9200)  is  : ${await ERC721contract.balanceOf("0x648523d25c92310B283cf08dAc4169BE6d4c9200")}`)
    });
  });
  

});
