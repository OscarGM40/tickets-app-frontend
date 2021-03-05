import React from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'

//creamos el contexto llamado SocketContext
export const SocketContext = createContext();

//creamos el HOC que aprovisionará
export const SocketProvider = ({ children }) => {
    //es aqui donde usó el custom hook,para aprovisionar a toda la app
    //const { socket, online } = useSocket('http://localhost:8080');
    const { socket, online } = useSocket('https://ticket-sockets-backend.herokuapp.com/');
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}