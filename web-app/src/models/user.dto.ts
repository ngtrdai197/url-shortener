import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Expose({ name: "full_name" })
  fullName!: string;

  @Expose({ name: "created_at" })
  createdAt!: Date;
}
