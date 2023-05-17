import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./user.context";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";
import { createContext } from "react";

export const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const { jobId } = useParams();
  const [proposalData, setProposalData] = useState({
    description: "",
    price: "",
    deliveryTime: "",
  });
  const [proposalId, setProposalId] = useState(null);

  const submitProposal = async (proposalData) => {
    try {
      const proposalRef = await addDoc(collection(db, "proposals"), {
        jobId,
        userId: currentUser.uid,
        ...proposalData,
        createdAt: serverTimestamp(),
      });
      setProposalId(proposalRef.id);
      console.log("Proposal submitted successfully!");
      setProposalData({
        description: "",
        price: "",
        deliveryTime: "",
      });
    } catch (error) {
      console.error("Error submitting proposal", error);
    }
  };

  const updateProposal = async (proposalData, proposalId) => {
    try {
      const proposalRef = doc(db, "proposals", proposalId);
      await updateDoc(proposalRef, proposalData);
      console.log("Proposal updated successfully!");
    } catch (error) {
      console.error("Error updating proposal", error);
    }
  };

  const deleteProposal = async (proposalId) => {
    try {
      const proposalRef = doc(db, "proposals", proposalId);
      await deleteDoc(proposalRef);
      console.log("Proposal deleted successfully!");
    } catch (error) {
      console.error("Error deleting proposal", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProposalData({ ...proposalData, [name]: value });
  };

  return (
    <ProposalContext.Provider
      value={{
        proposalData,
        proposalId,
        setProposalData,
        setProposalId,
        submitProposal,
        updateProposal,
        deleteProposal,
        handleChange,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};
