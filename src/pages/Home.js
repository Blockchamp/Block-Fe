import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { BigNumber, ethers } from "ethers";
import abi from "../utils/staking.json";

export default function Home() {
  const contractAddress = "0xC316300aBE69f0Ef0Ed5F18ab70054C7Efe41096";
  const contractABI = abi.abi;
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [staked, setStacked] = useState(0);
  const [token, setToken] = useState(0);
  const stakeRef = useRef();
  const addressRef = useRef();
  const addressRef2 = useRef();
  const amountRef = useRef();
  const etherAmountRef = useRef();

  useEffect(() => {
    getToken();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    stakingContract.on("Stake", cl);
    stakingContract.on("Reward", reward);
    stakingContract.on("Transfer", transfer_amount);
    stakingContract.on("Buy", bought);
    return () => {
      if (stakingContract) {
        stakingContract.off("Stake", cl);
        stakingContract.off("Reward", reward);
        stakingContract.off("Transfer", transfer_amount);
        stakingContract.off("Buy", bought);
      }
    };
  }, []);

  const cl = () => {
    setLoading1(false);
    window.alert("Token staked successfully");
    getToken();
  };

  const reward = (rew, rew2, rew3) => {
    setLoading4(false);
    if (rew3 === false) {
      window.alert("You are not eligible to get reward yet");
    } else {
      window.alert("Congratulations, you have claimed your weekly reward");
    }
    getToken();
  };

  const transfer_amount = () => {
    setLoading2(false);
    window.alert("JToken was transferred successfully");
    getToken();
  };

  const bought = () => {
    setLoading3(false);
    window.alert("JToken was purchased successfully");
    getToken();
  };

  const getToken = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const tokenStaked = await stakingContract.getTokenStacked(accounts[0], {
          gasLimit: 300000,
        });
        const tokenBalance = await stakingContract.balanceOf(accounts[0], {
          gasLimit: 300000,
        });
        setStacked(Number(BigNumber.from(tokenStaked).toString()) / 10 ** 18);
        setToken(Number(BigNumber.from(tokenBalance).toString()) / 10 ** 18);
        setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stakeToken = async () => {
    try {
      setLoading1(true);
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let stake = BigNumber.from(String(stakeRef.current.value * 10 ** 18));
        console.log(stake);
        const stakeTxn = await stakingContract.createStake(stake, {
          gasLimit: 300000,
        });

        stakeRef.current.value = "";

        getToken();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      stakeRef.current.value = "";
      setLoading1(false);
      console.log(error);
    }
  };

  const buyToken = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading3(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const addr = addressRef2.current.value;
        const etherAmount = etherAmountRef.current.value;

        const BuyTxn = await stakingContract.buyToken(addr, {
          gasLimit: 300000,
          value: ethers.utils.parseEther(etherAmount),
        });

        etherAmountRef.current.value = "";
        addressRef2.current.value = "";
        console.log("Mining...", BuyTxn.hash);

        getToken();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      etherAmountRef.current.value = "";
      addressRef2.current.value = "";
      setLoading3(false);
      console.log(error);
    }
  };

  const getReward = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading4(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const rewardTxn = await stakingContract.claimReward({
          gasLimit: 300000,
        });

        stakeRef.current.value = "";
        console.log("Mining...", rewardTxn.hash);

        getToken();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setLoading4(false);
      console.log(error);
    }
  };

  const transfer = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading2(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const addr = addressRef.current.value;
        const amount = BigNumber.from(
          String(amountRef.current.value * 10 ** 18)
        );

        console.log(amount);

        const transferTxn = await stakingContract.transfer(addr, amount, {
          gasLimit: 300000,
        });

        amountRef.current.value = "";
        addressRef.current.value = "";
        console.log("Mining...", transferTxn.hash);

        getToken();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      amountRef.current.value = "";
      addressRef.current.value = "";
      setLoading2(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      <div
        style={{
          marginTop: "100px",
          width: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <div style={{ marginBottom: "30px" }}>
            Tokens Staked - {loading === true ? "loading" : staked}
          </div>
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ marginBottom: "10px" }}>Stake Token</div>
              <input
                style={{ width: "100%", marginBottom: "10px" }}
                type="text"
                ref={stakeRef}
                placeholder="Enter your stake"
              />
              <div>{loading1 === true ? "Staking in progres....." : ""}</div>
              <button onClick={stakeToken}>Stake Token</button>
            </div>
          </div>
          <div style={{ marginBottom: "30px" }}>
            Token Balance : {loading === true ? "loading" : token}
          </div>
          <div style={{ marginBottom: "30px" }}>
            <div>Buy JToken</div>
            <input
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              type="text"
              ref={etherAmountRef}
              placeholder="Enter Amount in ether"
            />
            <input
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              type="text"
              ref={addressRef2}
              placeholder="Enter your address"
            />
            <div>
              {loading3 === true ? "Minting JToken in progres....." : ""}
            </div>
            <button onClick={buyToken}>Buy Token</button>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <div>Transfer Token</div>
            <input
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              type="text"
              ref={addressRef}
              placeholder="Enter your address"
            />
            <input
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              type="text"
              ref={amountRef}
              placeholder="Enter Amount"
            />
            <div>
              {loading2 === true ? "JToken transfer in progres....." : ""}
            </div>
            <button onClick={transfer}>Transfer</button>
          </div>
          <div>
            {loading4 === true ? "Reward Claiming in progres....." : ""}
          </div>
          <button onClick={getReward}>Get Reward</button>
        </div>
      </div>
    </div>
  );
}
