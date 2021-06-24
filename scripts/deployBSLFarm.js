const { providers, BigNumber } = require("ethers");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // deploy bsl farm
  const BSLFarm = await ethers.getContractFactory("BSLFarm");

  const rewardingToken = "0xA733493Bfc5C0D0bA42c77015f250F9361AFbA0e";
  //300.000 BSL per month => 0.34722222222 BSL per block
  const rewardTokenPerBlock = (0.34722222222 * 10 ** 18).toString();
  //start at block 1000000
  const startBlock = "100000";

  const bslFarm = await BSLFarm.deploy(
    rewardingToken,
    rewardTokenPerBlock,
    startBlock
  );

  await bslFarm.deployed();
  await run("verify:verify", {
    address: bslFarm.address,
    constructorArguments: [rewardingToken, rewardTokenPerBlock, startBlock],
  });

  console.log("Deploy contract bsl Farm at :", bslFarm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
