const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex items-center justify-center h-full dot-pattern">
            {children}
        </div>
    )
}

export default AuthLayout