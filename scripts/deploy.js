const { ethers , run,network} = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  //ERC721 Contract Deploying
  const ERC721 = await ethers.getContractFactory("ERC721Custom");
  const ERC721Contract = await ERC721.deploy();
  await ERC721Contract.deployed();
  console.log(`ERC721 Contract deployed to ${ERC721Contract.address}`)
  //ERC721 Contract verification
  if(network.config.chainId===97&& process.env.BINANCE_MAINNET_API ){
    await ERC721Contract.deployTransaction.wait(6);
    console.log("ERC721 Contract Verification on Binance Network");
    await verify(ERC721Contract.address,[])
  }
  else if(network.config.chainId===80001&& process.env.POLYGON_MAINNET_API){
    await ERC721Contract.deployTransaction.wait(6);
    console.log("ERC721 Contract Verification on Polygon Network");
    await verify(ERC721Contract.address,[])
  }
  else if(network.config.chainId===5&& process.env.ETHEREUM_MAINET_API){
    await ERC721Contract.deployTransaction.wait(6);
    console.log("ERC721 Contract Verification on Goerli Network");
    await verify(ERC721Contract.address,[])
  }
}

async function verify (contractAddress,args){
  console.log("verifying contract....")
  try{
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
 }catch(e)
 {
  if(e.message.toLowerCase().includes("already verified")){
    console.log("Already verified!");
  }else{
  console.log(e)
  }
 }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
