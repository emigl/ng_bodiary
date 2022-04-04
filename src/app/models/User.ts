export interface User{
    id?: number,
    role_id?: number,
    name?: string,
    email: string,
    password: string,
    remember_me?: false,
    isActive?: boolean

}