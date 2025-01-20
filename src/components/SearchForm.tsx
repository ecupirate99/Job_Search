import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (jobTitle: string, location: string) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

export function SearchForm({ onSubmit, isLoading, isDarkMode }: SearchFormProps) {
  const [jobTitle, setJobTitle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [errors, setErrors] = React.useState({ jobTitle: '', location: '' });

  const validateInput = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s,]/g, '').trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      jobTitle: !jobTitle ? 'Job title is required' : '',
      location: !location ? 'Location is required' : '',
    };

    setErrors(newErrors);

    if (!newErrors.jobTitle && !newErrors.location) {
      const sanitizedJobTitle = validateInput(jobTitle);
      const sanitizedLocation = validateInput(location);
      onSubmit(sanitizedJobTitle, sanitizedLocation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Job Title (e.g. Software Engineer)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.jobTitle ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm">{errors.jobTitle}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Location (e.g. Raleigh, NC)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          isDarkMode
            ? 'bg-blue-700 hover:bg-blue-800 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>Search Jobs</span>
          </>
        )}
      </button>
    </form>
  );
}
