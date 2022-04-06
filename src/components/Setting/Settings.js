import React, {useState, useEffect} from 'react';
import './Settings.css';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Header from '../Navbar/Header';


const Setting = () => {

    const [contract, setContract] = useState;

    useEffect(() => {
        const getContract = async () => {
            try {
                const myContract = await //ether connection
                setContract(myContract)
                //instatiate contract here
                //store the contract in a variable
                // setContract
            } catch (err) {
                console.log(err)
            }
        }
        getContract()
    },[])

    
    return (
        <div>
            <Header />
            <Dashboard />
            <Footer />
        </div>

    )
}

export default Setting;