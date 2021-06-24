const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // deploy bsl farm
  const ZapBSC = await ethers.getContractFactory("ZapBSC");

  const zapBSC = await ZapBSC.deploy();

  await zapBSC.deployed();
  await run("verify:verify", {
    address: zapBSC.address,
    constructorArguments: [],
  });

  console.log("Deploy contract ZapBSC at :", zapBSC.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
