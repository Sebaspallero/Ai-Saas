const layout = ({children}: {children:React.ReactNode}) => {
  return (
    <main className="h-full overflow-auto">
        <div className="mx-auto h-full w-full " >
            {children}
        </div>
    </main>
  )
}

export default layout