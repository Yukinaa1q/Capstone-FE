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
  const imgSizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className="w-full flex items-center gap-2">
      <img
        src={Logo}
        alt="Tucour Brand Logo"
        className={`inline ${imgSizeClasses[size]}`}
      />
      <span className={`font-logo font-bold ${textSizeClasses[size]}`}>TuCour</span>
    </div>
  );
};

export default BrandLogo;
