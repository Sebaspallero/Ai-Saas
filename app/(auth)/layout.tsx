const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-[#8595e3] via-[#4e1e8c] to-[#2c0635]">
            {children}
        </div>
    )
}

export default AuthLayout