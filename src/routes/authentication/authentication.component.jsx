import React from "react";

import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

//import SignUpFrom from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";

import "./authentication.styles.scss";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const Authentication = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log(response);

    if (response) {
      const userDocRef = await createUserDocumentFromAuth;
    }
  }, []);

  {
    showSignIn ? (
      <SignInForm switchForm={() => setShowSignIn(false)} />
    ) : (
      <SignUpForm switchForm={() => setShowSignIn(true)} />
    );
  }

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
