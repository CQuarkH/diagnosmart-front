import applogo from '../assets/logo.png';
import Button from '../components/atoms/Button';
import { useAuthContext } from '../contexts/AuthContext';

export default function AuthPage() {

    const { login, loading, error } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('email') as string;
        const password = formData.get('password') as string;
        await login(username, password);
    };

    return (
        <div className="flex justify-center items-center h-screen w-full bg-primary">
            <div className="px-20 pb-16 flex flex-col items-center gap-10 mb-20">
                <div className='relative flex flex-col justify-center'>
                    <img
                        src={applogo}
                        alt="Logo"
                        className="mx-auto w-60 h-60 z-10"
                    />
                    <span className='absolute top-21 left-30 h-13 w-16 bg-white'></span>
                    <h1 className="bottom-[-20px] text-5xl font-bold text-white">DiagnoSmart</h1>
                </div>
                <form className='flex flex-col gap-6 items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3 bg-white px-6 py-5 rounded-lg shadow-lg'>
                        <div className="mb-4 relative">
                            <input
                                className="border-b border-gray-400 outline-none py-3 px-10 w-full placeholder:text-gray-500 placeholder:font-semibold"

                                placeholder='Usuario (Email)'
                                type="email"
                                id="email"
                                name='email'
                                required
                            />
                            <img className='absolute top-2 left-0 right-4 w-8 h-8' src="https://img.icons8.com/?size=100&id=1L8taNeVxtp7&format=png&color=000000" alt="User Icon" />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                className="border-b border-gray-400 outline-none py-3 px-10 w-full placeholder:text-gray-500 placeholder:font-semibold"
                                placeholder='Contraseña'
                                type="password"
                                id="password"
                                name='password'
                                required
                            />
                            <img className='absolute top-2 left-0 right-4 w-7 h-7' src="https://img.icons8.com/?size=100&id=107272&format=png&color=000000" alt="Lock Icon" />
                        </div>
                    </div>
                    {error && !loading && <span className='flex justify-center items-center p-2 bg-white rounded-lg shadow-lg'>
                        <img className='w-5 h-5 mr-2' src="https://img.icons8.com/?size=100&id=360&format=png&color=FF0000" alt="Error Icon" />
                        <p className='text-red-500 text-sm font-semibold'>{error}</p></span>}
                    <Button
                        isLoading={loading}
                        type='submit' classname='w-full py-3.5 font-semibold text-lg bg-secondary hover:bg-secondary-dark transition-colors duration-200'>
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}
