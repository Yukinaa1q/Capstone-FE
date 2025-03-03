import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ICourseCardP1 } from "@/interfaces/ICourse";
import {
  ArrowLeft,
  ArrowRight,
  TriangleAlert,
  UserRoundPen,
} from "lucide-react";
import { useId, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, boolean, InferType, object, string } from "yup";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";
import { StudyShift } from "@/interfaces/common";
import ITutorRegistration from "@/interfaces/ITutorRegistration";
import TucourApi from "@/utils/http";
import { useAppSelector } from "@/hooks/reduxHook";

const registrationSchema = object({
  isOddDays: boolean().default(false),
  oddTimeShift: array(string<StudyShift>())
    .when("isOddDays", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "Choose at leat one timeshift")
          .required("Time Shift is required"),
    })
    .default([]),
  isEvenDays: boolean().default(false),
  evenTimeShift: array(string<StudyShift>())
    .when("isEvenDays", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "Choose at least one timeshift")
          .required("Time Shift is required"),
    })
    .default([]),
}).required();

const TutorRegistrationButton = ({
  courseContent,
}: {
  courseContent: ICourseCardP1;
}) => {
  const [activity, setActivity] = useState<"registration" | "confirmation">(
    "registration"
  );
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const user = useAppSelector((state) => state.auths);

  const form = useForm({
    values: {
      isEvenDays: false,
      isOddDays: false,
      evenTimeShift: [],
      oddTimeShift: [],
    },
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: InferType<typeof registrationSchema>) => {
    if (!data.isOddDays && !data.isEvenDays) {
      setErrMsg("You must choose at least one teaching schedule");
      return;
    } else {
      setErrMsg(null);
      setActivity("confirmation");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
        >
          <UserRoundPen size={20} />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
            Register
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Teaching Registration Form</DialogTitle>
          <DialogDescription>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem
                  className={activity === "registration" ? "text-black" : ""}
                >
                  Registration
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem
                  className={activity === "confirmation" ? "text-black" : ""}
                >
                  Confirmation
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <h1 className="font-semibold text-2xl uppercase">
              {courseContent.courseTitle}
            </h1>
            <p className="text-sm font-semibold text-gray-600">
              {courseContent.courseCode}
            </p>
          </div>
          <Alert
            className={cn("my-2", !errMsg ? "invisible" : "visible")}
            variant="destructive"
          >
            <TriangleAlert size={20} />
            <AlertTitle>Invalid Submission</AlertTitle>
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
          <div>
            <h3 className="font-semibold text-sm">Teaching Schedule</h3>
            {activity === "registration" ? (
              <Registration form={form} onSubmit={onSubmit} />
            ) : (
              <Confirmation form={form} />
            )}
          </div>
        </div>
        <DialogFooter>
          {activity === "registration" && (
            <>
              <Button
                type="submit"
                form="tutorRegistration"
                variant="outline"
                className="border-t_primary-500 hover:bg-t_primary-100"
              >
                <ArrowRight />
                Continue
              </Button>
              <Button variant="destructive" type="button">
                Cancel
              </Button>
            </>
          )}
          {activity === "confirmation" && (
            <>
              <Button
                type="button"
                variant={"outline"}
                className="border-t_tertiary-500 hover:bg-t_tertiary-100"
                onClick={() => {
                  console.log("Back button");
                  setActivity("registration");
                }}
              >
                <ArrowLeft />
                Back
              </Button>
              <Button
                className="bg-green-400 hover:bg-green-500 text-black"
                onClick={async () => {
                  const submitData: ITutorRegistration = {
                    courseId: courseContent.courseId,
                    tutorId: user.userId,
                    evenTimeShift: form
                      .getValues("evenTimeShift")
                      .filter((v) => v !== undefined),
                    oddTimeShift: form
                      .getValues("oddTimeShift")
                      .filter((v) => v !== undefined),
                  };

                  // console.log(submitData);
                  try {
                    const res = await TucourApi.call("/phase1_register/tutor", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify(submitData),
                    });
                    console.log(res);
                    window.location.reload();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Submit
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Registration = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<InferType<typeof registrationSchema>>;
  onSubmit: (data: InferType<typeof registrationSchema>) => void;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="tutorRegistration">
        <div></div>
        <div className="grid grid-cols-[36px_1fr_1fr] gap-4">
          <div></div>
          <p className="text-center">Teaching Weekdays</p>
          <p className="text-center">Time Shift</p>
          <FormField
            control={form.control}
            name="isEvenDays"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    className="mx-auto mb-auto mt-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center mb-auto h-9 leading-9">2/4/6</p>
          <FormField
            control={form.control}
            name="evenTimeShift"
            render={({ field }) => (
              <FormItem className="h-16">
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!form.getValues("isEvenDays")}
                      >
                        Choose Time
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-50">
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes("17h45 - 19h15")}
                        onCheckedChange={(val) => {
                          if (val) {
                            field.onChange([...field.value, "17h45 - 19h15"]);
                          } else {
                            field.onChange(
                              field.value?.filter((v) => v !== "17h45 - 19h15")
                            );
                          }
                        }}
                      >
                        17h45 - 19h15
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes("19h30 - 21h00")}
                        onCheckedChange={(val) => {
                          if (val) {
                            field.onChange([...field.value, "19h30 - 21h00"]);
                          } else {
                            field.onChange(
                              field.value?.filter((v) => v !== "19h30 - 21h00")
                            );
                          }
                        }}
                      >
                        19h30 - 21h00
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isOddDays"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    className="mx-auto mb-auto mt-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center mb-auto h-9 leading-9">3/5/7</p>
          <FormField
            control={form.control}
            name="oddTimeShift"
            render={({ field }) => (
              <FormItem className="h-16">
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!form.getValues("isOddDays")}
                      >
                        Choose Time
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-50">
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes("17h45 - 19h15")}
                        onCheckedChange={(val) => {
                          if (val) {
                            field.onChange([
                              ...(field.value as Array<string>),
                              "17h45 - 19h15",
                            ]);
                          } else {
                            field.onChange(
                              field.value?.filter((v) => v !== "17h45 - 19h15")
                            );
                          }
                        }}
                      >
                        17h45 - 19h15
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes("19h30 - 21h00")}
                        onCheckedChange={(val) => {
                          if (val) {
                            field.onChange([
                              ...(field.value as Array<string>),
                              "19h30 - 21h00",
                            ]);
                          } else {
                            field.onChange(
                              field.value?.filter((v) => v !== "19h30 - 21h00")
                            );
                          }
                        }}
                      >
                        19h30 - 21h00
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

const Confirmation = ({
  form,
}: {
  form: UseFormReturn<InferType<typeof registrationSchema>>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <p className="font-semibold">Teaching Weekdays</p>
      <p className="font-semibold">Time Shift</p>
      {form.getValues("isEvenDays") && (
        <>
          <p className="font-medium">2/4/6</p>
          <div>
            {form.getValues("evenTimeShift").map((time) => (
              <p>{time}</p>
            ))}
          </div>
        </>
      )}
      {form.getValues("isOddDays") && (
        <>
          <p className="font-medium">3/5/7</p>
          <div>
            {form.getValues("oddTimeShift").map((time) => (
              <p>{time}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TutorRegistrationButton;
