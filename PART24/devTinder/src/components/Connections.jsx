import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConnectedUser = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(BASE_URL + "/user/getConnectedUsers", { withCredentials: true });
                dispatch(addConnection(res.data.data));
            } catch (err) {
                console.error("Failed to fetch connections:", err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConnectedUser();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!connections || connections.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">No Connections Found</h2>
                <p className="text-gray-500 mt-2">Start connecting with others to see them here.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Your Connections ({connections.length})</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {connections.map((connection) => (
                    <div key={connection._id} className="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
                        <figure className="h-48">
                            <img
                                src={connection.photoUrl}
                                alt={`${connection.firstName} ${connection.lastName}`}
                                className="w-full h-full object-contain"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {connection.firstName} {connection.lastName}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {connection.age} &bull; {connection.gender}
                            </p>
                            <p className="mt-2 text-sm min-h-[40px]">{connection.about}</p>
                            <div className="card-actions justify-start mt-4 flex-wrap gap-2">
                                {(connection.skills || []).map((skill, index) => (
                                    <div key={index} className="badge badge-outline">{skill}</div>
                                ))}
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-primary btn-sm">Message</button>
                                <button className="btn btn-ghost btn-sm">View Profile</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;