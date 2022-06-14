import React from 'react'
// import { useCallback, useEffect, useState } from 'react';
// import io, {Socket} from 'socket.io-client';


// export const useSocket = ( serverPath: any ) => {

//     // const socket = useMemo(() => io.connect( serverPath, {transports: ['websocket']} ), [ serverPath ] );
//     const [socket, setSocket] = useState<Socket>();
//     const [ online, setOnline ] = useState(false);
    
//     const conectarSocket = useCallback( async() => {
        
//         const token = await localStorage.getItem('token');
//         // localStorage
//         const socketTemp = io( serverPath, {
//             transports:['websocket'],
//             autoConnect: true,
//             query: {
//                 'x-token': token || ''
//             }
//         })

//         setSocket(socketTemp)
//     },[ serverPath ])

//     const desconectarSocket = useCallback(() => {
//         socket?.disconnect();
//     }, [socket]);


//     useEffect(() => {
//         setOnline( socket.connected );
//     }, [socket])

//     useEffect(() => {
//         socket?.on('connect', () => setOnline( true ));
//     }, [ socket ])

//     useEffect(() => {
//         socket?.on('disconnect', () => setOnline( false ));
//     }, [ socket ])

//     return {
//         conectarSocket,
//         desconectarSocket,
//         socket,
//         online
//     }
// }

