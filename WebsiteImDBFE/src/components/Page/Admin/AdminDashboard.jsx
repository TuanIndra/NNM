import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Admin/AdminSidebar";
import AdminHeader from "../../Admin/AdminHeader";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-6 bg-gray-100 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
