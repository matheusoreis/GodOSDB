import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRuleDto } from './create';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
