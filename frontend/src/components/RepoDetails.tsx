import React from "react";
import { IRepo } from "../types";
import repoimage from '../assets/icons8-git-250.png'

interface Props {
  repo: IRepo;
  onBack: () => void;
}

const RepoDetail: React.FC<Props> = ({ repo, onBack }) => {
  return (
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
      </div>
      <div className="repo-categories">
        <span className="repo-category">Code Review</span>
        <span className="repo-category">Open Source</span>
        <span className="repo-category">Free</span>
      </div>
    </div>

    {/* Right Section */}
    <div className="repo-right">
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
      <button onClick={onBack} className="back-button">
        Back to Repositories
      </button>
    </div>
  </div>
  );
};

export default RepoDetail;
