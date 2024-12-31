import { IsString, IsOptional } from 'class-validator';

export class CreateClotheDto {
  @IsString()
  clotcheDescription: string;

  @IsOptional()
  @IsString()
  clotcheImageFront?: string;

  @IsOptional()
  @IsString()
  clotcheImageBack?: string;
}
