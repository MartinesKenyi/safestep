// Generated by https://quicktype.io

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
    user:        User | string;
    modality?:    Modality | any |null;
    title:       string;
    description?: string;
    longitude?:   number;
    latitude?:    number;
    multimedia?:  string[] | string;
    viewpermise?: string[] | string;
    views?:       any[] | string;
    shared?:      any[] | string;
    createdAt?:   string;
    updatedAt?:   string;
    id?:          string;
    address?:     string;
    state?:       string;
    temporary?:   boolean;
    ok?:          boolean;
    reports?:      any[];
    comments?:      any[];
}
// Generated by https://quicktype.io

export interface Modality {
    _id:   string;
    crime: string | any;
    name:  string;
}

export interface User {
    _id:    string;
    name:   string;
    role:   string | any;
    sector: string | any | null;
}

export interface Report {
    delictivo:    string;
    user:         string;
    questions:    any;
    approve?:     boolean;
    longitude?:   number;
    latitude?:    number;
}

export interface QuestionResponse {
    ok:        boolean;
    total?:      number
    questions?: Question[];
}

export interface Question {
    name:       string;
    type:       string;
    value:      string;
    required:   boolean;
    id:         string;
    alternatives:any[];
}