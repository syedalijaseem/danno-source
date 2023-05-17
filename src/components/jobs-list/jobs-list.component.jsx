import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { Link } from "react-router-dom";

import "./jobs-list.styles.css";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const jobsSnapshot = await getDocs(jobsCollection);
      const jobsData = jobsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    };
    fetchJobs();
  }, []);

  return (
    <div class="block pl-12 p-6 mt-12 m-4 bg-white border border-green-200 rounded-lg shadow hover:bg-green-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
        Current Jobs:
      </h5>
      <div class="grid grid-cols-4 gap-10">
        {currentUser ? (
          jobs.map((job) => (
            <div
              class="max-w-sm p-6 bg-white border border-green-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 grid-item"
              key={job.id}
            >
              <h2 class="mb-2 text-xl font-semibold font-medium text-gray-900 dark:text-white">
                {job.title}
              </h2>
              <p class="mb-2 text-gray-700 dark:text-gray-400">
                {job.description}
              </p>
              <p class="mb-2 text-gray-700 dark:text-gray-400">
                Pay: {job.pay}
              </p>
              <p class="mb-2 text-gray-700 dark:text-gray-400">
                Duration: {job.duration}
              </p>
              <Link
                to={`/jobs/${job.id}/proposals`}
                class="inline-block px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
              >
                Send Proposal
              </Link>
              {/* display any other fields you need for your job form */}
            </div>
          ))
        ) : (
          <p class="text-gray-700 dark:text-gray-400">
            Please log in to view jobs.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobsList;
