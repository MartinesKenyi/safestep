import { useEffect, useState } from "react"
import { axiosConToken } from '../helpers/axios';
import { SectorResponse, Sector, Role, RoleResponse } from '../interfaces/app-interfacess';


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

        // const ok = resp.roles.find(r => r.name === 'CIUDADANO_ROLE');
        // if (!ok) {
        //     const newRole = await axiosConToken('/role/no-admin', { name: 'CIUDADANO_ROLE' }, 'POST');
            
        //     if (!newRole.ok) return setIsLoading(false);
        //     return setRoles([newRole.role]);
        // }
        setRoles(resp.roles);    
        setIsLoading(false);
    }
    return {
        isLoadingRole,
        roles,
    }
}

// export const useCrimes = () => {
//     const [isLoadingCrimes, setIsLoading] = useState(true)
//     const [crimes, setCrimes] = useState<Crime[]>([]);
//     useEffect(() => {
//         getSectors();
//     }, [])
//     const getSectors = async () => {
//         const resp: CrimeResponse = await axiosConToken('/crime');
//         setCrimes(resp.crimes);
//         setIsLoading(false);
//     }
//     return {
//         isLoadingCrimes,
//         crimes
//     }
// }
