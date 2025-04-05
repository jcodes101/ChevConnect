import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { Search, MapPin, Briefcase, Calendar, X } from 'lucide-react';

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: "Process Engineer",
    location: "Houston, TX",
    type: "Full-time",
    department: "Engineering",
    matchScore: 92,
    description: "Design, develop and optimize refining processes to improve efficiency and reduce environmental impact.",
    requirements: ["Bachelor's in Chemical Engineering", "3+ years experience", "Process simulation skills"],
    postedDate: "2023-10-15",
    applicationDeadline: "2023-11-30"
  },
  {
    id: 2,
    title: "Data Scientist Intern",
    location: "San Ramon, CA",
    type: "Internship",
    department: "Technology",
    matchScore: 88,
    description: "Apply machine learning and statistical analysis to solve complex energy production challenges.",
    requirements: ["Currently pursuing MS/PhD in Data Science or related field", "Python, R, SQL proficiency", "Experience with ML frameworks"],
    postedDate: "2023-10-20",
    applicationDeadline: "2023-12-15"
  },
  {
    id: 3,
    title: "Environmental Specialist",
    location: "Richmond, CA",
    type: "Full-time",
    department: "Sustainability",
    matchScore: 85,
    description: "Lead environmental compliance initiatives and sustainability projects across refining operations.",
    requirements: ["Bachelor's in Environmental Science", "5+ years experience", "Knowledge of environmental regulations"],
    postedDate: "2023-10-10",
    applicationDeadline: "2023-11-25"
  },
  {
    id: 4,
    title: "Financial Analyst",
    location: "Houston, TX",
    type: "Full-time",
    department: "Business",
    matchScore: 79,
    description: "Analyze financial data and prepare reports to guide strategic business decisions.",
    requirements: ["Bachelor's in Finance or Accounting", "2+ years experience", "Advanced Excel skills"],
    postedDate: "2023-10-18",
    applicationDeadline: "2023-12-05"
  },
  {
    id: 5,
    title: "Petroleum Engineering Intern",
    location: "Midland, TX",
    type: "Internship",
    department: "Engineering",
    matchScore: 94,
    description: "Support drilling and production operations through technical analysis and field studies.",
    requirements: ["Currently pursuing degree in Petroleum Engineering", "GPA 3.5+", "Willingness to work in field conditions"],
    postedDate: "2023-10-25",
    applicationDeadline: "2023-12-20"
  },
  {
    id: 6,
    title: "IT Security Analyst",
    location: "San Ramon, CA",
    type: "Full-time",
    department: "Technology",
    matchScore: 82,
    description: "Implement and monitor security measures to protect company systems and data infrastructure.",
    requirements: ["Bachelor's in Computer Science or related field", "Security certifications (CISSP, CEH)", "3+ years experience"],
    postedDate: "2023-10-12",
    applicationDeadline: "2023-11-28"
  }
];

