import React, { useState } from 'react';
import chevYouPfp from "../assets/bechev.jpg";

import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Github, 
  Linkedin,
  Edit,
  Plus
} from 'lucide-react';

const ChevYou = () => {
  const [skills, setSkills] = useState([
    'Software Development',
    'Project Management',
    'API Development',
    'AI Development',
    'Team Leadership',
    'Data Analysis'
  ]);

  const [positions, setPositions] = useState([
    {
      title: 'Senior Process Engineer',
      company: 'Energy Solutions Inc.',
      duration: '2019 - Present',
      description: 'Led process optimization initiatives resulting in 15% efficiency improvement'
    },
    {
      title: 'Software Developer',
      company: 'Google',
      duration: '2016 - 2019',
      description: 'Managed Google clouds data centers and strived for better optimization'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header/Banner Section */}
          <div className="h-32 bg-gradient-to-r from-[#00395D] to-blue-500"></div>
          
          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4">
              <img
                src={chevYouPfp}
                alt="Profile"
                className="w-65 h-45 rounded-full border-4 border-white shadow-lg"
              />
              <div className="mt-4 md:mt-0 md:ml-6 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">TyRique Blaine</h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  Atlanta, GA
                </p>
              </div>
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                tyrblaine@gmail.com
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                +1 (678) 555-0123
              </div>
              <div className="flex items-center text-gray-600">
                <Github className="w-5 h-5 mr-2" />
                github.com/tyrblaine
              </div>
              <div className="flex items-center text-gray-600">
                <Linkedin className="w-5 h-5 mr-2" />
                linkedin.com/in/tyrblaine
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">
              I'm TyRique Blaine, a visionary in technology and a dedicated software developer 
              with a passion for building innovative digital solutions. With a strong foundation 
              in computer science and a forward-thinking mindset, I thrive on turning complex 
              challenges into impactful applications. Whether it's crafting intuitive user 
              experiences or engineering robust backend systems, I’m driven by the future of 
              tech and the power it holds to transform lives and industries.
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-[#00395D] rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">Experience</h2>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-start">
                      <Briefcase className="w-5 h-5 text-[#00395D] mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{position.title}</h3>
                        <p className="text-gray-600">{position.company}</p>
                        <p className="text-sm text-gray-500">{position.duration}</p>
                        <p className="text-gray-600 mt-1">{position.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex items-start">
                  <GraduationCap className="w-5 h-5 text-[#00395D] mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">P.h.D in Computer Science</h3>
                    <p className="text-gray-600">North Carolina A&T State University</p>
                    <p className="text-sm text-gray-500">2014 - 2016</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChevYou;