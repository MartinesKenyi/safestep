import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { AuthContext } from './auth-context'
import {Socket} from 'socket.io-client';
import { server } from '../../helpers/axios';

type SocketContextProps = {
  socket: Socket | undefined,
  online: boolean | undefined
}

export const SocketContext = createContext({} as SocketContextProps );


export const SocketProvider = ({ children }: any ) => {

    const { socket, online,conectarSocket, desconectarSocket } = useSocket(server);
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

