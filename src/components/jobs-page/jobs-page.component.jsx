import React, { useState, useEffect } from "react";
import { getCurrentUserAccountType } from "../../utils/firebase/firebase.utils";
import CreateJob from "../create-job/create-job.component";
import JobsList from "../jobs-list/jobs-list.component";

const JobsPage = () => {
  const [userAccountType, setUserAccountType] = useState(null);

  useEffect(() => {
    async function fetchAccountType() {
      const accountType = await getCurrentUserAccountType();
      setUserAccountType(accountType);
    }

    fetchAccountType();
  }, []);

  return (
    <div>
      {userAccountType === "expert" && <CreateJob />}
      {userAccountType === "freelancer" && <JobsList />}
    </div>
  );
};

export default JobsPage;
