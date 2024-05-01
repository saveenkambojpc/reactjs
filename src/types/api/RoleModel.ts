export type RoleModel = {
  name: string;
  scopes: {
    member: boolean;
    it_admin: boolean;
    family_admin: boolean;
    member_admin: boolean;
    maker: boolean;
    checker: boolean;
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
  id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  partitionKey: string;
};

export type RolePostPutModel = {
  name: string;
  scopes: {
    member: boolean;
    it_admin: boolean;
    family_admin: boolean;
    member_admin: boolean;
    maker: boolean;
    checker: boolean;
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
};
