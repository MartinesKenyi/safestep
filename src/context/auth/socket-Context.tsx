import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { AuthContext } from './auth-context'

export const SocketContext = createContext({});


export const SocketProvider = ({ children }: any ) => {

    const { socket, online,conectarSocket, desconectarSocket } = useSocket('http://192.168.0.104:8000');
    const { status } = useContext( AuthContext )

    useEffect(() => {
      if( status === 'authenticated' ) {
        conectarSocket();
      }
    }, [ status, conectarSocket ] );

    useEffect(() => {
        if( status !== 'authenticated' ) {
          desconectarSocket();
        }
      }, [ status, desconectarSocket ] );
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}

