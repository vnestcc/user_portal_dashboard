import { useState } from 'react';

const FinanceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cash_balance: '',
    burn_rate: '',
    cash_runway: '',
    burn_rate_change: '',
    quarterly_revenue: '',
    revenue_growth: '',
    revenue_breakdowns: [{ product: '', revenue: '', percentage: '' }],
    gross_margin: '',
    net_margin: '',
    profitability_timeline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlerevenue_breakdownsChange = (index, field, value) => {
    console.log(formData.revenue_breakdowns)
    const updatedBreakdown = [...formData.revenue_breakdowns];
    
    updatedBreakdown[index][field] = value;
    
    // Calculate percentage if revenue is updated
    if (field === 'revenue' && formData.quarterly_revenue) {
      const percentage = (parseFloat(value) / parseFloat(formData.quarterly_revenue)) * 100;
      updatedBreakdown[index].percentage = percentage.toFixed(2);
    }

    setFormData(prev => ({ ...prev, revenue_breakdowns: updatedBreakdown }));
  };

  const addrevenue_breakdowns = () => {
    setFormData(prev => ({
      ...prev,
      revenue_breakdowns: [...prev.revenue_breakdowns, { product: '', revenue: '', percentage: '' }]
    }));
  };

  const removerevenue_breakdowns = (index) => {
    const updatedBreakdown = [...formData.revenue_breakdowns];
    updatedBreakdown.splice(index, 1);
    setFormData(prev => ({ ...prev, revenue_breakdowns: updatedBreakdown }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Here: ",formData)
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Cash Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current cash balance (₹)*</label>
            <input
              type="number"
              name="cash_balance"
              value={formData.cash_balance}
              onChange={handleChange}
              required
              placeholder="e.g. 5000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly burn rate (₹)*</label>
            <input
              type="number"
              name="burn_rate"
              value={formData.burn_rate}
              onChange={handleChange}
              required
              placeholder="e.g. 500000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current cash runway (months)*</label>
            <input
              type="number"
              name="cash_runway"
              value={formData.cash_runway}
              onChange={handleChange}
              required
              placeholder="e.g. 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change in burn rate from previous quarter (%)</label>
            <input
              type="number"
              name="burn_rate_change"
              value={formData.burn_rate_change}
              onChange={handleChange}
              placeholder="e.g. -10 for 10% decrease"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Revenue Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total quarterly revenue (₹)*</label>
            <input
              type="number"
              name="quarterly_revenue"
              value={formData.quarterly_revenue}
              onChange={handleChange}
              required
              placeholder="e.g. 2500000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Revenue growth (% change from previous quarter)</label>
            <input
              type="number"
              name="revenue_growth"
              value={formData.revenue_growth}
              onChange={handleChange}
              placeholder="e.g. 15 for 15% growth"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Revenue breakdown by product/service line</label>
          {formData.revenue_breakdowns.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="e.g. SaaS Subscription"
                  value={item.product}
                  onChange={(e) => handlerevenue_breakdownsChange(index, 'product', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="e.g. 1500000"
                  value={item.revenue}
                  onChange={(e) => handlerevenue_breakdownsChange(index, 'revenue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Auto-calculated %"
                  value={item.percentage}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removerevenue_breakdowns(index)}
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
            onClick={addrevenue_breakdowns}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            + Add Product/Service Line
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Margins and Profitability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gross margin (%)*</label>
            <input
              type="number"
              name="gross_margin"
              value={formData.gross_margin}
              onChange={handleChange}
              required
              placeholder="e.g. 60"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Net margin (%)*</label>
            <input
              type="number"
              name="net_margin"
              value={formData.net_margin}
              onChange={handleChange}
              required
              placeholder="e.g. 20"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Path to profitability timeline (quarters, e.g. Q3)</label>
            <input
              type="text"
              name="profitability_timeline"
              value={formData.profitability_timeline}
              onChange={handleChange}
              placeholder="e.g. Q4 2023"
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
          Save Financial Data
        </button>
      </div>
    </form>
  );
};

export default FinanceForm;








// import { useState } from 'react';

// const FinanceForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     cash_balance: '',
//     burn_rate: '',
//     cash_runway: '',
//     burn_rate_change: '',
//     quarterly_revenue: '',
//     revenue_growth: '',
//     revenue_breakdowns: [{ product: '', revenue: '', percentage: '' }],
//     gross_margin: '',
//     net_margin: '',
//     profitability_timeline: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlerevenue_breakdownsChange = (index, field, value) => {
//     console.log(formData.revenue_breakdowns)
//     const updatedBreakdown = [...formData.revenue_breakdowns];
    
//     updatedBreakdown[index][field] = value;
    
//     // Calculate percentage if revenue is updated
//     if (field === 'revenue' && formData.quarterly_revenue) {
//       const percentage = (parseFloat(value) / parseFloat(formData.quarterly_revenue)) * 100;
//       updatedBreakdown[index].percentage = percentage.toFixed(2);
//     }

    
    
//     setFormData(prev => ({ ...prev, revenue_breakdowns: updatedBreakdown }));
//   };

//   const addrevenue_breakdowns = () => {
//     setFormData(prev => ({
//       ...prev,
//       revenue_breakdowns: [...prev.revenue_breakdowns, { product: '', revenue: '', percentage: '' }]
//     }));
//   };

//   const removerevenue_breakdowns = (index) => {
//     const updatedBreakdown = [...formData.revenue_breakdowns];
//     updatedBreakdown.splice(index, 1);
//     setFormData(prev => ({ ...prev, revenue_breakdowns: updatedBreakdown }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Here: ",formData)
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">a) Cash Position</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Current cash balance*</label>
//             <input
//               type="number"
//               name="cash_balance"
//               value={formData.cash_balance}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Monthly burn rate*</label>
//             <input
//               type="number"
//               name="burn_rate"
//               value={formData.burn_rate}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Current cash runway (months)*</label>
//             <input
//               type="number"
//               name="cash_runway"
//               value={formData.cash_runway}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Change in burn rate from previous quarter (%)</label>
//             <input
//               type="number"
//               name="burn_rate_change"
//               value={formData.burn_rate_change}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">b) Revenue Performance</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Total quarterly revenue*</label>
//             <input
//               type="number"
//               name="quarterly_revenue"
//               value={formData.quarterly_revenue}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Revenue growth (% change from previous quarter)</label>
//             <input
//               type="number"
//               name="revenue_growth"
//               value={formData.revenue_growth}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Revenue breakdown by product/service line</label>
//           {formData.revenue_breakdowns.map((item, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Product/Service"
//                   value={item.product}
//                   onChange={(e) => handlerevenue_breakdownsChange(index, 'product', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   placeholder="Revenue"
//                   value={item.revenue}
//                   onChange={(e) => handlerevenue_breakdownsChange(index, 'revenue', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   placeholder="% of Total"
//                   value={item.percentage}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
//                 />
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removerevenue_breakdowns(index)}
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
//             onClick={addrevenue_breakdowns}
//             className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//           >
//             + Add Product/Service Line
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">c) Margins and Profitability</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Gross margin (%)*</label>
//             <input
//               type="number"
//               name="gross_margin"
//               value={formData.gross_margin}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Net margin (%)*</label>
//             <input
//               type="number"
//               name="net_margin"
//               value={formData.net_margin}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Path to profitability timeline (months)</label>
//             <input
//               type="number"
//               name="profitability_timeline"
//               value={formData.profitability_timeline}
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
//           Save Financial Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FinanceForm;















// import { useState } from 'react';

// const FinanceForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     revenue: '',
//     profit: '',
//     expenses: '',
//     assets: '',
//     liabilities: '',
//     equity: '',
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
//           <label className="block text-sm font-medium text-gray-700 mb-2">Revenue (USD)</label>
//           <input
//             type="number"
//             name="revenue"
//             value={formData.revenue}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Profit (USD)</label>
//           <input
//             type="number"
//             name="profit"
//             value={formData.profit}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Expenses (USD)</label>
//           <input
//             type="number"
//             name="expenses"
//             value={formData.expenses}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Assets (USD)</label>
//           <input
//             type="number"
//             name="assets"
//             value={formData.assets}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Liabilities (USD)</label>
//           <input
//             type="number"
//             name="liabilities"
//             value={formData.liabilities}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Equity (USD)</label>
//           <input
//             type="number"
//             name="equity"
//             value={formData.equity}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
      
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//         >
//           Save Financial Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FinanceForm;