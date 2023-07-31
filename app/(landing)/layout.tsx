const layout = ({children}: {children:React.ReactNode}) => {
  return (
    <main className="h-full overflow-auto bg-gradient-to-r from-[#8595e3] via-[#4e1e8c] to-[#2c0635]">
        <div className="mx-auto h-full w-full " >
            {children}
        </div>
    </main>
  )
}

export default layout