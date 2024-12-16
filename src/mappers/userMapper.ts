import { User } from "@prisma/client";
import { UserDTO } from "../types";

export class UserMapper {
    static toDTO(userEntity: User):UserDTO{
        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email
        };
    }

    static toEntity(userDTO: UserDTO):User{
        return {
            id: userDTO.id,
            name: userDTO.name,
            email: userDTO.email
        }
    }

}