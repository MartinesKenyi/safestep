
export interface DelictivosResponse {
    ok:        boolean;
    total:      number
    delictivos: Delictivo[];
}
export interface DelictivoResponse {
    ok:        boolean;
    delictivo: Delictivo;
}

export interface Delictivo {
    user?:        User | string;
    modality?:    Modality | null;
    title:       string;
    description?: string;
    longitude?:   number;
    latitude?:    number;
    multimedia?:  any[];
    viewpermise?: string[] | string;
    views?:       any[];
    shared?:      any[];
    createdAt?:   string;
    updatedAt?:   string;
    id?:          string;
    address?:     string;
    ok?:          boolean;
    reports?:      any[];
    comments?:      any[];
}
export interface Modality {
    _id:   string;
    crime: string;
    name:  string;
}

export interface User {
    _id:    string;
    name:   string;
    role:   string;
    sector: string | null;
    show:   boolean;
}
