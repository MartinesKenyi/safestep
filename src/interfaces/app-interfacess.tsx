
// login
export interface LoginData {
    user:       string;
    password:   string
}
export interface RegisterUser {
    name:       string,
    user:       string,
    sector:     string,
    password:   string,
    role:       string | null,
}

// Users
export interface LoginResponse {
    ok:    boolean;
    user:  User;
    token: string;
}
export interface User {
    name:      string;
    user:      string;
    role:      string;
    sector:    string;
    password:  string;
    show:      boolean;
    createdAt: string;
    updatedAt: string;
    uid:       string;
}
