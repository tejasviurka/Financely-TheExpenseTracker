// src/components/SignupSignin/index.js
import React, { useState } from 'react';
import "./style.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from '../../firebaseConfig';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User created successfully!");
            setLoading(false);
            setName("");
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Firebase Error:", errorCode, errorMessage);
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password don't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const loginUsingEmail = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User logged in");
          console.log("User logged in", user);
          createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory");
    }
  };

  const createDoc = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Document created");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Document already exists");
    }
  };

  const googleAuth = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User>>>", user);
        toast.success("User authenticated");
        createDoc(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading.." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>or</p>
            <Button 
              onClick={googleAuth} text={"Login Using Google"}
              blue={true}
            />
            <p style={{ textAlign: "center" }}> Or Don't have an account? Click here</p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              onClick={signupWithEmail}
              text={loading ? "Loading.." : "Signup Using Email and Password"}
              blue={true}
            />
            <p className="p-login">or</p>
            <Button onClick={googleAuth} text={"Signup Using Google"} blue={true} />
            <p className="p-login"> Or Have an Account Already? Click here</p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
