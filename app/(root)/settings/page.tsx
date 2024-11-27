import SidebarMenu from "@/components/shared/SidebarMenu";

export default function Settings() {
  return (
    <div className="max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16">
      <div className="flex justify-between mb-8">
        <SidebarMenu activePage="settings" />
        <div className="w-full ml-12 py-5">
          <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">
          Settings
          </h1>
          <p className="text-base mb-8 sm:text-lg">
            View and manage your account settings here.
          </p>
        </div>
      </div>
    </div>
  );
}
