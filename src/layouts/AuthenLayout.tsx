import BrandLogo from "@/components/BrandLogo";
import authenImg from "@/assets/images/authen-image.png";

interface AuthenLayoutProps {
  children: React.ReactNode;
}

const AuthenLayout = ({ children }: AuthenLayoutProps) => {
  return (
    <div className="flex w-full">
      {/* Sign Up Form */}
      <div className="grow mx-8 mt-8 flex flex-col items-center">
        <BrandLogo size="lg" />
        {children}
      </div>
      {/* Representative Image*/}
      <div className="w-1/3 hidden lg:block">
        <img
          src={authenImg}
          alt="authentication image"
          className="h-screen hidden lg:block lg:w-1/3 fixed top-0 right-0"
        />
      </div>
    </div>
  );
};

export default AuthenLayout;
