import React from 'react';
import { ExternalLink, Building, MapPin, Calendar } from 'lucide-react';
import type { Job } from '../types';

interface JobListProps {
  jobs: Job[];
  isDarkMode: boolean;
}

export function JobList({ jobs, isDarkMode }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        No jobs found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobItem key={job.job_id} job={job} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
}

interface JobItemProps {
  job: Job;
  isDarkMode: boolean;
}

function JobItem({ job, isDarkMode }: JobItemProps) {
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {job.employer_logo ? (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} logo`}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {job.job_title}
            </h3>
            <div className="mt-1 space-y-1">
              <div className={`flex items-center text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Building className="w-4 h-4 mr-1" />
                {job.employer_name}
              </div>
              <div className={`flex items-center text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4 mr-1" />
                {job.job_location}
              </div>
              <div className={`flex items-center text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
            <span>Apply</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </a>
      </div>
      <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {showFullDescription ? job.job_description : `${job.job_description.slice(0, 200)}...`}
        {!showFullDescription && job.job_description.length > 200 && (
          <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700 ml-1">
            more
          </button>
        )}
        {showFullDescription && (
          <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700 ml-1">
            less
          </button>
        )}
      </p>
    </div>
  );
}
