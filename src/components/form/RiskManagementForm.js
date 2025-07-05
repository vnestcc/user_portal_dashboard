import { useState } from 'react';

const RiskManagementForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    regulatory_changes: '',
    compliance_status: '',
    regulatory_concerns: '',
    security_audits: '',
    data_protection: '',
    security_incidents: '',
    key_dependencies: '',
    contingency_plans: ''
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
        <h3 className="text-lg font-medium text-gray-900">a) Regulatory Environment</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relevant regulatory changes</label>
            <textarea
              name="regulatory_changes"
              value={formData.regulatory_changes}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of relevant regulatory changes (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compliance status</label>
            <textarea
              name="compliance_status"
              value={formData.compliance_status}
              onChange={handleChange}
              rows="3"
              placeholder="Describe current compliance status (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pending regulatory concerns</label>
            <textarea
              name="regulatory_concerns"
              value={formData.regulatory_concerns}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of pending regulatory concerns (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Security & Data Protection</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Security audits conducted</label>
            <textarea
              name="security_audits"
              value={formData.security_audits}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of security audits conducted (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data protection measures</label>
            <textarea
              name="data_protection"
              value={formData.data_protection}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of data protection measures taken (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Security incidents (if any)</label>
            <textarea
              name="security_incidents"
              value={formData.security_incidents}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of security incidents (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Critical Dependencies</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key vendor/partner dependencies</label>
            <textarea
              name="key_dependencies"
              value={formData.key_dependencies}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of key vendor/partner dependencies (eg., 10)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contingency plans</label>
            <textarea
              name="contingency_plans"
              value={formData.contingency_plans}
              onChange={handleChange}
              rows="3"
              placeholder="Enter number of contingency plans taken (eg., 10)"
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
          Save Risk Management Data
        </button>
      </div>
    </form>
  );
};

export default RiskManagementForm;