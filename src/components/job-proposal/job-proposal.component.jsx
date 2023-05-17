import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { ProposalContext } from "../../contexts/proposal.context";

const ProposalForm = () => {
  const { currentUser } = useContext(UserContext);
  const { jobId } = useParams();
  const {
    proposalData,
    setProposalData,
    proposalId,
    setProposalId,
    handleChange,
  } = useContext(ProposalContext);

  const proposalsRef = collection(db, "proposals");

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const proposalsSnapshot = await getDocs(
      query(
        proposalsRef,
        where("jobId", "==", jobId),
        where("freelancer_id", "==", currentUser.uid)
      )
    );

    if (!proposalsSnapshot.empty) {
      setShowAlert(true);
      return;
    }
    try {
      const docRef = await addDoc(proposalsRef, {
        ...proposalData,
        jobId: jobId,
        freelancer_id: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      console.log("Proposal submitted successfully!");
      setProposalId(docRef.id);
      await updateDoc(doc(proposalsRef, docRef.id), { proposalId: docRef.id });
      setProposalData({
        description: "",
        price: "",
        deliveryTime: "",
      });
    } catch (error) {
      console.error("Error submitting proposal", error);
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: "9999" }}>
        <form
          onSubmit={handleSubmit}
          className="block mx-auto my-8 max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Send Proposal for Job
          </h5>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={proposalData.description}
            onChange={handleChange}
            required
            className="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
          />

          <label htmlFor="price">Price per 100 images:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={proposalData.price}
            onChange={handleChange}
            required
            className="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
          />

          <label htmlFor="deliveryTime">Delivery Time:</label>
          <input
            type="number"
            id="deliveryTime"
            name="deliveryTime"
            value={proposalData.deliveryTime}
            onChange={handleChange}
            required
            className="
          w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
          />
          <button
            type="submit"
            className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Proposal
          </button>
        </form>
      </div>
      {showAlert && (
        <div className="max-w-sm p-6 position:absolute top-0 bg-amber border border-amber-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <span>
            <span className="font-medium">Info alert!</span> Change a few things
            up and try submitting again.
          </span>
        </div>
      )}
    </>
  );
};

export default ProposalForm;
