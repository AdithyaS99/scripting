import { MinLength, IsNotEmpty } from "class-validator";

export class MovieDto
{
    @IsNotEmpty()
    readonly title: string;

    @MinLength(3)
    readonly genre: string;

    @MinLength(6)
    description: string;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    language: string;

    parent_movie: number;
}