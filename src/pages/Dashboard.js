import {useEffect, useState} from 'react';
import { User, LogOut, Building2, Plus, Save, X, BarChart3, TrendingUp, Users, StepBack} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import PopUpQR from '../components/PopUpQR';
import ProfilePopup from '../components/Profile';
import AddDetailsSection from '../components/AddDetails';
import CompanyDetails from './CompanyDetails';

const apiUrl = process.env.REACT_APP_BACKEND_API;

const DashboardPage = () => {
  const { user, logout, showQr, token } = useAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId]=useState();
  const [view,setView]=useState("")
  const [formData, setFormData] = useState({
    company_name: '',
    sector: '',
    contact_email: '',
    contact_name:'',
    description:''
  });

  useEffect(() => {
    const getUserCompanyDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/company/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        setCompanyId(data.id);
        if(data.error==='User does not belong to any company'){
          setView('create')
        }

        const response2 = await fetch(`${apiUrl}/api/company/quarters/${data.id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });

        const data2 = await response2.json();
console.log(data2);
        if (response.ok && response2.ok) {
          
          if(data2.length===0){
            setView("add_details")
          }else{
            setView("details")
          }
          return { success: true, message: 'Data fetched successfully' };
        } else {
          return { success: false, message: data.message || 'Data fetch failed' };
        }
      } catch (error) {
        console.error('Data fetched error:', error);
        return { success: false, message: 'Network error. Please try again.' };
      }
    };

    getUserCompanyDetails();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.company_name || !formData.contact_name || !formData.contact_email || !formData.sector) {
      alert('Please fill in all required fields (Name, Description, Sector)');
      return;
    }
    
    // Add the new company to the list
    const newCompany = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    setCompanies(prev => [...prev, newCompany]);

    const data1={
      name:formData.company_name,
      contact_name:formData.contact_name,
      contact_email:formData.contact_email,
      sector:formData.sector,
      description:formData.description
    }

    try {
        const response = await fetch(`${apiUrl}/api/company/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data1),
        });

        const data = await response.json();

        if (response.ok) {
          setCompanyId(data.company_id);
          setView("add_details")
              // Reset form
              setFormData({
              company_name: '',
              sector: '',
              contact_email: '',
              contact_name:'',
              description:''
              });
              setShowCreateForm(false);
          return { success: true, message: 'Company created successfully' };
        } else {
          return { success: false, message: data.message || 'Comapny creation failed' };
        }
      } catch (error) {
        console.error('Company creation error:', error);
        return { success: false, message: 'Network error. Please try again.' };
      }
    
    

  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
    company_name: '',
    sector: '',
    contact_email: '',
    contact_name:'',
    description:''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
            </div>
            <div className="flex items-center">
              {view==='add_details'?
              <>
              <button
                onClick={() => setView("details")}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <StepBack className="w-5 h-5 mr-2" />
                <span>View Details</span>
              </button>
              </>
              :
              <>
              <button
                onClick={() => setView("add_details")}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span>Add Quarter Details</span>
              </button>
              </>}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProfilePopup(true)}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <User className="w-5 h-5 mr-2" />
                <span>Welcome</span>
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          
          {/* Create Company Section */}
          {view==="create" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Company Management</h2>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Company
                </button>
              )}
            </div>

            {showCreateForm ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sector *
                    </label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Sector</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contact_name"
                      value={formData.contact_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="contact@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter a detailed description..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Company
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies created yet</h3>
                <p className="text-gray-500">Click "Create Company" to add your first company to the portfolio.</p>
              </div>
            )}
          </div>
          )}
          

          {/* Companies Display Section */}

          {view==="details" && (
            <CompanyDetails id={companyId}/>
          )}



          {view==="add_details" && (
            <AddDetailsSection companyId={companyId}/>
          )}
          
        </div>
      </main>

      {/* QR Code Modal */}
      {showQr && (
        <PopUpQR/>
      )}

      {/* Profile Popup */}
      <ProfilePopup
        user={user}
        isOpen={showProfilePopup}
        onClose={() => setShowProfilePopup(false)}
      />
    </div>
  );
};

