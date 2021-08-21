import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

//al implementar este custom hook podremos usar sockets en el front y saber el estado online/offline con el server
export const useSocket = ( serverPath ) => {
    //toda la app usará esta misma instancia
    const socket = useMemo(() => io.connect( serverPath
        ,{ transports: ['websocket'] }
        ), [ serverPath ] );

    //exportaremos socket y la funcion memorizada
    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        setOnline( socket.connected );
    }, [socket])

    useEffect(() => {
        socket.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online
    }
}
