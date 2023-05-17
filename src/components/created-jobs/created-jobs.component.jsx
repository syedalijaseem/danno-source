import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useJobsContext } from "../../contexts/jobs.context";
import ProposalsDisplay from "../proposals-display/proposals-display.component";

const CreatedJobsDisplay = () => {
  const { currentUser } = useContext(UserContext);
  const { jobs } = useJobsContext();
  const [showProposals, setShowProposals] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");

  // Filter the jobs to get only the ones created by the current user
  const createdJobs = jobs.filter((job) => job.userId === currentUser?.uid);

  const handleViewProposalsClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowProposals((prevShowProposals) => !prevShowProposals);
  };

  return (
    <div>
      <h2>Created Jobs</h2>
      {createdJobs.length === 0 ? (
        <p>You haven't created any jobs yet.</p>
      ) : (
        <ul>
          {createdJobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Pay: ${job.pay}</p>
              <p>Duration: {job.duration} days</p>
              <button onClick={() => handleViewProposalsClick(job.id)}>
                {showProposals && selectedJobId === job.id
                  ? "Hide Proposals"
                  : "View Proposals"}
              </button>
              {showProposals && selectedJobId === job.id && (
                <>
                  <ProposalsDisplay userId={currentUser?.uid} jobId={job.id} />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreatedJobsDisplay;