export default DashboardPage;












// import {useEffect} from 'react';
// import { User, LogOut, Building2, Check, X, Trash2, ExternalLink } from 'lucide-react';
// import { useState } from 'react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';
// import ProfilePopup from '../components/Profile';

// const apiUrl = process.env.REACT_APP_BACKEND_API;

// // Mock data - replace with actual data from your backend
// const mockVCs = [
//   { id: 1, name: "Sequoia Capital", status: "approved" },
//   { id: 2, name: "Andreessen Horowitz", status: "pending" },
//   { id: 3, name: "Kleiner Perkins", status: "approved" },
//   { id: 4, name: "Accel Partners", status: "unapproved" },
// ];

// const mockCompanies = [
//   {
//     id: 1,
//     name: "ZVIA Tech Pvt. Ltd.",
//     description: "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   {
//     id: 2,
//     name: "Mafkin Robotics",
//     description: "Autonomous ship hull cleaning and inspection robots",
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   {
//     id: 3,
//     name: "Cittaa Health Service",
//     description: "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   {
//     id: 4,
//     name: "TechFlow Solutions",
//     description: "Advanced workflow automation and AI-driven business process optimization platform.",
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI Diagnostics", "Healthcare"]
//   }
// ];

// const DashboardPage = () => {
//   // Use actual auth context
//   const { user, logout, showQr, token } = useAuth();
//   const [vcs, setVcs] = useState(mockVCs);
//   const [activeTab, setActiveTab] = useState('All Sectors');
//   const [currentSection, setCurrentSection] = useState('companies'); // 'companies' or 'vcs'
//   const [showProfilePopup, setShowProfilePopup] = useState(false);

//   useEffect(() => {
//     const getUserCompanyDetails = async () => {
//         try {
//         const response = await fetch(`${apiUrl}/api/company/me`, {
//             method: 'GET',
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization':`Bearer ${token}`,
//             },
//         });
        
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data);
            
//             return { success: true, message: 'Account created successfully' };
//         } else {
//             return { success: false, message: data.message || 'Signup failed' };
//         }
//         } catch (error) {
//         console.error('Signup error:', error);
//         return { success: false, message: 'Network error. Please try again.' };
//         }
//     };

//     getUserCompanyDetails();
  

//   }, [])
  

//   const sectors = ['All Sectors', 'EdTech', 'Digital Learning', 'Education Analytics', 'HealthTech', 'Medical Imaging', 'AI Diagnostics', 'Healthcare', 'Telemedicine', 'Patient Care'];

//   const handleVCAction = (vcId, action) => {
//     setVcs(prevVcs => {
//       if (action === 'delete') {
//         return prevVcs.filter(vc => vc.id !== vcId);
//       }
//       return prevVcs.map(vc => 
//         vc.id === vcId 
//           ? { ...vc, status: action === 'approve' ? 'approved' : 'unapproved' }
//           : vc
//       );
//     });
//   };

//   const handleCompanyClick = (company) => {
//     // Open company details in new tab
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>${company.name} - Details</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
//             .header { background: linear-gradient(135deg, ${company.color.replace('from-', '').replace('to-', '').replace('-500', '').replace('-600', '')}); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
//             .tag { display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${company.name}</h1>
//           </div>
//           <p><strong>Description:</strong> ${company.description}</p>
//           <div>
//             <strong>Tags:</strong>
//             ${company.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
//           </div>
//         </body>
//       </html>
//     `);
//   };

//   const filteredCompanies = activeTab === 'All Sectors' 
//     ? mockCompanies 
//     : mockCompanies.filter(company => company.tags.includes(activeTab));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowProfilePopup(true)}
//                 className="flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
//               >
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </button>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
          
