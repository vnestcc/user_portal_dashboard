import { useState } from 'react';

const AdditionalInformationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    growth_challenges: '',
    support_needed: '',
    policy_changes: '',
    policy_impact: '',
    mitigation_strategies: '',
    new_initiatives: '',
    initiative_progress: '',
    business_model_adjustments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Key Blockers</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of challenges preventing faster growth</label>
              <input
                type="text"
                name="growth_challenges"
                value={formData.growth_challenges}
                onChange={handleChange}
                placeholder="Enter number of challenges preventing faster growth (eg., 10)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support needed to address these challenges</label>
            <textarea
              name="support_needed"
              value={formData.support_needed}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of support needed to address these challenges (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Government Policy Impact</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recent policy changes affecting your business</label>
            <textarea
              name="policy_changes"
              value={formData.policy_changes}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of recent policy changes affecting your business (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected impact (positive/negative)</label>
            <textarea
              name="policy_impact"
              value={formData.policy_impact}
              onChange={handleChange}
              rows="3"
              placeholder="Enter Expected impact (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mitigation strategies</label>
            <textarea
              name="mitigation_strategies"
              value={formData.mitigation_strategies}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of Mitigation strategies (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Strategic Initiatives</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New strategic initiatives launched</label>
            <textarea
              name="new_initiatives"
              value={formData.new_initiatives}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of New strategic initiatives launched (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Progress on existing strategic initiatives</label>
            <textarea
              name="initiative_progress"
              value={formData.initiative_progress}
              onChange={handleChange}
              rows="3"
              placeholder="Enter Progress on existing strategic initiatives (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Planned pivots or business model adjustments</label>
            <textarea
              name="business_model_adjustments"
              value={formData.business_model_adjustments}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of Planned pivots or business model adjustments (eg., 10)"
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
          Save Additional Information
        </button>
      </div>
    </form>
  );
};

export default AdditionalInformationForm;