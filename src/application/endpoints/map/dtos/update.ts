import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMapDto } from './create';

export class UpdateMapDto extends PartialType(CreateMapDto) {}
