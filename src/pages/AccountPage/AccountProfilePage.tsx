import DOBInput from "@/components/Input/DOBInput";
import RequiredInput from "@/components/Input/RequiredInput";
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
import { date, object, ObjectSchema, string } from "yup";
import { motion, AnimatePresence } from "motion/react";

const ProfileCtx = React.createContext<{
  profile: IUserProfile;
  setProfile: React.Dispatch<React.SetStateAction<IUserProfile>>;
  isSave: boolean;
  setIsSave: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  profile: {
    userCode: "",
    userId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  },
  isSave: true,
  setIsSave: () => {},
  setProfile: () => {},
});
const AccountProfilePage = () => {
  const [profile, setProfile] = React.useState<IUserProfile>({
    userCode: "2153798",
    userId: "1",
    fullName: "Kieu Tien Thanhhhh",
    email: "thanhkieu207@gmail.com",
    phoneNumber: "0123456789",
    dob: new Date(2003, 6, 20),
  });
  const [isSave, setIsSave] = React.useState<boolean>(true);
  return (
    <ProfileCtx.Provider value={{ profile, setProfile, isSave, setIsSave }}>
      <ContentLayout>
        <section className="flex flex-col lg:flex-row gap-10 p-10 rounded-lg bg-gray-100 justify-between">
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
              <Button className="bg-t_primary-700 hover:bg-t_primary-700/80">
                Change
              </Button>
            </div>
          </div>
          <div className="text-sm">
            <h4 className="font-semibold text-lg mb-4">LINK PARENT ACCOUNT</h4>
            <p>
              Have parent account? <Button variant="link">Link Now</Button>
            </p>
            <p>
              Don't have parent account?{" "}
              <Button variant="link">Create Now</Button>
            </p>
          </div>
        </section>
        <AnimatePresence>
          {!isSave && (
            <motion.div
              initial={{ bottom: "-48px" }}
              animate={{ bottom: "16px" }}
              exit={{ bottom: "-60px" }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex w-full md:w-3/4 lg:w-1/2 absolute bottom-4 left-1/2 -translate-x-1/2 py-2 px-4 bg-t_primary-700 text-white text-sm rounded-lg items-center justify-between"
            >
              <p>
                <span className="font-semibold">Careful!</span> You have unsaved
                changes
              </p>
              <div>
                <Button
                  variant="ghost"
                  className="hover:bg-t_primary-700/80 hover:text-white"
                  onClick={() => setIsSave(true)}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ContentLayout>
    </ProfileCtx.Provider>
  );
};

export default AccountProfilePage;

const nameAndDOBSchema: ObjectSchema<Pick<IUserProfile, "fullName" | "dob">> =
  object({
    fullName: string().required("Name cannot be empty."),
    dob: date(),
  });

const NameAndDOBform = () => {
  const ctx = useContext(ProfileCtx);
  const form = useForm({
    resolver: yupResolver(nameAndDOBSchema),
    defaultValues: ctx.profile,
  });
  const prevValues = ctx.profile;
  if (ctx.isSave) {
    form.setValue("fullName", prevValues.fullName as never);
    form.setValue("dob", prevValues.dob as never);
  }
  return (
    <Form {...form}>
      <form className="space-y-2" id="nameAndDOB">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Full Name">
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  ctx.setIsSave(false);
                }}
                className="bg-white"
              />
            </RequiredInput>
          )}
        />

        <FormField
          name="dob"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Date of Birth" isRequired={false}>
              <DOBInput
                key={Math.random()}
                init={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  ctx.setIsSave(false);
                }}
              />
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
              <Input {...field} className="bg-white" />
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
              <Input {...field} className="bg-white" />
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
