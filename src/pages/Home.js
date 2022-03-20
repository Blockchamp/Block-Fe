import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { BigNumber, ethers } from "ethers";
import abi from "../utils/staking.json";

export default function Home() {
  const contractAddress = "0xC3b80E3Ce3A053bcD046Bbd17C8526556f7a87EA";
  const contractABI = abi.abi;
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [staked, setStacked] = useState(0);
  const [token, setToken] = useState(0);
  const stakeRef = useRef();
  const addressRef = useRef();
  const amountRef = useRef();

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
  }, []);

  const cl = () => {
    setLoading1("false");
    getToken();
    console.log("token staked");
  };

  const reward = () => {
    getToken();
    console.log("get reward");
  };

  const transfer_amount = () => {
    getToken();
    console.log("token transffered");
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
      setLoading1("true");
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
        console.log("Mining...", stakeTxn.hash);

        getToken();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReward = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
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
      console.log(error);
    }
  };

  const transfer = async () => {
    try {
      setLoading1("true");
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
              <div>Stake Token</div>
              <input
                type="text"
                ref={stakeRef}
                placeholder="Enter your stake"
              />
              <button onClick={stakeToken}>Stake Token</button>
            </div>

            {loading1 === "true"
              ? "loading"
              : loading1 === "false"
              ? "Staked successfully"
              : ""}
          </div>
          <div style={{ marginBottom: "30px" }}>
            Token Balance : {loading === true ? "loading" : token}
          </div>
          <div style={{ marginBottom: "30px" }}>
            <div>Transfer Token</div>
            <input
              style={{ display: "block", marginBottom: "10px" }}
              type="text"
              ref={addressRef}
              placeholder="Enter your address"
            />
            <input
              style={{ display: "block", marginBottom: "10px" }}
              type="text"
              ref={amountRef}
              placeholder="Enter Amount"
            />
            <button onClick={transfer}>Transfer</button>
            {loading2 === true ? "loading" : ""}
          </div>

          <button onClick={getReward}>Get Reward</button>
        </div>
      </div>
    </div>
  );
}
