import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/dialog/user-form";
import { User } from "@/constants/data";
import { createSupbaseServerClient } from "@/lib/supabase";
import React from "react";

export default async function Page({ params }: { params: { userId: string } }) {
  const initialData = async () => {
    if (params) {
      const userId = params?.userId;
      if (userId && userId !== "new") {
        const supabase = await createSupbaseServerClient();
        const { data: permissions } = await supabase
          .from("permissions")
          .select("*, users(*)")
          .eq("user_id", userId);
        if (permissions) {
          const users: User[] = (permissions || []).map((permission) => {
            return {
              id: permission?.users?.id,
              name: permission?.users?.name,
              email: permission?.users?.email,
              role: permission?.role,
              avatar_url: permission?.users?.avatar_url,
            };
          });
          return users[0];
        }
      }
    }
    return null;
  };

  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <UserForm
        initialData={await initialData()}
        roles={[
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ]}
      />
    </div>
  );
}
