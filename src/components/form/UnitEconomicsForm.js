import { useState } from 'react';

const UnitEconomicsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cac: '',
    cac_change: '',
    marketing_breakdowns: [{ channel: '', spend: '', budget: '', cac: '' }],
    ltv: '',
    ltv_ratio: '',
    cac_payback: '',
    arpu: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlemarketing_breakdownsChange = (index, field, value) => {
    const updatedSpend = [...formData.marketing_breakdowns];
    updatedSpend[index][field] = value;
    setFormData(prev => ({ ...prev, marketing_breakdowns: updatedSpend }));
  };

  const addmarketing_breakdowns = () => {
    setFormData(prev => ({
      ...prev,
      marketing_breakdowns: [...prev.marketing_breakdowns, { channel: '', spend: '', budget: '', cac: '' }]
    }));
  };

  const removemarketing_breakdowns = (index) => {
    const updatedSpend = [...formData.marketing_breakdowns];
    updatedSpend.splice(index, 1);
    setFormData(prev => ({ ...prev, marketing_breakdowns: updatedSpend }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Customer Acquisition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Acquisition Cost (CAC) (₹)*</label>
            <input
              type="number"
              name="cac"
              value={formData.cac}
              onChange={handleChange}
              required
              placeholder="e.g., 5000 (total cost to acquire one customer)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change in CAC from previous quarter (%)*</label>
            <input
              type="number"
              name="cac_change"
              value={formData.cac_change}
              onChange={handleChange}
              required
              placeholder="e.g., 10 (percentage increase/decrease)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marketing spend breakdown</label>
          {formData.marketing_breakdowns.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="e.g., Facebook Ads, Google Ads"
                  value={item.channel}
                  onChange={(e) => handlemarketing_breakdownsChange(index, 'channel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="e.g., 20000 (actual spend)"
                  value={item.spend}
                  onChange={(e) => handlemarketing_breakdownsChange(index, 'spend', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="e.g., 25000 (allocated budget)"
                  value={item.budget}
                  onChange={(e) => handlemarketing_breakdownsChange(index, 'budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="e.g., 3000 (CAC for this channel)"
                  value={item.cac}
                  onChange={(e) => handlemarketing_breakdownsChange(index, 'cac', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removemarketing_breakdowns(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addmarketing_breakdowns}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            + Add Marketing Channel
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Customer Value</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Customer Lifetime Value (LTV) (₹)*</label>
            <input
              type="number"
              name="ltv"
              value={formData.ltv}
              onChange={handleChange}
              required
              placeholder="e.g., 15000 (total revenue per customer)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LTV:CAC Ratio (x)*</label>
            <input
              type="number"
              name="ltv_ratio"
              value={formData.ltv_ratio}
              onChange={handleChange}
              required
              placeholder="e.g., 3 (LTV divided by CAC)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CAC Payback Period (months)*</label>
            <input
              type="number"
              name="cac_payback"
              value={formData.cac_payback}
              onChange={handleChange}
              required
              placeholder="e.g., 6 (months to recover CAC)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Revenue Per User (ARPU) (₹)*</label>
            <input
              type="number"
              name="arpu"
              value={formData.arpu}
              onChange={handleChange}
              required
              placeholder="e.g., 2000 (monthly revenue per user)"
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
          Save Unit Economics Data
        </button>
      </div>
    </form>
  );
};

export default UnitEconomicsForm;












// import { useState } from 'react';

// const UnitEconomicsForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     cac: '',
//     cac_change: '',
//     marketing_breakdowns: [{ channel: '', spend: '', budget: '', cac: '' }],
//     ltv: '',
//     ltv_ratio: '',
//     cac_payback: '',
//     arpu: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlemarketing_breakdownsChange = (index, field, value) => {
//     const updatedSpend = [...formData.marketing_breakdowns];
//     updatedSpend[index][field] = value;
//     setFormData(prev => ({ ...prev, marketing_breakdowns: updatedSpend }));
//   };

//   const addmarketing_breakdowns = () => {
//     setFormData(prev => ({
//       ...prev,
//       marketing_breakdowns: [...prev.marketing_breakdowns, { channel: '', spend: '', percentage: '', cac: '' }]
//     }));
//   };

//   const removemarketing_breakdowns = (index) => {
//     const updatedSpend = [...formData.marketing_breakdowns];
//     updatedSpend.splice(index, 1);
//     setFormData(prev => ({ ...prev, marketing_breakdowns: updatedSpend }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">a) Customer Acquisition</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Customer Acquisition Cost (CAC)*</label>
//             <input
//               type="number"
//               name="cac"
//               value={formData.cac}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Change in CAC from previous quarter (%)</label>
//             <input
//               type="number"
//               name="cac_change"
//               value={formData.cac_change}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Marketing spend breakdown</label>
//           {formData.marketing_breakdowns.map((item, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Channel"
//                   value={item.channel}
//                   onChange={(e) => handlemarketing_breakdownsChange(index, 'channel', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   placeholder="Spend"
//                   value={item.spend}
//                   onChange={(e) => handlemarketing_breakdownsChange(index, 'spend', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   placeholder="% of Budget"
//                   value={item.percentage}
//                   onChange={(e) => handlemarketing_breakdownsChange(index, 'percentage', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="number"
//                   placeholder="CAC by Channel"
//                   value={item.cac}
//                   onChange={(e) => handlemarketing_breakdownsChange(index, 'cac', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removemarketing_breakdowns(index)}
//                     className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addmarketing_breakdowns}
//             className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//           >
//             + Add Marketing Channel
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">b) Customer Value</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Average Customer Lifetime Value (LTV)</label>
//             <input
//               type="number"
//               name="ltv"
//               value={formData.ltv}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">LTV ratio</label>
//             <input
//               type="number"
//               name="ltv_ratio"
//               value={formData.ltv_ratio}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">CAC payback period (months)</label>
//             <input
//               type="number"
//               name="cac_payback"
//               value={formData.cac_payback}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Average Revenue Per User (ARPU)</label>
//             <input
//               type="number"
//               name="arpu"
//               value={formData.arpu}
//               onChange={handleChange}
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
//           Save Unit Economics Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UnitEconomicsForm;