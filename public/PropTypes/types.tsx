//define type for type safe props
export type blueMessageProps = {title:string, message:string};
export type cardProps = {buttonlink:string, buttontext:string, description:string, title:string, message:string, imglink:string};
export type cardData = {id:string, pos:number, buttonlink:string, buttontext:string, description:string, title:string, message:string, imglink:string};
export type menu = {id:string, title:string, link:string};
export type userData = {username:string, fName:string, lName:string, dob:Date, email:string, type:string, interest:string};
export type userVerifyData = {username:string, password:string}