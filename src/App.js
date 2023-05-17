import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/user.context";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";
import LandingPage from "./routes/landing/landingPage.component";
import JobsPage from "./components/jobs-page/jobs-page.component";
import CreateJob from "./components/create-job/create-job.component";
import ProposalForm from "./components/job-proposal/job-proposal.component";
import CreatedJobsDisplay from "./components/created-jobs/created-jobs.component";
import AcceptedProposals from "./components/accepted-proposals/accepted-proposals.component";
import ImageAnnotationTool from "./components/workbench/workbench.component";

import "tailwindcss/tailwind.css";

const App = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      {currentUser ? (
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="createjobs" element={<CreateJob />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="createdjobs" element={<CreatedJobsDisplay />} />
          <Route path="acceptedproposals" element={<AcceptedProposals />} />
          <Route path="image" element={<ImageAnnotationTool />} />
          <Route
            exact
            path="jobs/:jobId/proposals"
            element={<ProposalForm />}
          />
        </Route>
      ) : (
        <Route path="/">
          <Route exact path="/" element={<LandingPage />} />
          <Route path="signin" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
