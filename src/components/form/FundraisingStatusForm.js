import { useState } from 'react';

const FundraisingStatusForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    last_round: '',
    current_investors: '',
    investor_relations: '',
    next_round: '',
    target_amount: '',
    investor_pipeline: '',
    valuation_expectations: ''
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
        <h3 className="text-lg font-medium text-gray-900">a) Current Funding Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last funding round date</label>
            <input
              type="date"
              name="last_round"
              value={formData.last_round}
              onChange={handleChange}
              placeholder="Select the date of your last funding round"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: 2023-03-15</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current investors</label>
            <input
              type="text"
              name="current_investors"
              value={formData.current_investors}
              onChange={handleChange}
              placeholder="List your current investors (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: Sequoia, Accel, AngelList</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Investor relations score (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              name="investor_relations"
              value={formData.investor_relations}
              onChange={handleChange}
              placeholder="Rate your current investor engagement"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">0 = No engagement, 100 = Excellent engagement</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Future Funding Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Next planned funding round (target date)</label>
            <input
              type="date"
              name="next_round"
              value={formData.next_round}
              onChange={handleChange}
              placeholder="Select target date for next round"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: 2024-01-30</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target amount for next round (in ₹Cr)</label>
            <input
              type="number"
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              placeholder="Enter target amount in crores"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: 50 (for ₹50Cr)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current investor pipeline count</label>
            <input
              type="number"
              name="investor_pipeline"
              value={formData.investor_pipeline}
              onChange={handleChange}
              placeholder="Number of investors in discussions"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: 15 (for 15 active conversations)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valuation expectations (in ₹Cr)</label>
            <input
              type="number"
              name="valuation_expectations"
              value={formData.valuation_expectations}
              onChange={handleChange}
              placeholder="Expected valuation in crores"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Example: 500 (for ₹500Cr valuation)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Fundraising Status Data
        </button>
      </div>
    </form>
  );
};

export default FundraisingStatusForm;