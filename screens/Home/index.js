'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './styles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillDropboxSquare } from 'react-icons/ai';
import { RiAddBoxFill, RiDeleteBinFill } from 'react-icons/ri';
import { Modal } from 'antd';

const isNumberCorrect = (num) => {
    if (num.length != 10) {
        return false;
    }
    if (isNaN(num)) {
        return false;
    }
    return true;
}

const Home = () => {
    const addressIdRef =  useRef(null);
    const [nameForm, setNameForm] = useState(false);
    const [mobileForm, setMobileForm] = useState(true);
    const [dataDiv, setDataDiv] = useState(false);
    const [user, setUser] = useState({});
    const [number, setNumber] = useState('');
    const [isNumber, setIsNumber] = useState(false);
    const [name, setName] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModel] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('');
    const [addressId, setAddressId] =  useState();

    //console.log('addressList', addressList);
    const clearAddress = () => {
        setAddress1('');
        setAddress2('');
        setAddress3('');
        setCity('');
        setState('');
        setPincode('');
    }
    const getAddresses = () => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id })
        };
        fetch('/api/getAddressesByUser', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('getAddressesByUser', result);
                if (result && result.success === true) {
                    setAddressList(result.data);
                    if (result.data.length > 0)
                        toast.success('Addresses!');

                } else {
                    setNameForm(false);
                    toast.error('Something went wrong...!');
                }
            })
            .catch(error => toast.error('Something went wrong!'));
    }
    const createAddress = (address) => {
        setConfirmLoading(true);
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        };
        fetch('/api/createAddress', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('data', result);
                if (result && result.success === true) {
                    setConfirmLoading(false);
                    toast.success('Address Created!');
                    setModal(false);
                    getAddresses();
                    clearAddress();

                } else {
                    setConfirmLoading(false);
                    toast.error('Something went wrong...!');
                }
            })
            .catch(error => toast.error('Something went wrong!'));
    }
    const deleteAddress = (id) => {
        setConfirmLoading(true);
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({address_id:id})
        };
        fetch('/api/deleteAddress', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('deleteAddress', result);
                if (result && result.success === true) {
                    setConfirmLoading(false);
                    toast.success('Address Deleted!');
                    setDeleteModel(false);
                    getAddresses();
                } else {
                    setDeleteModel(false);
                    setConfirmLoading(false);
                    toast.error(error.message||'Something went wrong...!');
                }
            })
            .catch(error => console.log( error.message||'Something went wrong!'));
    }

    const onChangeHandler = (e) => {
        let num = e.target.value
        num = num.trim();
        setNumber(num);
        if (isNumberCorrect(num)) {
            setIsNumber(true);
        }
    }

    const onNameChangeHandler = (e) => {
        let name = e.target.value
        setName(name);
    }


    const onClickHandler = () => {
        console.log(isNumber);
        console.log(number);
        if (!isNumber) {
            toast.error('Enter correct Number!')
        }
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: number })
        };
        fetch('/api/getUser', requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('data', result);
                if (result && result.success === true) {
                    setUser(result.data);
                    setName(result.data.name || '');
                    setMobileForm(false);
                    setNameForm(true);
                    toast.success('User Found!');
                } else {
                    setMobileForm(false);
                    setNameForm(true);
                    toast.info('User Not Found and will be created!');
                }
            })
            .catch(error => toast.error('Something went wrong!'));
    }

    const onNameClickHandler = () => {
        if (user && user.id) {
            getAddresses();
            setDataDiv(true);
            setNameForm(false)
        } else {
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: number, name: name.trim() })
            };
            fetch('/api/createUser', requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('data', result);
                    if (result && result.success === true) {
                        setNameForm(false);
                        toast.success('User Created!');
                        let requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ mobile: number })
                        };
                        fetch('/api/getUser', requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                //console.log('data', result);
                                if (result && result.success === true) {
                                    setUser(result.data);
                                    setName(result.data.name || '');
                                    setDataDiv(true);
                                    getAddresses();

                                } else {
                                    setMobileForm(false);
                                    setNameForm(true);
                                    toast.error('User Not Found!');
                                    setDataDiv(true);
                                }
                            })
                            .catch(error => toast.error('Something went wrong!'));

                    } else {
                        setNameForm(false);
                        toast.info('Error occured!');
                    }
                })
                .catch(error => toast.error('Something went wrong!'));
        }

    }

    return (
        <>{
            mobileForm || nameForm ?
                <div className={styles.container}>
                    {
                        mobileForm ?
                            <>
                                <label htmlFor="mobile">Enter Your Mobile Number</label>
                                {/* <div style={{width: "100%",height: "0",borderBlockColor: "aqua", border: "1px solid aqua", margin: "0", padding:"0"}}></div> */}
                                <input type="number" maxLength={10} onChange={onChangeHandler} value={number} />
                                <button onClick={onClickHandler}>
                                    Next
                                </button>
                            </>
                            :
                            <></>
                    }
                    {
                        nameForm ?
                            <>
                                {
                                    user.name ?
                                        <>
                                            <label htmlFor="name">Welcome Back {user.name}!</label>
                                            {/* <input type="text" minLength={3} onChange={onChangeHandler} /> */}
                                            <button onClick={onNameClickHandler}>
                                                Next
                                            </button>
                                        </>
                                        :
                                        <>
                                            <label htmlFor="mobile">Enter Your Name</label>
                                            <input style={{ letterSpacing: "4px" }} type="text" minLength={3} onChange={onNameChangeHandler} value={name} />
                                            <button onClick={onNameClickHandler}>
                                                Next
                                            </button>
                                        </>
                                }

                            </>
                            :
                            <></>
                    }


                </div>
                :
                <></>
        }
            {
                dataDiv ?
                    <>
                        <div className={styles.banner}>
                            <h3>{user.name}</h3>
                            <p>{user.mobile}</p>
                            <p>{new Date(user.created_at).toDateString()}</p>
                            <div className={styles.addAddress} onClick={() => setModal(true)}><button>Add Address <RiAddBoxFill /></button></div>
                        </div>
                        <>
                            {
                                addressList.length > 0 ?
                                    <div className={styles.cards}>
                                        {
                                            addressList.map((address, ind) => {
                                                return (
                                                    <div key={ind} className={styles.card}>
                                                        <p>{address.address1}</p>
                                                        <p>{address.address2}</p>
                                                        <p>{address.address3}</p>
                                                        <p>{address.city}</p>
                                                        <p>{address.state}</p>
                                                        <p>{address.pincode}</p>
                                                        <hr style={{
                                                            color: 'aqua',
                                                            backgroundColor: 'aqua',
                                                            height: 5
                                                        }} />
                                                        <div 
                                                        key= {address.id}
                                                        accessKey={address.id}
                                                        value = {address.id}
                                                        ref={addressIdRef}
                                                        onClick={(e)=>{   
                                                            //console.log('value', e.target);
                                                            setDeleteModel(true);
                                                            setAddressId(e.target.getAttribute('accesskey'));
                                                        }} 
                                                        >
                                                        <button
                                                        accessKey={address.id}
                                                        value = {address.id}
                                                        >Delete
                                                        </button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    :
                                    <div className={styles.noData}>
                                        <AiFillDropboxSquare size={70} />
                                        <p>NO DATA!</p>
                                    </div>
                            }
                        </>
                    </>
                    :
                    <></>
            }{
                modal ?
                    <Modal
                        title="Enter Address"
                        open={modal}
                        onOk={() => {
                            createAddress({
                                user_id: user.id,
                                address1,
                                address2,
                                address3,
                                city,
                                state,
                                pincode
                            })
                        }}
                        confirmLoading={confirmLoading}
                        onCancel={() => {
                            setModal(false);
                        }}
                    >
                        <div className={styles.addressForm}>
                            <label htmlFor="">Address</label>
                            <input type="text" name="" id="" placeholder='line1' value={address1} onChange={(e) => setAddress1(e.target.value)} />
                            <input type="text" name="" id="" placeholder='line2' value={address2} onChange={(e) => setAddress2(e.target.value)} />
                            <input type="text" name="" id="" placeholder='line3' value={address3} onChange={(e) => setAddress3(e.target.value)} />
                            <label htmlFor="">City</label>
                            <input type="text" name="" id="" value={city} onChange={(e) => setCity(e.target.value)} />
                            <label htmlFor="">State</label>
                            <input type="text" name="" id="" value={state} onChange={(e) => setState(e.target.value)} />
                            <label htmlFor="">Pincode</label>
                            <input className={styles.pincode} type="number" maxLength={6} name="" id="" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        </div>
                    </Modal>
                    :
                    <> </>
            }
            <Modal
                title="You are about to delete the address are you sure?"
                open={deleteModal}
                footer ={null}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setDeleteModel(false);
                }}
            >
                <button 
                onClick={()=>deleteAddress(addressId)}
                style={{backgroundColor: "red", color: "white", borderColor: "red", borderRadius: "5px", height: "30px", fontWeight: "600", fontSize: "18px"}}> Delete</button>
            </Modal>

            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    )
}

export default Home