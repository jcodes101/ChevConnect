import React from 'react';
import { ArrowRight } from 'lucide-react';
import cheveng from '../assets/cheveng.jpg';
import chevtech from '../assets/chevtech.jpg';
import chevbusiness from '../assets/chevbusiness.jpg';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <>
      <div className="relative h-[600px] bg-cover bg-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
            <source src="/chevvid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6 text-shadow">Find Your Career Match Today!</h1>
            <p className="text-xl mb-8">Join us in meeting the world's growing energy needs while advancing a lower carbon future.</p>
            <Link to="/resume">
              <button className="bg-[#00395D] hover:bg-[#002D4A] text-white px-8 py-4 rounded flex items-center group">
                Find Your Career Match
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src={cheveng}
                alt="Engineering careers" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00395D] mb-2">Engineering Careers</h3>
              <p className="text-gray-600 mb-4">Drive innovation and solve complex challenges in energy technology.</p>
              <a target="_blank" href="https://careers.chevron.com/search-jobs/engineer/35016/1?glat=36.074859619140625&glon=-79.78170013427734" className="text-[#00395D] font-semibold hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="text-center">
              <img 
                src={chevtech} 
                alt="Technology careers" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00395D] mb-2">Technology Careers</h3>
              <p className="text-gray-600 mb-4">Shape the future of energy through digital transformation.</p>
              <a target="_blank" href="https://careers.chevron.com/search-jobs/technology/35016/1?glat=36.074859619140625&glon=-79.78170013427734" className="text-[#00395D] font-semibold hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="text-center">
              <img 
                src={chevbusiness} 
                alt="Business careers" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00395D] mb-2">Business Careers</h3>
              <p className="text-gray-600 mb-4">Lead strategic initiatives and drive business growth globally.</p>
              <a target="_blank" href="https://careers.chevron.com/search-jobs/business/35016/1?glat=36.074859619140625&glon=-79.78170013427734" className="text-[#00395D] font-semibold hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;