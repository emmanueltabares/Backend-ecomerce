import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class ProductDTO {
  readonly id: string;

  @IsNotEmpty()
  @Length(5, 40)
  readonly titulo: string;

  @IsNotEmpty()
  readonly descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
