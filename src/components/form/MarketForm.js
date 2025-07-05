import { useState } from 'react';

const MarketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    new_customers: '',
    total_customers: '',
    customer_growth: '',
    retention_rate: '',
    churn_rate: '',
    pipeline_value: '',
    conversion_rate: '',
    sales_cycle: '',
    sales_process_changes: '',
    market_share: '',
    market_share_change: '',
    market_trends: ''
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
        <h3 className="text-lg font-medium text-gray-900">a) Customer Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New customers acquired this quarter*</label>
            <input
              type="number"
              name="new_customers"
              value={formData.new_customers}
              onChange={handleChange}
              required
              placeholder="e.g. 150"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total active customers*</label>
            <input
              type="number"
              name="total_customers"
              value={formData.total_customers}
              onChange={handleChange}
              required
              placeholder="e.g. 1200"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer growth rate (%)*</label>
            <input
              type="number"
              name="customer_growth"
              value={formData.customer_growth}
              onChange={handleChange}
              required
              placeholder="e.g. 12.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer retention rate (%)*</label>
            <input
              type="number"
              name="retention_rate"
              value={formData.retention_rate}
              onChange={handleChange}
              required
              placeholder="e.g. 85"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer churn rate (%)*</label>
            <input
              type="number"
              name="churn_rate"
              value={formData.churn_rate}
              onChange={handleChange}
              required
              placeholder="e.g. 5.2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Pipeline Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current sales pipeline value (₹)*</label>
            <input
              type="number"
              name="pipeline_value"
              value={formData.pipeline_value}
              onChange={handleChange}
              required
              placeholder="e.g. 25000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion rate (%)*</label>
            <input
              type="number"
              name="conversion_rate"
              value={formData.conversion_rate}
              onChange={handleChange}
              required
              placeholder="e.g. 15.3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average sales cycle (days)*</label>
            <input
              type="number"
              name="sales_cycle"
              value={formData.sales_cycle}
              onChange={handleChange}
              required
              placeholder="e.g. 45"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Changes to sales process implemented</label>
            <textarea
              name="sales_process_changes"
              value={formData.sales_process_changes}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Implemented new CRM system, added demo videos to sales process"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Market Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated market share (%)*</label>
            <input
              type="number"
              name="market_share"
              value={formData.market_share}
              onChange={handleChange}
              required
              placeholder="e.g. 8.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change in market share from previous quarter (%)</label>
            <input
              type="number"
              name="market_share_change"
              value={formData.market_share_change}
              onChange={handleChange}
              placeholder="e.g. 1.2 for 1.2% increase"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Key market trends affecting your business</label>
            <textarea
              name="market_trends"
              value={formData.market_trends}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Increased competition in SaaS space, rising demand for AI features"
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
          Save Market Data
        </button>
      </div>
    </form>
  );
};

export default MarketForm;












// import { useState } from 'react';

// const MarketForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     new_customers: '',
//     total_customers: '',
//     customer_growth: '',
//     retention_rate: '',
//     churn_rate: '',
//     pipeline_value: '',
//     conversion_rate: '',
//     sales_cycle: '',
//     sales_process_changes: '',
//     market_share: '',
//     market_share_change: '',
//     market_trends: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">a) Customer Metrics</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">New customers acquired this quarter*</label>
//             <input
//               type="number"
//               name="new_customers"
//               value={formData.new_customers}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Total active customers*</label>
//             <input
//               type="number"
//               name="total_customers"
//               value={formData.total_customers}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Customer growth rate (%)</label>
//             <input
//               type="number"
//               name="customer_growth"
//               value={formData.customer_growth}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Customer retention rate (%)</label>
//             <input
//               type="number"
//               name="retention_rate"
//               value={formData.retention_rate}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Customer churn rate (%)</label>
//             <input
//               type="number"
//               name="churn_rate"
//               value={formData.churn_rate}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">b) Pipeline Health</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Current sales pipeline value</label>
//             <input
//               type="number"
//               name="pipeline_value"
//               value={formData.pipeline_value}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Conversion rate (%)</label>
//             <input
//               type="number"
//               name="conversion_rate"
//               value={formData.conversion_rate}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Average sales cycle (days)</label>
//             <input
//               type="number"
//               name="sales_cycle"
//               value={formData.sales_cycle}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Changes to sales process implemented</label>
//             <textarea
//               name="sales_process_changes"
//               value={formData.sales_process_changes}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">c) Market Position</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Estimated market share (%)</label>
//             <input
//               type="number"
//               name="market_share"
//               value={formData.market_share}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Change in market share from previous quarter</label>
//             <input
//               type="text"
//               name="market_share_change"
//               value={formData.market_share_change}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Key market trends affecting your business</label>
//             <textarea
//               name="market_trends"
//               value={formData.market_trends}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//         >
//           Save Market Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MarketForm;
















// import { useState } from 'react';

// const MarketForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     market_share: '',
//     competitors: '',
//     growthRate: '',
//     customers: '',
//     partnerships: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Market Share (%)</label>
//           <input
//             type="number"
//             name="market_share"
//             value={formData.market_share}
//             onChange={handleChange}
//             min="0"
//             max="100"
//             step="0.1"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Main Competitors</label>
//           <input
//             type="text"
//             name="competitors"
//             value={formData.competitors}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Comma separated list"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate (%)</label>
//           <input
//             type="number"
//             name="growthRate"
//             value={formData.growthRate}
//             onChange={handleChange}
//             step="0.1"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Customer Count</label>
//           <input
//             type="number"
//             name="customers"
//             value={formData.customers}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Key Partnerships</label>
//           <textarea
//             name="partnerships"
//             value={formData.partnerships}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Describe key partnerships or collaborations"
//           />
//         </div>
//       </div>
      
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//         >
//           Save Market Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MarketForm;