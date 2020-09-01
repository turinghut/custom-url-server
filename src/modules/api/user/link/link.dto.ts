import {IsNotEmpty, IsString, IsBoolean, IsIn} from 'class-validator'

export class LinkDTO{
    @IsNotEmpty()
    @IsString()
    redirectsTo

    @IsIn([0,1,2])
    @IsNotEmpty()
    status
        
    @IsString()
    name
    
    @IsBoolean()
    @IsNotEmpty()
    inPool

    @IsString()
    customUrl
}