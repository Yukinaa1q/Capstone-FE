import RequiredInput from "@/components/RequiredInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IUserProfile } from "@/interfaces/UserProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { shortName } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { object, ObjectSchema, string } from "yup";

const ProfileCtx = React.createContext<{
  profile: IUserProfile;
  setProfile: React.Dispatch<React.SetStateAction<IUserProfile>>;
}>({
  profile: {
    userCode: "",
    userId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  },
  setProfile: () => {},
});
const AccountProfilePage = () => {
  const [profile, setProfile] = React.useState<IUserProfile>({
    userCode: "2153798",
    userId: "1",
    fullName: "Kieu Tien Thanhhhh",
    email: "thanhkieu207@gmail.com",
    phoneNumber: "0123456789",
    dob: "20/07/2003",
  });
  return (
    <ProfileCtx.Provider value={{ profile, setProfile }}>
      <ContentLayout>
        <section className="flex p-10 rounded-lg bg-gray-100 justify-between">
          <div className="flex gap-24">
            <div className="space-y-2">
              <p className="font-bold text-2xl mb-8">Student ID: 2153798</p>
              <NameAndDOBform />
              <EmailEditForm />
              <PhoneEditForm />
            </div>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="size-24 border">
                <AvatarImage src="#" />
                <AvatarFallback> {shortName(profile.fullName)} </AvatarFallback>
              </Avatar>
              <Button className="bg-t_primary-700 hover:bg-t_primary-700/80">Change</Button>
            </div>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold text-lg mb-4">LINK PARENT ACCOUNT</h4>
            <p>Have parent account? <Button variant="link">Link Now</Button></p>
            <p>Don't have parent account? <Button variant="link">Create Now</Button></p>
          </div>
        </section>
        <div></div>
      </ContentLayout>
    </ProfileCtx.Provider>
  );
};

export default AccountProfilePage;

const nameAndDOBSchema: ObjectSchema<Pick<IUserProfile, "fullName" | "dob">> =
  object({
    fullName: string().required("Name cannot be empty."),
    dob: string(),
  });

const NameAndDOBform = () => {
  const ctx = useContext(ProfileCtx);
  const form = useForm({
    resolver: yupResolver(nameAndDOBSchema),
    defaultValues: ctx.profile,
  });
  return (
    <Form {...form}>
      <form className="space-y-2">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Full Name">
              <Input {...field} />
            </RequiredInput>
          )}
        />

        <FormField
          name="dob"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Date of Birth" isRequired={false}>
              <Input {...field} />
            </RequiredInput>
          )}
        />
      </form>
    </Form>
  );
};

const EmailEditForm = () => {
  const ctx = useContext(ProfileCtx);
  const form = useForm({
    resolver: yupResolver(object({ email: string().required() })),
    defaultValues: ctx.profile,
  });
  return (
    <Form {...form}>
      <form className="flex items-end gap-2">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Email">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <Button
          type="submit"
          className="bg-t_primary-700 hover:bg-t_primary-700/80"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

const PhoneEditForm = () => {
  const ctx = useContext(ProfileCtx);
  const form = useForm({
    resolver: yupResolver(object({ phoneNumber: string().required() })),
    defaultValues: ctx.profile,
  });
  return (
    <Form {...form}>
      <form className="flex items-end gap-2">
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Phone Number">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <Button
          type="submit"
          className="bg-t_primary-700 hover:bg-t_primary-700/80"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