//           {/* Main Navigation Tabs */}
//           <div className="mb-8">
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setCurrentSection('companies')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                     currentSection === 'companies'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Portfolio Companies
//                 </button>
//                 <button
//                   onClick={() => setCurrentSection('vcs')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                     currentSection === 'vcs'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   VC Management
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Tab Content */}
//           {currentSection === 'vcs' && (
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">VC Management</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         VC Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {vcs.map((vc) => (
//                       <tr key={vc.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {vc.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
//                             vc.status === 'approved' 
//                               ? 'bg-green-100 text-green-800' 
//                               : vc.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {vc.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'approve')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
//                           >
//                             <Check className="w-3 h-3 mr-1" />
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'unapprove')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
//                           >
//                             <X className="w-3 h-3 mr-1" />
//                             Unapprove
//                           </button>
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'delete')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//                           >
//                             <Trash2 className="w-3 h-3 mr-1" />
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {currentSection === 'companies' && (
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
//               {/* Sector Filter Tabs */}
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {sectors.map((sector) => (
//                   <button
//                     key={sector}
//                     onClick={() => setActiveTab(sector)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                       activeTab === sector
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {sector}
//                   </button>
//                 ))}
//               </div>

//               {/* Companies Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCompanies.map((company) => (
//                   <div
//                     key={company.id}
//                     onClick={() => handleCompanyClick(company)}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                   >
//                     <div className={`h-32 bg-gradient-to-br ${company.color} rounded-t-lg flex items-center justify-center`}>
//                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                         <span className="text-2xl font-bold text-gray-700">{company.letter}</span>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
//                         <ExternalLink className="w-4 h-4 text-gray-400" />
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description}</p>
//                       <div className="flex flex-wrap gap-1">
//                         {company.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}

//       {/* Profile Popup */}
//       <ProfilePopup
//         user={user}
//         isOpen={showProfilePopup}
//         onClose={() => setShowProfilePopup(false)}
//       />
//     </div>
//   );
// };

// export default DashboardPage;
















// import { User, LogOut, Building2, Check, X, Trash2, ExternalLink } from 'lucide-react';
// import { useState } from 'react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';

// // Mock data - replace with actual data from your backend
// const mockVCs = [
//   { id: 1, name: "Sequoia Capital", status: "approved" },
//   { id: 2, name: "Andreessen Horowitz", status: "pending" },
//   { id: 3, name: "Kleiner Perkins", status: "approved" },
//   { id: 4, name: "Accel Partners", status: "unapproved" },
// ];

// const mockCompanies = [
//   {
//     id: 1,
//     name: "ZVIA Tech Pvt. Ltd.",
//     description: "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   {
//     id: 2,
//     name: "Mafkin Robotics",
//     description: "Autonomous ship hull cleaning and inspection robots",
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   {
//     id: 3,
//     name: "Cittaa Health Service",
//     description: "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   {
//     id: 4,
//     name: "TechFlow Solutions",
//     description: "Advanced workflow automation and AI-driven business process optimization platform.",
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI Diagnostics", "Healthcare"]
//   }
// ];

// const DashboardPage = () => {
//   // Use actual auth context
//   const { user, logout, showQr } = useAuth();
//   const [vcs, setVcs] = useState(mockVCs);
//   const [activeTab, setActiveTab] = useState('All Sectors');
//   const [currentSection, setCurrentSection] = useState('companies'); // 'companies' or 'vcs'

//   const sectors = ['All Sectors', 'EdTech', 'Digital Learning', 'Education Analytics', 'HealthTech', 'Medical Imaging', 'AI Diagnostics', 'Healthcare', 'Telemedicine', 'Patient Care'];

//   const handleVCAction = (vcId, action) => {
//     setVcs(prevVcs => {
//       if (action === 'delete') {
//         return prevVcs.filter(vc => vc.id !== vcId);
//       }
//       return prevVcs.map(vc => 
//         vc.id === vcId 
//           ? { ...vc, status: action === 'approve' ? 'approved' : 'unapproved' }
//           : vc
//       );
//     });
//   };

//   const handleCompanyClick = (company) => {
//     // Open company details in new tab
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>${company.name} - Details</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
//             .header { background: linear-gradient(135deg, ${company.color.replace('from-', '').replace('to-', '').replace('-500', '').replace('-600', '')}); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
//             .tag { display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${company.name}</h1>
//           </div>
//           <p><strong>Description:</strong> ${company.description}</p>
//           <div>
//             <strong>Tags:</strong>
//             ${company.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
//           </div>
//         </body>
//       </html>
//     `);
//   };

//   const filteredCompanies = activeTab === 'All Sectors' 
//     ? mockCompanies 
//     : mockCompanies.filter(company => company.tags.includes(activeTab));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
          
//           {/* Main Navigation Tabs */}
//           <div className="mb-8">
//             <div className="border-b border-gray-200">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setCurrentSection('companies')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                     currentSection === 'companies'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Portfolio Companies
//                 </button>
//                 <button
//                   onClick={() => setCurrentSection('vcs')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                     currentSection === 'vcs'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   VC Management
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Tab Content */}
//           {currentSection === 'vcs' && (
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">VC Management</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         VC Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {vcs.map((vc) => (
//                       <tr key={vc.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {vc.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
//                             vc.status === 'approved' 
//                               ? 'bg-green-100 text-green-800' 
//                               : vc.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {vc.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'approve')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
//                           >
//                             <Check className="w-3 h-3 mr-1" />
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'unapprove')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
//                           >
//                             <X className="w-3 h-3 mr-1" />
//                             Unapprove
//                           </button>
//                           <button
//                             onClick={() => handleVCAction(vc.id, 'delete')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//                           >
//                             <Trash2 className="w-3 h-3 mr-1" />
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {currentSection === 'companies' && (
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
//               {/* Sector Filter Tabs */}
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {sectors.map((sector) => (
//                   <button
//                     key={sector}
//                     onClick={() => setActiveTab(sector)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                       activeTab === sector
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {sector}
//                   </button>
//                 ))}
//               </div>

//               {/* Companies Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCompanies.map((company) => (
//                   <div
//                     key={company.id}
//                     onClick={() => handleCompanyClick(company)}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                   >
//                     <div className={`h-32 bg-gradient-to-br ${company.color} rounded-t-lg flex items-center justify-center`}>
//                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                         <span className="text-2xl font-bold text-gray-700">{company.letter}</span>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
//                         <ExternalLink className="w-4 h-4 text-gray-400" />
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description}</p>
//                       <div className="flex flex-wrap gap-1">
//                         {company.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


















// import { User, LogOut, Shield, Building2 } from 'lucide-react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';

// const DashboardPage = () => {
//   const { user, logout, showQr } = useAuth();
  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
//             <div className="text-center">
//               <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Protected Dashboard</h2>
//               <p className="text-gray-600 mb-4">
//                 You are successfully authenticated and can access this protected content!
//               </p>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
//                 <h3 className="font-medium text-blue-900 mb-2">Your Information:</h3>
//                 <p className="text-sm text-blue-800">
//                   <strong>Email:</strong> {user?.email}<br />
//                   <strong>Name:</strong> {user?.firstName} {user?.lastName}<br />
//                   {user?.company && (
//                     <>
//                       <strong>Company:</strong> {user.company}
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


















// // src/pages/DashboardPage.js
// import { User, LogOut, Shield, Building2 } from 'lucide-react';
// import { useAuth } from '../auth/AuthProvider';

// const DashboardPage = () => {
//   const { user, logout, showQr } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
//             <div className="text-center">
//               <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Protected Dashboard</h2>
//               <p className="text-gray-600 mb-4">
//                 You are successfully authenticated and can access this protected content!
//               </p>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
//                 <h3 className="font-medium text-blue-900 mb-2">Your Information:</h3>
//                 <p className="text-sm text-blue-800">
//                   <strong>Email:</strong> {user?.email}<br />
//                   <strong>Name:</strong> {user?.firstName} {user?.lastName}<br />
//                   {user?.company && (
//                     <>
//                       <strong>Company:</strong> {user.company}
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//             {showQr?<>Show QR</>:<>Dont't Show QR</>}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;