export class Hotelobj{
   address! : string;
   city! : string;
   featuredImage! : string;
   id! : number;
   name! : string;
   rooms! : Room[];
}





export class Room{
    available! : boolean;
    bookedDates! : any;
    hotelId! : number;
    id! : number;
    images! : any;
    maximumGuests! : number;
    name! : string;
    pricePerNight! : number;
    roomTypeId! : number;
}


