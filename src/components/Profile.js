import {useEffect,useState} from 'react';
import { User, X, Mail, Phone, MapPin, Calendar, Building, Edit3, Check, XCircle, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

const apiUrl = process.env.REACT_APP_BACKEND_API;

const ProfilePopup = ({ user, isOpen, onClose }) => {
    const {token,logout} = useAuth();
    const [userProfile, setUserProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmName, setDeleteConfirmName] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                });
                
                const data = await response.json();

                if (response.ok) {
                    // console.log(data);
                    setUserProfile(data);
                    setEditedProfile(data); // Initialize edited profile with current data
                    return { success: true, message: 'Profile Fetched successfully' };
                } else {
                    return { success: false, message: data.message || 'Profile Fetching failed' };
                }
            } catch (error) {
                console.error('Profile fetch error:', error);
                return { success: false, message: 'Network error. Please try again.' };
            }
        };

        if (isOpen) {
            getUserDetails();
        }
    }, [isOpen, token]);

    if (!isOpen) return null;

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProfile({...userProfile}); // Reset to current profile data
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedProfile({...userProfile}); // Reset changes
    };

    const handleInputChange = (field, value) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProfileEdit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/users`, {
                method: 'PUT', // Changed to PUT for update
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify(editedProfile),
            });

            const data = await response.json();

            if (response.ok) {
                setUserProfile(editedProfile); // Update the displayed profile
                setIsEditing(false);
                // console.log('Profile updated successfully');
                return { success: true, message: 'Profile updated successfully' };
            } else {
                console.error('Profile update failed:', data.message);
                return { success: false, message: data.message || 'Profile update failed' };
            }
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        setDeleteConfirmName('');
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setDeleteConfirmName('');
    };

    const handleDeleteProfile = async () => {
        if (deleteConfirmName.trim() !== userProfile.name.trim()) {
            alert('Name does not match. Please enter your exact name to confirm deletion.');
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`${apiUrl}/api/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                // console.log('Profile deleted successfully');
                // Handle successful deletion (e.g., redirect to login page, clear auth state)
                onClose(); // Close the popup
                logout();
                return { success: true, message: 'Profile deleted successfully' };
            } else {
                console.error('Profile deletion failed:', data.message);
                alert(data.message || 'Profile deletion failed');
                return { success: false, message: data.message || 'Profile deletion failed' };
            }
        } catch (error) {
            console.error('Profile deletion error:', error);
            alert('Network error. Please try again.');
            return { success: false, message: 'Network error. Please try again.' };
        } finally {
            setIsDeleting(false);
        }
    };

    const ProfileField = ({ icon: Icon, label, value, field, type = "text" }) => (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-500">{label}</p>
                {isEditing ? (
                    <input
                        type={type}
                        value={editedProfile[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${label.toLowerCase()}`}
                    />
                ) : (
                    <p className="text-gray-900">{value || 'Not specified'}</p>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[70vw] mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {isEditing ? 'Edit Profile' : 'Profile Information'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    {/* Profile Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        {isEditing ? (
                            <div className="text-center">
                                <input
                                    type="text"
                                    value={editedProfile.name || ''}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="text-xl font-semibold text-gray-900 text-center border-b border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
                                    placeholder="Enter name"
                                />
                                <input
                                    type="text"
                                    value={editedProfile.position || ''}
                                    onChange={(e) => handleInputChange('position', e.target.value)}
                                    className="text-sm text-gray-500 text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter position"
                                />
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {userProfile.name}
                                </h3>
                                <p className="text-sm text-gray-500">{userProfile.position || 'Portfolio Manager'}</p>
                            </>
                        )}
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-4">
                        <ProfileField 
                            icon={Mail} 
                            label="Email" 
                            value={userProfile.email} 
                            field="email" 
                            type="email"
                        />
                        
                        <ProfileField 
                            icon={Phone} 
                            label="Phone" 
                            value={userProfile.phone || user?.phone} 
                            field="phone" 
                            type="tel"
                        />
                        
                        <ProfileField 
                            icon={MapPin} 
                            label="Location" 
                            value={userProfile.location || user?.location} 
                            field="location"
                        />
                        
                        <ProfileField 
                            icon={Building} 
                            label="Company" 
                            value={userProfile.company || user?.company} 
                            field="company"
                        />

                        {/* Member Since - Non-editable */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="text-gray-900">{userProfile.memberSince || user?.memberSince || 'January 2024'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics - Non-editable */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Stats</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">{user?.portfolioStats?.totalCompanies || '12'}</p>
                                <p className="text-sm text-gray-600">Companies</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{user?.portfolioStats?.activeDeals || '8'}</p>
                                <p className="text-sm text-gray-600">Active Deals</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-3">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={handleProfileEdit}
                                    disabled={isLoading}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Apply Changes
                                        </>
                                    )}
                                </button>
                                <button 
                                    onClick={handleCancelEdit}
                                    disabled={isLoading}
                                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={handleEditClick} 
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                                <button 
                                    onClick={handleDeleteClick}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
                    <div className="bg-white rounded-lg shadow-2xl w-96 mx-4">
                        {/* Delete Confirmation Header */}
                        <div className="bg-red-500 px-6 py-4 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <AlertTriangle className="w-6 h-6 text-white mr-2" />
                                    <h2 className="text-xl font-semibold text-white">Delete Profile</h2>
                                </div>
                                <button
                                    onClick={handleDeleteCancel}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Delete Confirmation Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="text-gray-800 mb-2">
                                    This action will permanently delete your profile and all associated data.
                                </p>
                                <p className="text-red-600 font-medium mb-4">
                                    This action cannot be undone.
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    To confirm deletion, please type your name exactly as it appears:
                                </p>
                                <p className="font-semibold text-gray-900 mb-3 p-2 bg-gray-100 rounded">
                                    {userProfile.name}
                                </p>
                                <input
                                    type="text"
                                    value={deleteConfirmName}
                                    onChange={(e) => setDeleteConfirmName(e.target.value)}
                                    placeholder="Enter your name to confirm"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    disabled={isDeleting}
                                />
                            </div>

                            {/* Delete Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleDeleteProfile}
                                    disabled={isDeleting || deleteConfirmName.trim() !== userProfile.name.trim()}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isDeleting ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Profile
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleDeleteCancel}
                                    disabled={isDeleting}
                                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePopup;











// import {useEffect,useState} from 'react';
// import { User, X, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
// import { useAuth } from '../auth/AuthProvider';

// const apiUrl = process.env.REACT_APP_BACKEND_API;

// const ProfilePopup = ({ user, isOpen, onClose }) => {
//     const {token}=useAuth();
//     const [userProfile, setUserProfile] = useState({});

//     useEffect(() => {
//     const getUserDetails = async () => {
//         try {
//         const response = await fetch(`${apiUrl}/api/users/me`, {
//             method: 'GET',
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization':`Bearer ${token}`,
//             },
//         });
        
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data);
//             setUserProfile(data);
//             return { success: true, message: 'Profile Fetched successfully' };
//         } else {
//             return { success: false, message: data.message || 'Profile Fetching failed' };
//         }
//         } catch (error) {
//         console.error('Profile fetch error:', error);
//         return { success: false, message: 'Network error. Please try again.' };
//         }
//     };

//     getUserDetails();
//     }, [])

//   if (!isOpen) return null;

//   const handleProfileEdit=async ()=>{
//     try {
//       const response = await fetch(`${apiUrl}/api/users`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization':`Bearer ${token}`,
//         },
//         body: JSON.stringify({}),
//       });

//       const data = await response.json();

//       if (response.ok && data.token) {

//         return { success: true, message: 'Login successful' };
//       } else {
//         return { success: false, message: data.message || 'Login failed' };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   }
  

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-[70vw] mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-white">Profile Information</h2>
//             <button
//               onClick={onClose}
//               className="text-white hover:text-gray-200 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="p-6">
//           {/* Profile Avatar */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
//               <User className="w-10 h-10 text-white" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900">
//               {userProfile.name}
//             </h3>
//             <p className="text-sm text-gray-500">{userProfile.position || 'Portfolio Manager'}</p>
//           </div>

//           {/* Profile Details */}
//           <div className="space-y-4">
//             {/* Email */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Mail className="w-5 h-5 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="text-gray-900">{userProfile.email || 'user@example.com'}</p>
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Phone className="w-5 h-5 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Phone</p>
//                 <p className="text-gray-900">{user?.phone || '+1 (555) 123-4567'}</p>
//               </div>
//             </div>

//             {/* Location */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                 <MapPin className="w-5 h-5 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="text-gray-900">{user?.location || 'San Francisco, CA'}</p>
//               </div>
//             </div>

//             {/* Company */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Building className="w-5 h-5 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Company</p>
//                 <p className="text-gray-900">{user?.company || 'Investment Partners LLC'}</p>
//               </div>
//             </div>

//             {/* Member Since */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Calendar className="w-5 h-5 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Member Since</p>
//                 <p className="text-gray-900">{user?.memberSince || 'January 2024'}</p>
//               </div>
//             </div>
//           </div>

//           {/* Statistics */}
//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Stats</h4>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-3 bg-blue-50 rounded-lg">
//                 <p className="text-2xl font-bold text-blue-600">{user?.portfolioStats?.totalCompanies || '12'}</p>
//                 <p className="text-sm text-gray-600">Companies</p>
//               </div>
//               <div className="text-center p-3 bg-green-50 rounded-lg">
//                 <p className="text-2xl font-bold text-green-600">{user?.portfolioStats?.activeDeals || '8'}</p>
//                 <p className="text-sm text-gray-600">Active Deals</p>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-6 flex space-x-3">
//             <button onClick={handleProfileEdit} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//               Edit Profile
//             </button>
//             <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
//               Settings
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePopup;