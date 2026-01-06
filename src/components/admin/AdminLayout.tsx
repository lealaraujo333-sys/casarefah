import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Settings, LogOut, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-stone-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col fixed h-full inset-y-0 z-50">
                <div className="p-6 border-b border-stone-800">
                    <h1 className="font-serif text-2xl text-stone-50 tracking-wide">CASA REFAH</h1>
                    <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin') ? 'bg-stone-800 text-white' : 'hover:bg-stone-800/50 hover:text-white'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products') ? 'bg-stone-800 text-white' : 'hover:bg-stone-800/50 hover:text-white'}`}
                    >
                        <Package className="w-5 h-5" />
                        Produtos
                    </Link>
                    <Link
                        to="/admin/settings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/settings') ? 'bg-stone-800 text-white' : 'hover:bg-stone-800/50 hover:text-white'}`}
                    >
                        <Settings className="w-5 h-5" />
                        Configurações
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-stone-800/50 hover:text-white mt-8"
                    >
                        <Home className="w-5 h-5" />
                        Voltar ao Site
                    </Link>
                </nav>

                <div className="p-4 border-t border-stone-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-950/20 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

