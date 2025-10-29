import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request); // Assuming your slice stores it in a 'requests' property
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + "/user/getRequest/received", { withCredentials: true });
            dispatch(addRequest(res.data.data));
            console.log(res.data.data)
        } catch (err) {
            console.error("Failed to fetch requests:", err.message);
            setError("Could not load requests. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Handler for accepting a request
    const handleAccept = async (requestId) => {
        console.log("Accepting request:", requestId);
        // ** API call -> logic to accept the request **
        
        try {
          const res = await axios.post(BASE_URL + "/request/review/accepted/" + requestId, {}, { withCredentials: true });
          fetchRequests(); // Re-fetch to update the list
        } catch (err) {
          console.error("Failed to accept request", err);
        }
    };

    // Handler for declining a request
    const handleDecline = async (requestId) => {
        console.log("Declining request:", requestId);
        // ** API call -> logic to decline the request **
        
        try {
          const res = await axios.post(BASE_URL + "/request/review/rejected" + requestId, {}, { withCredentials: true });
          fetchRequests(); // Re-fetch to update the list
        } catch (err) {
          console.error("Failed to decline request", err);
        }
    };


    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            );
        }

        if (error) {
            return (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            );
        }

        if (!requests || requests.length === 0) {
            return (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">No Pending Requests</h2>
                    <p className="text-gray-500 mt-2">You're all caught up!</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {requests.map((request) => {
                    const sender = request.fromUserId;
                    const initials = `${sender.firstName || ''}${sender.lastName || ''}`;
                    

                    return (
                        <div key={request._id} className="card bg-base-100 shadow-md">
                            <div className="card-body flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                            <span>{initials}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold">{sender.firstName} {sender.lastName}</p>
                                        <p className="text-sm text-gray-500">Sent on {new Date(request.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="card-actions justify-end gap-2">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleAccept(request._id)}>
                                        Accept
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDecline(request._id)}>
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>
            {renderContent()}
        </div>
    );
};

export default Requests;