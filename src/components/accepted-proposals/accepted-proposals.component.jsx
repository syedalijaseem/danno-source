import React, { useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import WorkbenchLink from "../go-to-workbench/go-to-workbench.component";

const AcceptedProposals = () => {
  const { currentUser } = useContext(UserContext);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAcceptedProposals = async () => {
      try {
        const acceptanceQuery = query(
          collection(db, "acceptance"),
          where("freelancer_id", "==", currentUser?.uid)
        );
        const acceptanceQuerySnapshot = await getDocs(acceptanceQuery);
        const acceptedProposalsData = acceptanceQuerySnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            const { acceptanceID, ...otherFields } = data;
            return otherFields;
          }
        );
        setAcceptedProposals(acceptedProposalsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accepted proposals:", error);
        setLoading(false);
      }
    };

    getAcceptedProposals();
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : acceptedProposals.length > 0 ? (
        <ul>
          {acceptedProposals.map((proposal) => (
            <li key={proposal.proposal_id}>
              <p>Description: {proposal.description}</p>
              <p>Delivery Time: {proposal.delivery_time}</p>
              <p>Price: {proposal.price}</p>
              <p>Viewed: {proposal.viewed}</p>
              <WorkbenchLink
                expert_id={proposal.expert_id}
                freelancer_id={proposal.freelancer_id}
                proposal_id={proposal.proposal_id}
                job_id={proposal.job_id}
                classifications={proposal.classifications}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted proposals found.</p>
      )}
    </>
  );
};

export default AcceptedProposals;
