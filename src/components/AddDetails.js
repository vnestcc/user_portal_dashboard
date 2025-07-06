import { useState } from 'react';
import FinanceForm from './form/FinanceForm';
import MarketForm from './form/MarketForm';
import UnitEconomicsForm from './form/UnitEconomicsForm';
import ProductDevelopmentForm from './form/ProductDevelopmentForm';
import TeamPerformanceForm from './form/TeamPerformanceForm';
import FundraisingStatusForm from './form/FundraisingStatusForm';
import CompetitiveLandscapeForm from './form/CompetitiveLandscapeForm';
import OperationalEfficiencyForm from './form/OperationalEfficiencyForm';
import RiskManagementForm from './form/RiskManagementForm';
import AdditionalInformationForm from './form/AdditionalInformationForm';
import SelfAssessmentForm from './form/SelfAssessmentForm';

import { useAuth } from '../auth/AuthProvider';

const optionValues = [
  "finance",
  "market",
  "uniteconomics",
  "product",
  "teamperf",
  "fund",
  "competitive",
  "operation",
  "risk",
  "additional",
  "self"
];

const getOptionIndex=(value)=>{
  return optionValues.indexOf(value);
}

const AddDetailsSection = ({companyId}) => {
  const [dataCategory, setDataCategory] = useState('finance');
  const [timePeriod, setTimePeriod] = useState({ quarter: 'Q1', year: new Date().getFullYear() });

  const { token } = useAuth();
  // console.log(companyId)

  const handleSubmit = async (formData) => {
    // const payload = {
    //   ...formData,
    // };

    // console.log(payload);


        try {
          const response2 = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/company/quarters/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              quarter:timePeriod.quarter,
              year:timePeriod.year
            }),
          });

          const data2 = await response2.json();

          console.log("set: ",data2)
          
          // if (data2.message!=="Quarter created successfully") {
          //   window.alert("Something went wrong !!!")
          //   return { success: false, message: 'Network error. Please try again.' };
          // } 
        } catch (error) {
          console.error('Error saving quarter:', error);
          // return { success: false, message: 'Network error. Please try again.' };
        }
    


    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/company/${companyId}?data=${dataCategory}&quarter=${timePeriod.quarter}&year=${timePeriod.year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data2 = await response.json();
      // console.log(data2)
      if(data2.error){
        console.log(data2)
      }
      else if (data2.data.length!==0) {
        window.alert("This section is already present for the selected quarter !!");
        return { success: true, message: 'Data saved successfully' };
      } 
    } catch (error) {
      console.error('Error saving data:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }

    console.log("Showing Data: ",formData)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/company/edit?data=${dataCategory}&quarter=${timePeriod.quarter}&year=${timePeriod.year}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.alert("Data saved successfully");
        setDataCategory(optionValues[(getOptionIndex(dataCategory)+1)%optionValues.length])
        return { success: true, message: 'Data saved successfully' };
      } else {
        // const data = await response.json();
        // console.log(data)
        // window.alert("This section is already present for this quarter")
        return { success: false, message: 'Failed to save data' };
      }
    } catch (error) {
      console.error('Error saving data:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Company Details</h2>
      
      {/* Selection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Category</label>
          <select
            value={dataCategory}
            onChange={(e) => setDataCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {/* <option value="info">1. Company Information</option> */}
            <option value="finance">Financial Health</option>
            <option value="market">Market Traction</option>
            <option value="uniteconomics">Unit Economics</option>
            <option value="product">Product Development</option>
            <option value="teamperf">Team Performance</option>
            <option value="fund">Fundraising Status</option>
            <option value="competitive">Competitive Landscape</option>
            <option value="operation">Operational Efficiency</option>
            <option value="risk">Risk Management</option>
            <option value="additional">Additional Information</option>
            <option value="self">Self-Assessment</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
            <select
              value={timePeriod.quarter}
              onChange={(e) => setTimePeriod({...timePeriod, quarter: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={timePeriod.year}
              onChange={(e) => setTimePeriod({...timePeriod, year: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Dynamic Form */}
      <div className="border-t border-gray-200 pt-6">
        {/* {dataCategory === 'info' && <InfoForm onSubmit={handleSubmit} />} */}
        {dataCategory === 'finance' && <FinanceForm onSubmit={handleSubmit} />}
        {dataCategory === 'market' && <MarketForm onSubmit={handleSubmit} />}
        {dataCategory === 'uniteconomics' && <UnitEconomicsForm onSubmit={handleSubmit} />}
        {dataCategory === 'product' && <ProductDevelopmentForm onSubmit={handleSubmit} />}
        {dataCategory === 'teamperf' && <TeamPerformanceForm onSubmit={handleSubmit} />}
        {dataCategory === 'fund' && <FundraisingStatusForm onSubmit={handleSubmit} />}
        {dataCategory === 'competitive' && <CompetitiveLandscapeForm onSubmit={handleSubmit} />}
        {dataCategory === 'operation' && <OperationalEfficiencyForm onSubmit={handleSubmit} />}
        {dataCategory === 'risk' && <RiskManagementForm onSubmit={handleSubmit} />}
        {dataCategory === 'additional' && <AdditionalInformationForm onSubmit={handleSubmit} />}
        {dataCategory === 'self' && <SelfAssessmentForm onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default AddDetailsSection;






// import { useState } from 'react';
// import InfoForm from './form/InfoForm';
// import FinanceForm from './form/FinanceForm';
// import MarketForm from './form/MarketForm';

// import { useAuth } from '../auth/AuthProvider';

// const AddDetailsSection = () => {
//   const [dataCategory, setDataCategory] = useState('info');
//   const [timePeriod, setTimePeriod] = useState({ quarter: 'Q1', year: new Date().getFullYear() });

//   const {token}=useAuth();

//   const handleSubmit = async (formData) => {
//     // Combine form data with time period
//     const payload = {
//       ...formData,
//     };

//     console.log(payload)

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/company/edit?quarter=${timePeriod.quarter}&year=${timePeriod.year}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         return { success: true, message: 'Data saved successfully' };
//       } else {
//         const data = await response.json();
//         return { success: false, message: data.message || 'Failed to save data' };
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Company Details</h2>
      
//       {/* Selection Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Data Category</label>
//           <select
//             value={dataCategory}
//             onChange={(e) => setDataCategory(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="info">info</option>
//             <option value="finance">Financial Data</option>
//             <option value="market">Market Data</option>
//           </select>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
//             <select
//               value={timePeriod.quarter}
//               onChange={(e) => setTimePeriod({...timePeriod, quarter: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Q1">Q1</option>
//               <option value="Q2">Q2</option>
//               <option value="Q3">Q3</option>
//               <option value="Q4">Q4</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//             <select
//               value={timePeriod.year}
//               onChange={(e) => setTimePeriod({...timePeriod, year: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
      
//       {/* Dynamic Form */}
//       <div className="border-t border-gray-200 pt-6">
//         {dataCategory === 'info' && <InfoForm onSubmit={handleSubmit} />}
//         {dataCategory === 'finance' && <FinanceForm onSubmit={handleSubmit} />}
//         {dataCategory === 'market' && <MarketForm onSubmit={handleSubmit} />}
//       </div>
//     </div>
//   );
// };

// export default AddDetailsSection;