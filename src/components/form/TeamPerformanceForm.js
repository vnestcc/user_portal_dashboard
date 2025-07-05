import { useState } from 'react';

const TeamPerformanceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    team_size: '',
    new_hires: '',
    turnover: '',
    vacant_positions: '',
    leadership_alignment: '',
    team_strengths: '',
    skill_gaps: '',
    development_initiatives: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Team Composition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current team size*</label>
            <input
              type="number"
              name="team_size"
              value={formData.team_size}
              onChange={handleChange}
              required
              placeholder="e.g. 12"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New hires this quarter</label>
            <input
              type="number"
              name="new_hires"
              value={formData.new_hires}
              onChange={handleChange}
              placeholder="e.g. 4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee turnover this quarter</label>
            <input
              type="number"
              name="turnover"
              value={formData.turnover}
              onChange={handleChange}
              placeholder="e.g. 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key positions currently vacant</label>
            <input
              type="number"
              name="vacant_positions"
              value={formData.vacant_positions}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Team Effectiveness</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leadership team alignment score (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              name="leadership_alignment"
              value={formData.leadership_alignment}
              onChange={handleChange}
              placeholder="e.g. 85"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top team strengths (comma separated)</label>
            <textarea
              name="team_strengths"
              value={formData.team_strengths}
              onChange={handleChange}
              rows="2"
              placeholder="e.g. Agile Development, Technical Innovation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Identified skill gaps (comma separated)</label>
            <textarea
              name="skill_gaps"
              value={formData.skill_gaps}
              onChange={handleChange}
              rows="2"
              placeholder="e.g. Cloud Architecture, Advanced Data Analysis"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team development initiatives (one per line)</label>
            <textarea
              name="development_initiatives"
              value={formData.development_initiatives}
              onChange={handleChange}
              rows="3"
              placeholder={`e.g. Mentorship Program, Technical Training`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Team Performance Data
        </button>
      </div>
    </form>
  );
};

export default TeamPerformanceForm;