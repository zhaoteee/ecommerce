import NavAdmin from "@/components/dashboard/sidebar/navAdmin";
import UserInfo from "@/components/dashboard/userInfo/userInfo";
import Logo from "@/components/shared/logo";
import { adminDashboardSidebarOptions } from "@/constants/data";
import { currentUser } from "@clerk/nextjs/server";

const Sidebar = async ({ isAdmin }: { isAdmin: boolean }) => {
  const user = await currentUser();

  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
      <Logo />
      <UserInfo user={user} />
      {isAdmin && <NavAdmin menus={adminDashboardSidebarOptions} />}
    </div>
  );
};

export default Sidebar;
