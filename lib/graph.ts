type R = string;
type S = string;
type E = string;

type Place = {
    id: string,
    floor: number,
    type: R | S | E
}

type Connection = {
    id: string,
    dist: number
}

type Graph = {
    RoomId: Array<Place>,
    adj: Array<Connection>,
    size: number
}
