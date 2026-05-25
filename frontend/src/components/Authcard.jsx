function AuthCard({ title, children }) {

    return (

        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">

            {/* Background */}

            <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/50" />

            {/* Card */}

            <div className="relative z-10 w-full max-w-lg">

                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-12 py-10 shadow-2xl">

                    <h1 className="text-3xl font-bold text-white text-center mb-10">
                        {title}
                    </h1>

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AuthCard;