"use server"

import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createMember(data: {
    name: string;
    role: string;
    imgUrl?: {
        name: string;
        fileName: string;
        fileSize: number;
        size: number;
        fileKey: string;
        key: string;
        fileUrl: string;
        url: string;
    }[] | undefined;
    email: string;
    password: string;
    confirmPassword: string;
}) {

	/*const {data: userSession} = await readUserSession();
	if(userSession.session?.user.user_metadata.role !== "admin"){
		return JSON.stringify({error: {message: "You are not authorized to create a member"}});
	}*/

	const supabase = await createSupabaseAdmin();
	//create account
	//create member
	//create permission
	const createResult = await supabase.auth.admin.createUser({
		email: data.email,
		password: data.password,
		email_confirm: true,
		user_metadata: {
			role: data.role,
			name: data?.name
		}
	})

	if(createResult.error?.message){
		return JSON.stringify(createResult)
	}else{
		const memberResult = await supabase.from("users").insert({
			name: data.name,
			id: createResult.data.user?.id,
			email: createResult.data.user?.email
		})
		if(memberResult.error?.message){
			return JSON.stringify(memberResult)
		}else{
			const permissionResult = await supabase.from("permissions").insert({
				role: data.role,
				user_id: createResult.data.user?.id,
			})
			revalidatePath("/dashboard/user");
			return JSON.stringify(permissionResult);
		}
	}
}

export async function deleteMemberById(user_id: string) {
	//admin only
	const {data: userSession} = await readUserSession();
	if(userSession.session?.user.user_metadata.role !== "admin"){
		return JSON.stringify({error: {message: "You are not authorized to create a member"}});
	}
	//delete account
	const supabaseAdmin = await createSupabaseAdmin();

	const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);
	if(deleteResult.error?.message){
		return JSON.stringify(deleteResult)
	}else{

		const supabase = await createSupbaseServerClient();
		const result =  await supabase.from("users").delete().eq("id", user_id);
		revalidatePath("/dashboard/user");
		return JSON.stringify(result);

	}

}

export async function updateUserAccountById(
	userId: string,
	permissionId: string,
	data:{
		name?: string;
		email?: string;
		password: string;
		confirmPassword: string;
		role: string;
		imgUrl?: {
			size: number;
			name: string;
			fileName: string;
			fileSize: number;
			fileKey: string;
			key: string;
			fileUrl: string;
			url: string;
		}[] | undefined;
	}
) {

	console.log("data", data);

	const {data: userSession} = await readUserSession();
	if(userSession.session?.user.user_metadata.role !== "admin"){
		return JSON.stringify({error: {message: "You are not authorized to update a member advanced!"}});
	}

	return JSON.stringify({error: {message: "Test case!"}});

}

export async function addAvatarToUser(userId: string, avatar_url: string){
	const supabase = await createSupbaseServerClient();
	return await supabase.from("users").update({avatar_url: avatar_url}).eq("id", userId);
};


export async function readMembers() {

	unstable_noStore();
	const supabase = await createSupbaseServerClient();
	return await supabase.from("permissions").select("*, users(*)");

}
