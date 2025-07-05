import { useState } from 'react';

const ProductDevelopmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    milestones_achieved: '',
    milestones_missed: '',
    roadmap: '',
    active_users: '',
    engagement_metrics: '',
    nps: '',
    feature_adoption: '',
    technical_challenges: [''],
    technical_debt: '',
    product_bottlenecks: ['']
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

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      technical_challenges: formData.technical_challenges.filter(item => item.trim() !== ''),
      product_bottlenecks: formData.product_bottlenecks.filter(item => item.trim() !== '')
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">a) Roadmap Progress</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key milestones achieved this quarter (e.g., 10)
            </label>
            <textarea
              name="milestones_achieved"
              value={formData.milestones_achieved}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter how many milestone you achieved this quarter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Milestones missed or delayed (e.g., 10)
            </label>
            <textarea
              name="milestones_missed"
              value={formData.milestones_missed}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter how many milestone you missed this quarter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Updated product roadmap for next two quarters (e.g., "Q3: Payment integration, Q4: AI features")
            </label>
            <textarea
              name="roadmap"
              value={formData.roadmap}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="This will populate the Product Roadmap section in the dashboard."
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">b) Product Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active users (DAU/MAU) - shown as large number in dashboard
            </label>
            <input
              type="number"
              name="active_users"
              value={formData.active_users}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 15000 (shown in the Active Users card)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User engagement metrics (average minutes per user) - shown in line chart
            </label>
            <input
              type="number"
              name="engagement_metrics"
              value={formData.engagement_metrics}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 8.5 (minutes per user)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Promoter Score (NPS) - shown in circular progress chart
            </label>
            <input
              type="number"
              name="nps"
              value={formData.nps}
              onChange={handleChange}
              min="-100"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Range: -100 to 100 (shown in NPS card)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feature adoption rates (%) - shown as percentage in circular chart
            </label>
            <input
              type="number"
              name="feature_adoption"
              value={formData.feature_adoption}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0-100% (shown in Feature Adoption card)"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">c) Product Challenges</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top technical challenges - will appear as tags in Technical Health section
            </label>
            {formData.technical_challenges.map((challenge, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => handleArrayChange('technical_challenges', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`e.g., "Database performance issues" (will be shown as colored tags)`}
                />
                {formData.technical_challenges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('technical_challenges', index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('technical_challenges')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add another technical challenge
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current technical debt assessment (%) - shown as progress bar
            </label>
            <input
              type="number"
              name="technical_debt"
              value={formData.technical_debt}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0-100% (shown in Technical Debt progress bar)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product bottlenecks affecting growth - will appear in list in Technical Health section
            </label>
            {formData.product_bottlenecks.map((bottleneck, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={bottleneck}
                  onChange={(e) => handleArrayChange('product_bottlenecks', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`e.g., "Checkout process too long" (will appear in bottlenecks list)`}
                />
                {formData.product_bottlenecks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('product_bottlenecks', index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('product_bottlenecks')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add another bottleneck
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Product Development Data
        </button>
      </div>
    </form>
  );
};

export default ProductDevelopmentForm;








// import { useState } from 'react';

// const ProductDevelopmentForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     milestones_achieved: '',
//     milestones_missed: '',
//     raodmap:'changeit',
//     active_users: '',
//     engagement_metrics: '',
//     nps: '',
//     feature_adoption: '',
//     technical_challenges: '',
//     technical_debt: '',
//     product_bottlenecks: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTechnicalChallengeChange = (index, value) => {
//     const updatedChallenges = [...formData.technical_challenges];
//     updatedChallenges[index] = value;
//     setFormData(prev => ({ ...prev, technical_challenges: updatedChallenges }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">a) Roadmap Progress</h3>
//         <div className="grid grid-cols-1 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Key milestones achieved this quarter</label>
//             <textarea
//               name="milestones_achieved"
//               value={formData.milestones_achieved}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Milestones missed or delayed</label>
//             <textarea
//               name="milestones_missed"
//               value={formData.milestones_missed}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Updated product roadmap for next two quarters (attach document)</label>
//             <input
//               type="file"
//               name="productRoadmap"
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">b) Product Metrics</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Active users (DAU/MAU)</label>
//             <input
//               type="text"
//               name="active_users"
//               value={formData.active_users}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">User engagement metrics (time spent, features used)</label>
//             <input
//               type="text"
//               name="engagement_metrics"
//               value={formData.engagement_metrics}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Net Promoter Score (NPS)</label>
//             <input
//               type="number"
//               name="nps"
//               value={formData.nps}
//               onChange={handleChange}
//               min="-100"
//               max="100"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Feature adoption rates for new releases (%)</label>
//             <input
//               type="number"
//               name="feature_adoption"
//               value={formData.feature_adoption}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">c) Product Challenges</h3>
//         <div className="grid grid-cols-1 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Top technical challenges</label>
//               <div className="mb-2">
//                 <input
//                   type="text"
//                   name="technical_challenges"
//                   value={formData.technical_challenges}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder={`Challenge`}
//                 />
//               </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Current technical debt assessment</label>
//             <textarea
//               name="technical_debt"
//               value={formData.technical_debt}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Product bottlenecks affecting growth</label>
//             <textarea
//               name="product_bottlenecks"
//               value={formData.product_bottlenecks}
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
//           Save Product Development Data
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProductDevelopmentForm;