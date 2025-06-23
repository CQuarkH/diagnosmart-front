import logo from '../../assets/logo.png';
import { useAuthContext } from '../../contexts/AuthContext';

export default function TopBar() {
    const { user, logout } = useAuthContext();
    return (
        <div className="flex w-full bg-primary">
            <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto px-28 py-6">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <span className="text-white text-2xl font-bold">DiagnoSmart</span>
                </div>
                <nav className="flex gap-16 items-center">
                    <span className='flex items-center gap-2'>
                        <img src="https://img.icons8.com/?size=100&id=6587&format=png&color=FFFFFF" alt="User Icon" className="w-6 h-6 inline-block mr-2" />
                        <p className="text-white text-md font-semibold">{user?.fullName || user?.username}</p>
                    </span>
                    <a onClick={logout} className="flex items-center text-md text-black hover:underline cursor-pointer bg-white px-3 py-2 rounded-lg">
                        <img src="https://img.icons8.com/?size=100&id=vGj0AluRnTSa&format=png&color=000000" alt="Logout Icon" className="w-6 h-6 inline-block mr-2" />
                        Cerrar Sesión
                    </a>
                </nav>
            </div>

        </div>
    )
}
