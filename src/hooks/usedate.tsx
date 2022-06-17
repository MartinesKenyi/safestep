import { useEffect, useState } from "react"
import { axiosConToken } from '../helpers/axios';
import { SectorResponse, Sector, Role, RoleResponse, Crime, CrimeResponse } from '../interfaces/app-interfacess';
import { Delictivo, DelictivosResponse } from "../interfaces/delictivo-interfaces";


export const useSectors = () => {
    const [isLoadingSector, setIsLoading] = useState(true)
    const [sectors, setSectors] = useState<Sector[]>([]);
    useEffect(() => {
        getSectors();
    }, [])
    const getSectors = async () => {
        const resp: SectorResponse = await axiosConToken('/sector');
        setSectors(resp.sectors);
        setIsLoading(false);
    }
    return {
        isLoadingSector,
        sectors
    }
}

export const useRoles = () => {
    const [isLoadingRole, setIsLoading] = useState(true)
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(() => {
        getRoles();
    }, [])

    const getRoles = async () => {
        const resp: RoleResponse = await axiosConToken('/role');

        if (!resp.ok) return setIsLoading(false);
        setRoles(resp.roles);    
        setIsLoading(false);
    }
    return {
        isLoadingRole,
        roles,
    }
}

export const useCrimes = () => {
    const [isLoadingCrimes, setIsLoading] = useState(true)
    const [crimes, setCrimes] = useState<Crime[]>([]);
    useEffect(() => {
        getSectors();
    }, [])
    const getSectors = async () => {
        const resp: CrimeResponse = await axiosConToken('/crime');
        setCrimes(resp.crimes);
        setIsLoading(false);
    }
    return {
        isLoadingCrimes,
        crimes
    }
}

export const useDelictivos = () => {
    const [isLoadingDelictivos, setIsLoading] = useState(true)
    const [delictivos, setDelictivos] = useState<Delictivo[]>([]);
    useEffect(() => {
        getSectors();
    }, [])
    const getSectors = async () => {
        const resp: DelictivosResponse = await axiosConToken('/delictivo');
        setDelictivos(resp.delictivos);
        setIsLoading(false);
    }
    return {
        isLoadingDelictivos,
        delictivos
    }
}
