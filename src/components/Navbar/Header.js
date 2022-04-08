import React, { useState, useEffect, useRef } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const Header = () => {
  return (
    <Navbar className="bg-info h5" expand="lg">
      <Container>
        <Navbar.Brand href="/">Nestcoin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin">Rewards</Nav.Link>
            <Nav.Link href="/admin/add">New Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const NavbarHomepage = () => {
  const [show, setShow] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "c42bd204d32641289769eb8a9a4c1607", // required
      },
    },
  };

  const web3ModalRef = useRef();
  let provider;
  let web3Modal;

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object

    web3Modal = new Web3Modal({
      network: "rinkeby", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // Get list of accounts of the connected wallet
    const web3 = new Web3(provider);
    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);

    // If user is not connected to the Mainnet network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      console.log(signer);
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Get the provider from web3Modal, which in our case is MetaMask
        // When used for the first time, it prompts the user to connect their wallet
        await getProviderOrSigner();
        setWalletConnected(true);

        // Subscribe to accounts change
        provider.on("accountsChanged", async (accounts) => {
          console.log("acc", accounts);
          await getProviderOrSigner();
        });

        // Subscribe to chainId change
        provider.on("chainChanged", async (chainId) => {
          console.log("chain", chainId);
          await getProviderOrSigner();
        });

        // Subscribe to provider connection
        provider.on("connect", (info) => {
          console.log("inf", info);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
          console.log("dis", error);
          setAddress("");
          setWalletConnected(false);
        });
      } else {
        alert("Please install Metamask");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    setAddress("");
  };

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      if (!walletConnected) {
        // Assign the Web3Modal class to the reference object by setting it's `current` value
        // The `current` value is persisted throughout as long as this page is open
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    }
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  }, [walletConnected]);

  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navigation-bar w-nav"
    >
      <img
        src="/images/Nestcoin-1024x726.jpg"
        loading="lazy"
        width="0"
        sizes="100vw"
        srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w"
        alt=""
      />
      <img
        src="images/Nestcoin-1024x726.jpg"
        loading="lazy"
        width="120"
        height="90"
        srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w"
        sizes="120px"
        alt=""
        className="image-2"
      />
      <Link to="/" className="brand-link w-nav-brand ">
        {" "}
        <img
          src="/images/nestcoin-logo-big-N.jpg"
          width="0"
          alt="Nestcoin Logo"
          className="image"
        />{" "}
      </Link>

      <div className="container w-container">
        <div className="d-flex flex-row justify-content-around">
          <Link to="/" className="brand-link w-nav-brand ">
            {" "}
            <img
              src="/images/nestcoin-logo-big-N.jpg"
              width="0"
              alt="Nestcoin Logo"
              className="image"
            />{" "}
          </Link>
          {/*   {connected ? (
            <div className="account">
              <span className="bg-primary text-white p-1">User:</span>{" "}
              <span className="address p-1 text-primary">{newAccount()}</span>{" "}
            </div>
          ) : null} */}
        </div>

        <nav role="navigation" className="navigation-menu w-nav-menu">
          <Link to="/" className="navigation-link w-nav-link">
            Home
          </Link>
          <Link to="/get-tickets" className="navigation-link w-nav-link ">
            Get Tickets
          </Link>
          {/*   {
            //expose admin link only user is an admin
            connected ? (
              <Link to="/admin" className="navigation-link w-nav-link ">
                Admin
              </Link>
            ) : null
          } */}

          {walletConnected && address.length > 0 ? (
            <button
              onClick={disconnectWallet}
              className="button-2 w-button bg-success"
            >
              {address.slice(0, 5) + "....." + address.slice(-5, -1)}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="button-2 w-button bg-success"
            >
              Connect Wallet
            </button>
          )}
        </nav>
        <div className="hamburger-button w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
};
