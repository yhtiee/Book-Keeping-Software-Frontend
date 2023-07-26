import * as fcl from "@onflow/fcl";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "./TransactionContext";
import API_URL from "./API";


export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const { initTransactionState, setTxId, setTransactionStatus } =
  useTransaction();
  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });
  const [userProfile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [business, setListBusiness] = useState([])

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const navigate = useNavigate()

  const loadProfile = useCallback(async () => {
    const profile = await fcl.query({
      cadence: `
        import User from 0x80155b3fe162462c

        pub fun main(address: Address): User.ReadOnly? {
          return User.read(address)
        }
      `,
      args: (arg, t) => [arg(currentUser.addr, t.Address)],
    });
    setProfile(profile ?? null);
    setProfileExists(profile !== null);
    console.log(profile)
    return profile;
  }, [currentUser, setProfile, setProfileExists]);

  useEffect(() => {
    if (currentUser.loggedIn && userProfile === null) {
      loadProfile();
    }

  }, [currentUser, userProfile, loadProfile]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
    setProfile(null);
    setProfileExists(false);
    navigate("/signin")
    localStorage.removeItem("businessName")
  };

  const logIn = () => {
    fcl.logIn();
  };

  const signUp = () => {
    fcl.signUp();
  };

  const createProfile = async () => {
    initTransactionState();

    const transactionId = await fcl.mutate({
      cadence: `
        import User from 0x80155b3fe162462c

        transaction {
          prepare(account: AuthAccount) {
            // Only initialize the account if it hasn't already been initialized
            if (!User.check(account.address)) {
              // This creates and stores the profile in the user's account
              account.save(<- User.new(), to: User.privatePath)

              // This creates the public capability that lets applications read the profile's info
              account.link<&User.Base{User.Public}>(User.publicPath, target: User.privatePath)
            }
          }
        }
      `,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50,
    });
    setTxId(transactionId);
    fcl.tx(transactionId).subscribe((res) => {
      setTransactionStatus(res.status);
      if (res.status === 4) {
        loadProfile();
      }
    });
  };

  async function storeUserProfile(username, email, address){
    if(currentUser.loggedIn == true){
      let response = await fetch( `${API_URL}auth/create-user-profile/`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username":username,
        "email":email,
        "address":address
      })
      })
      if(response.ok){
        let data = await response.json()
        if (response.status == 200){
          navigate("/")
        }
      }
    }
  }


  const updateProfile = async (email, username) => {
    console.log("Updating profile", {email, username});
    const address = userProfile.address
    storeUserProfile(username, email, address)
    initTransactionState();

    const transactionId = await fcl.mutate({
      cadence: `
        import User from 0x80155b3fe162462c

        transaction(username:String, email:String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&User.Base{User.Owner}>(from: User.privatePath)!
              .setUsername(username)

            account
              .borrow<&User.Base{User.Owner}>(from: User.privatePath)!
              .setEmai(email)
          }
        }
      `,
      args: (arg, t) => [
        arg(username, t.String),
        arg(email, t.String),
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50,
    });
    setTxId(transactionId);
    fcl.tx(transactionId).subscribe((res) => {
      setTransactionStatus(res.status);
      if (res.status === 4) {
        loadProfile();
        navigate("/dashboard")
      }
    });
  };



  async function createbusiness(business, businessType){
    if(currentUser.loggedIn == true){
      let address = currentUser.addr
      let response = await fetch( `${API_URL}business/create_business/`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "address":address,
        "business":business,
        "businessType":businessType
      })
      })
      if(response.ok){
        let data = await response.json()
        if (response.status == 200){
          navigate("/")
        }
      }
    }
  }

  async function retrievebusiness(user){
      let address = user.addr
      console.log(
        user
      )
      let response = await fetch( `${API_URL}business/retrieve_list_business/${address}`, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json'
      },
      })
      if(response.ok){
        let data = await response.json()
        if (response.status == 200){
          console.log(data)
          setListBusiness(data.businesses)
        }
    }
  }

  const value = {
    currentUser,
    userProfile,
    profileExists,
    logOut,
    logIn,
    signUp,
    loadProfile,
    createProfile,
    updateProfile,
    retrievebusiness,
    createbusiness,
    storeUserProfile,
    business
  };

  console.log("AuthProvider", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
