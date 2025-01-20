export interface JobSearchResponse {
  data: Job[];
  status: number;
}

export interface Job {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_location: string;
  job_description: string;
  job_apply_link: string;
  job_posted_at_timestamp: number;
  employer_logo?: string;
}

export interface SearchFormData {
  jobTitle: string;
  location: string;
}
