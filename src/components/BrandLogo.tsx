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
  return (
    <div className="w-full">
      {/* <img src={Logo} alt="Tucour Brand Logo" className="inline"/> */}
      <span>TuCour</span>
    </div>
  );
};

export default BrandLogo;