const Dashboard = () => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [sortBy, setSortBy] = useState('matchScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const getFilteredJobs = useCallback(() => {
    let filtered = [...jobs];

    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => 
        job.type.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [jobs, activeFilter, searchTerm, sortBy, sortDirection]);

  useEffect(() => {
    const charts = [];
    
    const matchCtx = document.getElementById('matchDistributionChart');
    if (matchCtx) {
      const matchData = {
        labels: ['90-100%', '80-89%', '70-79%', '<70%'],
        datasets: [{
          label: 'Number of Jobs',
          data: [
            jobs.filter(job => job.matchScore >= 90).length,
            jobs.filter(job => job.matchScore >= 80 && job.matchScore < 90).length,
            jobs.filter(job => job.matchScore >= 70 && job.matchScore < 80).length,
            jobs.filter(job => job.matchScore < 70).length,
          ],
          backgroundColor: [
            'rgba(0, 57, 93, 0.8)',
            'rgba(0, 102, 162, 0.8)',
            'rgba(0, 147, 231, 0.8)',
            'rgba(0, 192, 255, 0.8)',
          ],
          borderColor: [
            'rgba(0, 57, 93, 1)',
            'rgba(0, 102, 162, 1)',
            'rgba(0, 147, 231, 1)',
            'rgba(0, 192, 255, 1)',
          ],
          borderWidth: 1,
        }],
      };

      charts.push(new Chart(matchCtx, {
        type: 'bar',
        data: matchData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      }));
    }

    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
      const deptData = {};
      jobs.forEach(job => {
        deptData[job.department] = (deptData[job.department] || 0) + 1;
      });

      const deptChartData = {
        labels: Object.keys(deptData),
        datasets: [{
          data: Object.values(deptData),
          backgroundColor: [
            'rgba(0, 57, 93, 0.8)',
            'rgba(0, 102, 162, 0.8)',
            'rgba(0, 147, 231, 0.8)',
          ],
          borderColor: [
            'rgba(0, 57, 93, 1)',
            'rgba(0, 102, 162, 1)',
            'rgba(0, 147, 231, 1)',
          ],
          borderWidth: 1,
        }],
      };

      charts.push(new Chart(deptCtx, {
        type: 'doughnut',
        data: deptChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
              },
            },
          },
        },
      }));
    }

    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, [jobs]);

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('-');
    setSortBy(field);
    setSortDirection(direction);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const filteredJobs = getFilteredJobs();
  const fullTimeJobs = jobs.filter(job => job.type === 'Full-time').length;
  const internships = jobs.filter(job => job.type === 'Internship').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#00395D] to-[#0066A2] px-6 py-8 sm:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">Your Job Match Results</h1>
              <p className="text-blue-100">Based on your resume and preferences, we've found {jobs.length} potential matches for you.</p>
            </div>
            <div className="flex space-x-4">
              <div className="match-badge bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-filter backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{fullTimeJobs}</div>
                <div className="text-blue-100 text-sm">Full-time Jobs</div>
              </div>
              <div className="match-badge bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-filter backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{internships}</div>
                <div className="text-blue-100 text-sm">Internships</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Match Distribution</h3>
              <div className="h-64">
                <canvas id="matchDistributionChart"></canvas>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Departments</h3>
              <div className="h-64">
                <canvas id="departmentChart"></canvas>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Top Match</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      className="text-gray-200" 
                      strokeWidth="10" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                    />
                    <circle 
                      className="text-[#00395D] progress-ring" 
                      strokeWidth="10" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - Math.max(...jobs.map(j => j.matchScore)) / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#00395D]">
                      {Math.max(...jobs.map(j => j.matchScore))}%
                    </span>
                  </div>
                </div>
                {jobs.length > 0 && (
                  <>
                    <p className="mt-4 text-center font-medium text-gray-900">
                      {jobs.sort((a, b) => b.matchScore - a.matchScore)[0].title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {jobs.sort((a, b) => b.matchScore - a.matchScore)[0].location}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <button 
                className={`filter-btn px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${activeFilter === 'full-time' ? 'active' : ''}`}
                onClick={() => setActiveFilter('full-time')}
              >
                Full-time
              </button>
              <button 
                className={`filter-btn px-4 py-2 rounded-md border border-gray-300 text-sm font-medium ${activeFilter === 'internship' ? 'active' : ''}`}
                onClick={() => setActiveFilter('internship')}
              >
                Internships
              </button>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00395D] focus:border-[#00395D]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00395D] focus:border-[#00395D]"
                onChange={handleSortChange}
                value={`${sortBy}-${sortDirection}`}
              >
                <option value="matchScore-desc">Match: High to Low</option>
                <option value="matchScore-asc">Match: Low to High</option>
                <option value="postedDate-desc">Newest First</option>
                <option value="postedDate-asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.department}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Apply by {formatDate(job.applicationDeadline)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {job.type}
                    </span>
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {req.length > 25 ? req.substring(0, 25) + '...' : req}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button 
                      className="text-[#00395D] hover:text-[#002D4A] text-sm font-medium"
                      onClick={() => setSelectedJob(job)}
                    >
                      View Details
                    </button>
                    <button className="bg-[#00395D] hover:bg-[#002D4A] text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No matches found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setSelectedJob(null)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">{selectedJob.location}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Department</h3>
                  <p className="text-gray-600">{selectedJob.department}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Job Type</h3>
                  <p className="text-gray-600">{selectedJob.type}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Match Score</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-[#00395D] h-4 rounded-full" 
                    style={{ width: `${selectedJob.matchScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Your profile matches {selectedJob.matchScore}% of the requirements for this position.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="mb-1">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Application Timeline</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="font-medium w-24">Posted:</span>
                  {formatDate(selectedJob.postedDate)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Apply by:</span>
                  {formatDate(selectedJob.applicationDeadline)}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 border border-[#00395D] text-[#00395D] rounded hover:bg-[#00395D] hover:text-white transition-colors duration-200">
                  Save for Later
                </button>
                <button className="px-4 py-2 bg-[#00395D] text-white rounded hover:bg-[#002D4A] transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;