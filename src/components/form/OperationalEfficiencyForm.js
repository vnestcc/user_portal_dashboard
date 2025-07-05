import { useState } from 'react';

const OperationalEfficiencyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    operational_changes: '',
    impact_metrics: '',
    optimization_areas: '',
    operational_bottlenecks: '',
    infrastructure_capacity: '',
    scaling_plans: ''
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
        <h3 className="text-lg font-medium text-gray-900">a) Process Improvements</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operational changes implemented this quarter</label>
            <textarea
              name="operational_changes"
              value={formData.operational_changes}
              onChange={handleChange}
              rows="3"
              placeholder="Number of operational changes made this quarter (eq., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Impact of these changes (metrics)</label>
            <textarea
              name="impact_metrics"
              value={formData.impact_metrics}
              onChange={handleChange}
              rows="3"
              placeholder="Number of impacts occured due to these operational changes (eq., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Areas identified for future optimization</label>
            <textarea
              name="optimization_areas"
              value={formData.optimization_areas}
              onChange={handleChange}
              rows="3"
              placeholder="Number of areas identified for future optimization (eq., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Scalability Assessment</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current operational bottlenecks</label>
            <textarea
              name="operational_bottlenecks"
              value={formData.operational_bottlenecks}
              onChange={handleChange}
              rows="3"
              placeholder="Number of operational bottlenecks sensed this quarter (eq., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Infrastructure/systems capacity</label>
            <textarea
              name="infrastructure_capacity"
              value={formData.infrastructure_capacity}
              onChange={handleChange}
              rows="3"
              placeholder="Number of infrastructure/systems capacity this quarter (eq., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plans to address scaling challenges</label>
            <textarea
              name="scaling_plans"
              value={formData.scaling_plans}
              onChange={handleChange}
              rows="3"
              placeholder="Number of scaling challenges addressed this quarter (eg., 10)"
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
          Save Operational Efficiency Data
        </button>
      </div>
    </form>
  );
};

export default OperationalEfficiencyForm;