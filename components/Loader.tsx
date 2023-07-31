import Image from "next/image"


const Loader = () => {
  return (
    <div className="h-full py-8 flex flex-col gap-y-4  items-center justify-center bg-muted">
      <div className="w-12 h-12 relative animate-bounce">
        <Image
            alt="Logo"
            fill
            src="/logo-retibo.svg"/>
      </div>
    <p className="text-sm  text-muted-foreground">
        retibo.ai is creating your answer!
    </p>
  </div>
  )
}

export default Loader