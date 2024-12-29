import AvatarPopover from "./Avatar";
import Notification from "./Notification";

const Topbar = () => {
  return (
    <div className="ml-auto h-fit flex items-center gap-4">
      <Notification />
      <AvatarPopover />
    </div>
  );
};

export default Topbar;
