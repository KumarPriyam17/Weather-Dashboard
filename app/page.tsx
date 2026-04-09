import AuthForm from './components/AuthForm';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Weather.io</h1>
                    <p className="text-white/60 text-lg">Premium Weather Intelligence</p>
                </div>
                <AuthForm />
            </div>
        </main>
    );
}
