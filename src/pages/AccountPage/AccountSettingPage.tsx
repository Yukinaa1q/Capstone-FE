import PwdInput from "@/components/Input/PwdInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import ContentLayout from "@/layouts/ContentLayout";
import SectionLayout from "@/layouts/SectionLayout";
import { shortName } from "@/utils/utils";
import { Edit, IdCard, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

const AccountSettingPage = () => {
  return (
    <ContentLayout>
      <div className="flex justify-between bg-t_primary-100 p-10 rounded-lg gap-8">
        <div className="flex gap-8">
          <Avatar className="size-16">
            <AvatarImage src="#" />
            <AvatarFallback>{shortName("Kieu Tien Thanh")}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="text-2xl font-semibold">Kieu Tien Thanh</p>
            <div className="grid grid-cols-[16px_auto] gap-x-2 gap-y-3 mt-4">
              <div>
                <IdCard size={20} />
              </div>
              <p>2153798</p>
              <Mail size={20} />
              <p>thanhkieu207@gmail.com</p>
              <Phone size={20} />
              <p>0387589187</p>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/user/profile"
            className="text-sm flex items-center gap-1 hover:underline"
          >
            <span>Edit Profile</span> <Edit size={16} />
          </Link>
        </div>
      </div>
      <SectionLayout sectionTitle="PASSWORD & AUTHENTICATION">
        <h4 className="font-medium">Change Password</h4>
        <div className="w-xs mt-1">
          <Label>Old Password</Label>
          <PwdInput value={""} onChange={() => {}} />
          <Label>New Password</Label>
          <PwdInput value={""} onChange={() => {}} />
        </div>
      </SectionLayout>
    </ContentLayout>
  );
};

export default AccountSettingPage;
