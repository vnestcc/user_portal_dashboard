import { useState } from 'react';

const CompetitiveLandscapeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    new_competitors: '',
    competitor_strategies: '',
    market_shifts: '',
    differentiators: '',
    threats: '',
    defensive_strategies: ''
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
        <h3 className="text-lg font-medium text-gray-900">a) Market Changes</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New competitors that emerged this quarter</label>
            <textarea
              name="new_competitors"
              value={formData.new_competitors}
              onChange={handleChange}
              rows="3"
              placeholder="Enter how many new competitors emerged this quarter (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Changes in competitor strategies</label>
            <textarea
              name="competitor_strategies"
              value={formData.competitor_strategies}
              onChange={handleChange}
              rows="3"
              placeholder="Enter how many new strategies you took this quarter (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry consolidation or other market shifts</label>
            <textarea
              name="market_shifts"
              value={formData.market_shifts}
              onChange={handleChange}
              rows="3"
              placeholder="Enter how many market shifts this quarter (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Competitive Positioning</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your current key differentiators (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              name="differentiators"
              value={formData.differentiators}
              onChange={handleChange}
              placeholder="Score your competitive differentiators (higher is better)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Rate how strong your unique value proposition is compared to competitors (1 = weak, 100 = extremely strong)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Threats to your competitive advantage (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              name="threats"
              value={formData.threats}
              onChange={handleChange}
              placeholder="Score the level of threats you're facing"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Rate the severity of threats to your market position (1 = minimal, 100 = existential threat)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Defensive strategies implemented (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              name="defensive_strategies"
              value={formData.defensive_strategies}
              onChange={handleChange}
              placeholder="Score your defensive measures"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Rate how effectively you're protecting your market position (1 = no defenses, 100 = excellent protection)
            </p>
          </div>
        
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Competitive Landscape Data
        </button>
      </div>
    </form>
  );
};

export default CompetitiveLandscapeForm;