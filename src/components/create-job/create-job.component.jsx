import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { useJobsContext } from "../../contexts/jobs.context";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { v4 } from "uuid";

const CreateJob = () => {
  const { currentUser } = useContext(UserContext);
  const { createJob } = useJobsContext();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    pay: "",
    freelancers_required: "",
    duration: "",
    classifications: [],
    tags: [],
  });

  const [uploading, setUploading] = useState(false);

  const uploadFile = async (files, jobId) => {
    if (files.length === 0) return;

    const userFolderRef = ref(storage, `users/${currentUser.uid}`);
    const jobFolderRef = ref(userFolderRef, jobId);
    const promises = [];

    Array.from(files).forEach((file) => {
      const fileRef = ref(jobFolderRef, `${file.name}_${v4()}`);
      promises.push(uploadBytes(fileRef, file));
    });

    try {
      await Promise.all(promises);
      console.log("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setUploading(true);
      const job = {
        ...jobData,
        userId: currentUser.uid,
        createdBy: currentUser.displayName,
      };
      const jobId = await createJob(job);
      console.log("Job created successfully!");
      await uploadFile(event.target.elements.images.files, jobId); // Pass jobId here
      setJobData({
        title: "",
        description: "",
        pay: "",
        freelancers_required: "",
        duration: "",
        classifications: [],
        tags: [],
      });
    } catch (error) {
      console.error("Error creating job", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleTagsChange = (event) => {
    const { value } = event.target;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setJobData({ ...jobData, tags: tagsArray });
  };

  const handleClassificationsChange = (event) => {
    const { value } = event.target;
    const classificationsArray = value
      .split(",")
      .map((classifications) => classifications.trim());
    setJobData({ ...jobData, classifications: classificationsArray });
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="block mx-auto my-8 max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        Create a New Job
      </h5>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={jobData.description}
        onChange={handleChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />
      <label htmlFor="pay">Pay per 100 images:</label>
      <input
        type="number"
        id="pay"
        name="pay"
        value={jobData.pay}
        onChange={handleChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />
      <label htmlFor="freelancers_required">Freelancers Needed:</label>
      <input
        type="number"
        id="freelancers_required"
        name="freelancers_required"
        value={jobData.freelancers_required}
        onChange={handleChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />
      <label htmlFor="duration">Duration:</label>
      <input
        type="number"
        id="duration"
        name="duration"
        value={jobData.duration}
        onChange={handleChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />
      <label htmlFor="classifications">
        Classifications (Please separate classifications by ','):
      </label>
      <input
        type="text"
        id="classifications"
        name="classifications"
        value={jobData.classifications.join(", ")}
        onChange={handleClassificationsChange}
        required
        class="w-full h-11 border rounded-lg px-3 py-2 mt-1 mb-4 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block"
      />

      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="multiple_files"
      >
        Upload Images
      </label>
      <input
        type="file"
        id="images"
        name="images"
        class="block w-full text-sm text-gray-900 border border-blue-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-green-600 dark:placeholder-green-400"
        multiple
      />
      <button
        type="submit"
        disabled={uploading}
        class="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading Images..." : "Create Job"}
      </button>
    </form>
  );
};

export default CreateJob;
