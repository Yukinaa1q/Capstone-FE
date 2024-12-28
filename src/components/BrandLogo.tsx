import Logo from "@/assets/icons/logo.svg";

interface BrandLogoProps {
  size: "sm" | "md" | "lg";
}

/*
Nhập môn FE :))
- Thiết kế BrandLogo component dựa trên thiết kế của Figma
- Điều chỉnh kích thước của logo dựa vào props size (dùng font-logo classname đã được định nghĩa trong tailwind.config.css)
*/

const BrandLogo = ({ size = "md" }: BrandLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-lg",
  };
  return (
    <div className="w-full">
      <img
        src={Logo}
        alt="Tucour Brand Logo"
        className={`inline ${sizeClasses[size]}`}
      />
      <span className={`font-logo ${sizeClasses[size]}`}>TuCour</span>
    </div>
  );
};

export default BrandLogo;
