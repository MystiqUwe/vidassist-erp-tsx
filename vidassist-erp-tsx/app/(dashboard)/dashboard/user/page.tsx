import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { readMembers } from "./actions";
import type { User } from "@/constants/data";
import { createSupbaseServerClient } from "@/lib/supabase";

const breadcrumbItems = [{ title: "Users", link: "/dashboard/user" }];
export default async function page() {
  const { data: permissions, error: error } = await readMembers();
  const users: User[] = (permissions || []).map((permission) => {
    return {
      id: permission?.users?.id,
      permissionId: permission?.id,
      name: permission?.users?.name,
      email: permission?.users?.email,
      role: permission?.role,
    };
  });

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
