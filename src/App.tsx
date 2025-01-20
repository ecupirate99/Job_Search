import React from 'react';
import { SearchForm } from './components/SearchForm';
import { JobList } from './components/JobList';
import { Briefcase, Moon, Sun } from 'lucide-react';
import type { Job } from './types';

function App() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [noJobsMessage, setNoJobsMessage] = React.useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const searchJobs = async (jobTitle: string, location: string) => {
    setIsLoading(true);
    setError('');
    setNoJobsMessage('');

    const query = `${jobTitle} jobs in ${location}`;

    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
          query
        )}&page=1&num_pages=1&date_posted=3days&country=us&employment_types=fulltime&radius=8`,
        {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      if (data.data && data.data.length === 0) {
        setNoJobsMessage('No jobs found within 5 miles with that job title, please try another job title.');
        setJobs([]);
      } else {
        const sortedJobs = [...data.data].sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
        setJobs(sortedJobs);
      }
    } catch (err) {
      setError('An error occurred while searching for jobs. Please try again.');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <Briefcase className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Job Search</h1>
            </div>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find your next opportunity - Search thousands of jobs
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-white" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <SearchForm onSubmit={searchJobs} isLoading={isLoading} isDarkMode={isDarkMode} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {noJobsMessage && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {noJobsMessage}
          </div>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            jobs.length > 0 && <JobList jobs={jobs} isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
      <footer className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Created by Quintin - Powered by AI
      </footer>
    </div>
  );
}

export default App;
