const hre = require("hardhat");

async function main() {
  const ERC721 = await hre.ethers.getContractFactory("ERC721Test");
  const ERC721Contract = await ERC721.deploy();

  await ERC721Contract.deployed();

  console.log(`ERC721 is deployed to : ${ERC721Contract.address}`);
  
  await new Promise(resolve => setTimeout(resolve, 60000));
  const result=await ERC721Contract.mintNFT("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://mwanevents-content.s3.eu-west-2.amazonaws.com/images/zdWUDsQ4xCg2VPVMAjSNCqJ7ztMkgaoiyWT1WmJx.json");
  console.log(result);
  await new Promise(resolve => setTimeout(resolve, 60000));
  await ERC721Contract.mintNFT("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://mwanevents-content.s3.eu-west-2.amazonaws.com/images/7GsyPHy8NA8G2ThkEWRxTfMsDyYisUevyzRlQyDW.json");
  await new Promise(resolve => setTimeout(resolve, 60000));
  await ERC721Contract.mintNFT("0x648523d25c92310B283cf08dAc4169BE6d4c9200","https://mwanevents-content.s3.eu-west-2.amazonaws.com/images/Yo5JEfRpd9lmnbeU164M9ccTWK4mzFeGmmoZ15lT.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
