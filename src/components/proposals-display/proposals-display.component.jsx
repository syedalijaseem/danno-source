import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { useJobsContext } from "../../contexts/jobs.context";
import AcceptProposalButton from "../accept-proposal-button/accept-proposal-button.component";

const ProposalsDisplay = ({ jobId }) => {
  const [proposals, setProposals] = useState([]);
  const { jobs } = useJobsContext();

  // Find the job object based on the jobId prop
  const job = jobs.find((job) => job.id === jobId);

  useEffect(() => {
    const fetchProposals = async () => {
      const proposalsCollection = collection(db, "proposals");
      const jobProposalsQuery = query(
        proposalsCollection,
        where("jobId", "==", jobId)
      );
      const proposalsSnapshot = await getDocs(jobProposalsQuery);
      const proposalsData = proposalsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProposals(proposalsData);
    };

    fetchProposals();
  }, [jobId]);

  return (
    <div>
      <h2>Proposals for {job.title}</h2>
      {proposals.length === 0 ? (
        <p>There are no proposals for this job yet.</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <p>{proposal.description}</p>
              <p>Pay: ${proposal.price}</p>
              <AcceptProposalButton proposalId={proposal.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProposalsDisplay;
