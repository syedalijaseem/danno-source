import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const AcceptProposalButton = ({ proposalId }) => {
  const { currentUser } = useContext(UserContext);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [checkCompleted, setCheckCompleted] = useState(false); // New state variable

  useEffect(() => {
    const checkProposalAccepted = async () => {
      try {
        const acceptanceQuery = query(
          collection(db, "acceptance"),
          where("proposal_id", "==", proposalId),
          where("expert_id", "==", currentUser?.uid)
        );
        const acceptanceQuerySnapshot = await getDocs(acceptanceQuery);
        if (acceptanceQuerySnapshot.docs.length > 0) {
          setProposalAccepted(true);
        }
        setLoading(false);
        setCheckCompleted(true); // Mark the check as completed
      } catch (error) {
        console.error("Error checking proposal acceptance:", error);
        setLoading(false);
        setCheckCompleted(true); // Mark the check as completed even if there's an error
      }
    };

    checkProposalAccepted();
  }, [proposalId, currentUser]);

  const handleClick = async () => {
    try {
      // Make sure proposal is defined before trying to use it
      if (!proposalId) {
        console.error(
          "Error adding acceptance document: proposalId is undefined"
        );
        return;
      }

      // If proposal has already been accepted, do not create a new acceptance document
      if (proposalAccepted) {
        return;
      }

      // Find the proposal from the passed proposal id
      const proposalDoc = doc(db, "proposals", proposalId);
      const proposalSnapshot = await getDoc(proposalDoc);
      const proposalData = proposalSnapshot.data();

      const jobDoc = doc(db, "jobs", proposalData.jobId);
      const jobSnapshot = await getDoc(jobDoc);
      const jobData = jobSnapshot.data();

      const input = prompt("Assign the number of images for the freelancer:");
      const assignedImages = parseInt(input);
      if (isNaN(assignedImages) || assignedImages <= 0) {
        console.error("Invalid number of images assigned.");
        return;
      }

      // Create the acceptance data object
      const acceptanceData = {
        created_at: serverTimestamp(),
        description: proposalData.description,
        delivery_time: proposalData.deliveryTime,
        price: proposalData.price,
        proposal_id: proposalId,
        expert_id: currentUser.uid,
        freelancer_id: proposalData.freelancer_id,
        job_id: proposalData.jobId,
        images_assigned: assignedImages,
        classifications: jobData.classifications,
      };

      // Add the acceptance document to the "acceptance" collection
      const acceptanceRef = await addDoc(
        collection(db, "acceptance"),
        acceptanceData
      );

      // Update the proposal document to include the acceptance ID
      await updateDoc(proposalDoc, {
        acceptance_id: acceptanceRef.id,
      });

      // Set the proposal as accepted
      setProposalAccepted(true);

      // Clear the assigned images count
      setNumberOfImages(0);
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!checkCompleted) {
    return null; // Render nothing while the check is in progress
  }

  return (
    <div>
      {!proposalAccepted ? (
        <button onClick={handleClick}>Accept Proposal</button>
      ) : (
        <span>Proposal Accepted</span>
      )}
    </div>
  );
};

export default AcceptProposalButton;
