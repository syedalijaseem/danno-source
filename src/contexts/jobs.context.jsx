import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";

export const JobsContext = React.createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const jobsCollection = collection(db, "jobs");
    const jobsSnapshot = await getDocs(jobsCollection);
    const jobsData = jobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(jobsData);
  };

  const createJob = async (newJob) => {
    try {
      const jobRef = doc(collection(db, "jobs"));
      const newJobWithId = {
        ...newJob,
        jobId: jobRef.id,
        createdAt: new Date(),
      };
      await setDoc(jobRef, newJobWithId);

      console.log("Job created successfully!");

      // Update state
      setJobs((prevJobs) => [...prevJobs, newJobWithId]);

      return jobRef.id; // return the jobId value
    } catch (error) {
      console.error("Error creating job", error);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));

      console.log("Job deleted successfully!");

      // Update state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, setJobs, createJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobsContext = () => useContext(JobsContext);
