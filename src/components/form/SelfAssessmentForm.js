import { useState } from 'react';

const SelfAssessmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    financial_rating: "",
    market_rating: "",
    product_rating: "",
    team_rating: "",
    operational_rating: "",
    overall_rating: "",
    priorities: ["","",""],
    incubator_support: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert to number if it's a rating field
    const updatedValue = name.endsWith('_rating') ? parseInt(value, 10) || 0 : value;
    
    setFormData(prev => ({ ...prev, [name]: updatedValue }));
  };

  const handlePriorityChange = (index, value) => {
    const updatedPriorities = [...formData.priorities];
    updatedPriorities[index] = value;
    setFormData(prev => ({ ...prev, priorities: updatedPriorities }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Rate your company's current performance (1-10) in each area:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Financial Health</label>
            <input
              type="number"
              name="financial_rating"
              min="1"
              max="10"
              value={formData.financial_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Traction</label>
            <input
              type="number"
              name="market_rating"
              min="1"
              max="10"
              value={formData.market_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Development</label>
            <input
              type="number"
              name="product_rating"
              min="1"
              max="10"
              value={formData.product_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Performance</label>
            <input
              type="number"
              name="team_rating"
              min="1"
              max="10"
              value={formData.team_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operational Efficiency</label>
            <input
              type="number"
              name="operational_rating"
              min="1"
              max="10"
              value={formData.operational_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Health</label>
            <input
              type="number"
              name="overall_rating"
              min="1"
              max="10"
              value={formData.overall_rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) What are your top 3 priorities for next quarter?</h3>
        <div className="grid grid-cols-1 gap-6">
            {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority {index + 1}</label>
              <input
                type="text"
                value={formData.priorities[index]}
                onChange={(e) => handlePriorityChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Where do you most need incubator support?</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <textarea
              name="incubator_support"
              value={formData.incubator_support}
              onChange={handleChange}
              rows="3"
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
          Save Self Assessment
        </button>
      </div>
    </form>
  );
};

export default SelfAssessmentForm;