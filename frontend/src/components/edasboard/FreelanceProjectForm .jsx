
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, MapPin, Briefcase, DollarSign, Code, FileText, Check } from 'lucide-react';

const FreelanceProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    requiredSkills: [],
    budget: '',
    locationType: ''
  });

  const [inputStates, setInputStates] = useState({
    skillInput: '',
    showSkillInput: false
  });

  const textareaRef = useRef(null);
  const skillInputRef = useRef(null);

  const locationOptions = [
    { value: 'remote', label: 'Remote', icon: '🌐' },
    { value: 'physical', label: 'Physical', icon: '🏢' },
    { value: 'hybrid', label: 'Hybrid', icon: '🔄' }
  ];

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.projectDescription]);

  // Focus skill input when shown
  useEffect(() => {
    if (inputStates.showSkillInput && skillInputRef.current) {
      skillInputRef.current.focus();
    }
  }, [inputStates.showSkillInput]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      handleInputChange('budget', value);
    }
  };

  const addSkill = () => {
    const skill = inputStates.skillInput.trim();
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
      setInputStates(prev => ({ ...prev, skillInput: '', showSkillInput: false }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    } else if (e.key === 'Escape') {
      setInputStates(prev => ({ ...prev, skillInput: '', showSkillInput: false }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const isFormValid = formData.projectTitle && formData.projectDescription && formData.budget && formData.locationType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Freelance Project</h1>
          <p className="text-gray-600">Connect with talented freelancers across Nepal</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="space-y-6">
            
            {/* Project Title */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Project Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  placeholder="Build an E-commerce Product Page"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Project Description
              </label>
              <textarea
                ref={textareaRef}
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                placeholder="Explain the project requirements, timeline, and expected outcomes..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 placeholder-gray-400 resize-none overflow-hidden"
                style={{ minHeight: '120px' }}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Be specific about your requirements and expectations</p>
            </div>

            {/* Required Skills */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 flex items-center">
                <Code className="w-4 h-4 mr-1" />
                Required Skills
              </label>
              
              {/* Skills Display */}
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-sm transition-all duration-200"
                  >
                    #{skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {/* Skill Input */}
                {inputStates.showSkillInput ? (
                  <div className="inline-flex items-center bg-white border border-blue-300 rounded-full px-2 py-1 shadow-sm">
                    <span className="text-blue-600 text-sm">#</span>
                    <input
                      ref={skillInputRef}
                      type="text"
                      value={inputStates.skillInput}
                      onChange={(e) => setInputStates(prev => ({ ...prev, skillInput: e.target.value }))}
                      onKeyPress={handleSkillKeyPress}
                      onBlur={() => {
                        if (inputStates.skillInput.trim()) {
                          addSkill();
                        } else {
                          setInputStates(prev => ({ ...prev, showSkillInput: false }));
                        }
                      }}
                      placeholder="skill name"
                      className="bg-transparent border-none outline-none text-sm px-1 w-20 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="text-green-500 hover:text-green-600 transition-colors ml-1"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setInputStates(prev => ({ ...prev, showSkillInput: true }))}
                    className="inline-flex items-center px-3 py-1 border-2 border-dashed border-blue-300 rounded-full text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Skill
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500">Add skills like Figma, Laravel, React, etc.</p>
            </div>

            {/* Prize (Budget) */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Estimated Prize (in NPR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₨</span>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  placeholder="5000"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Fair pricing attracts quality freelancers</p>
            </div>

            {/* Location Type */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location Type
              </label>
              <div className="relative">
                <select
                  value={formData.locationType}
                  onChange={(e) => handleInputChange('locationType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 appearance-none bg-white cursor-pointer"
                  required
                >
                  <option value="">Select work location preference</option>
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center justify-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Post Freelance Project
              </span>
            </button>
            
            {!isFormValid && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Please fill in all required fields to post your project
              </p>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tips for Better Results</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Be clear about deliverables and timeline</li>
                  <li>• Set realistic budgets for quality work</li>
                  <li>• Include relevant skills to attract right talent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceProjectForm;