import React from "react";
import { IRepo } from "../types";
import repoimage from '../assets/icons8-git-250.png'

interface Props {
  repo: IRepo;
  onBack: () => void;
}

const RepoDetail: React.FC<Props> = ({ repo, onBack }) => {
  return (
    <div>
      <div className="back-button-div">

       <button onClick={onBack} className="back-button">
       &larr; Back to repositories
      </button>
      </div>
    <div className="repo-detail-container">

    {/* Left Section */}
    <div className="repo-left">
      <img
        src={repoimage}
        alt="repo-img"
        className="repo-avatar"
      />
      <div className="verified-badge">
        ✅ Verified by GitHub
        <p>GitHub confirms that this app meets the <span>requirements for verification</span></p>
      </div>
      <div>
      <p className="repo-details-category-heading">Categories</p>
      <div className="repo-categories">
        <span className="repo-category">Code Review</span>
        <span className="repo-category">Open Source</span>
        <span className="repo-category">Free</span>
      </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="repo-right">
      <p className="heading">Application</p>
      <h2 className="repo-title">{repo.name}</h2>
      <button
        className="repo-action"
      >
        Set up a plan
      </button>
      <p className="repo-description">
        <span className="">{repo.description}</span>
      </p>

      

      <br />
     
    </div>
  </div>
  </div>
  );
};

export default RepoDetail;
