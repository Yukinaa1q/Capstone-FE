import RoomApi from "@/api/RoomApi";
import RequiredInput from "@/components/Input/RequiredInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const NewRoomSchema = object({
  // isOnline: boolean().required().default(false),
  roomCode: string().when("isOnline", {
    is: false,
    then: (schema) => schema.required("Room Code is required"),
  }),
  roomAddress: string().when("isOnline", {
    is: false,
    then: (schema) => schema.required("Room Address is required"),
  }),
});

const NewRoom = () => {
  const form = useForm({
    defaultValues: {
      // isOnline: false,
      roomCode: "",
      roomAddress: "",
    },
    resolver: yupResolver(NewRoomSchema),
  });

  const onSubmit = async (data: InferType<typeof NewRoomSchema>) => {
    console.log(data);
    try {
      await RoomApi.addRoom(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className="mx-auto block">
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="roomCode"
                  control={form.control}
                  render={({ field }) => (
                    <RequiredInput label="Room" isRequired={false}>
                      <Input
                        {...field}
                        disabled={form.getValues("isOnline")}
                        className="disabled:bg-gray-100"
                      />
                    </RequiredInput>
                  )}
                />

                <FormField
                  name="roomAddress"
                  control={form.control}
                  render={({ field }) => (
                    <RequiredInput label="Room Address" isRequired={false}>
                      <Input
                        {...field}
                        disabled={form.getValues("isOnline")}
                        className="disabled:bg-gray-100"
                      />
                    </RequiredInput>
                  )}
                />

                <Button className="bg-t_primary-500 hover:bg-t_primary-500/70">
                  Add Room
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoom;
