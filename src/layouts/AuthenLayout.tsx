import BrandLogo from "@/components/BrandLogo";
import authenImg from "@/assets/images/authen-image.png";

interface AuthenLayoutProps {
  children: React.ReactNode
}

const AuthenLayout = ({ children }: AuthenLayoutProps) => {
  return (
    <div className="flex">
      {/* Sign Up Form */}
      <div className="grow mx-8 mt-8 flex flex-col items-center">
        <BrandLogo size="lg" />
        {children}
      </div>
      {/* Representative Image*/}
      <img src={authenImg} alt="authentication image" className="h-screen" />
    </div>
  )
}

export default AuthenLayout