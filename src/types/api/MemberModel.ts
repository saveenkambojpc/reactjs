export type MemberModel = {
    id: string;
    name: string;
    username: string;
    email: string;
    phone_number: string;
    gender: string;
    height: string;
    weight: string;
    designation: string;
    family_id: string;
    roles: string[];
    dob: string;
    member_admin_id: string[];
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
    partitionKey: string;
};

export type MemberPostPutModel = {
    name: string;
    username: string;
    email: string;
    phone_number: string;
    gender: string;
    height: string;
    weight: string;
    designation: string;
    family_id: string;
    roles: string[];
    dob: string;
    member_admin_id: string[];
};
