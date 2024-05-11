import connection from "../connection";

export class UserData {

    public async getUserById(id: string) {
        try {
            const user = await connection('user').where(id).first();
            return user
        } catch (error: any) {
            throw new Error(error.message)
        }

    }

}