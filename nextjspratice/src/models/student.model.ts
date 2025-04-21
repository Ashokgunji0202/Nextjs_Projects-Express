import { Decimal } from "@prisma/client/runtime/library"


export default interface Student{
    id:number,
    name:string,
    age:number,
    branch:string,
    isEligible: boolean,
    percentage:Decimal
}