import { PartialType } from '@nestjs/mapped-types';
import { CreateClotchDto } from './create-clotch.dto';

export class UpdateClotchDto extends PartialType(CreateClotchDto) {}
