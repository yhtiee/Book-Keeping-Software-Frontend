import * as fcl from "@onflow/fcl";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTransaction } from "./TransactionContext";


export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const { initTransactionState, setTxId, setTransactionStatus } =
  useTransaction();
  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });
  const [userProfile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

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


  const updateProfile = async (firstName, lastName, twitter , discord) => {
    console.log("Updating profile", {firstName, lastName, twitter, discord});
    initTransactionState();

    const transactionId = await fcl.mutate({
      cadence: `
        import NewAmbassadorProfile from 0xfad09e6732db970f

        transaction(firstName:String, lastName:String, twitter:String, discord:String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&NewAmbassadorProfile.Base{NewAmbassadorProfile.Owner}>(from: NewAmbassadorProfile.privatePath)!
              .setFirstName(firstName)

            account
              .borrow<&NewAmbassadorProfile.Base{NewAmbassadorProfile.Owner}>(from: NewAmbassadorProfile.privatePath)!
              .setLastName(lastName)

            account
              .borrow<&NewAmbassadorProfile.Base{NewAmbassadorProfile.Owner}>(from: NewAmbassadorProfile.privatePath)!
              .setTwitterProfileLink(twitter)

            account
              .borrow<&NewAmbassadorProfile.Base{NewAmbassadorProfile.Owner}>(from: NewAmbassadorProfile.privatePath)!
              .setDiscordProfileLink(discord)
          }
        }
      `,
      args: (arg, t) => [
        arg(firstName, t.String),
        arg(lastName, t.String),
        arg(twitter, t.String),
        arg(discord, t.String),
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
      }
    });
  };

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
  };

  console.log("AuthProvider", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
