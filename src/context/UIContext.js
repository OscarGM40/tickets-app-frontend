import React,{ createContext, useState } from 'react';


//exportamos el componente que hará de contexto
export const UIContext = createContext();

//Nos falta crear el Provider,este componente será llamado en un punto suficientemente alto de la app.Es buena idea llamarlo xxxProvider
export const UIProvider = ( { children }) => {

   //el estado es el boleano que oculta el menu.logicamnete
   const [ocultarMenu, setOcultarMenu] = useState( false );

   //ese estado debe cambiar con funcionalidad,la puedo definir aqui perfectamente

   const showMenu = () => {
      setOcultarMenu( false );
   }

   const hideMenu = () => {
      setOcultarMenu( true );
   }

   return (
      <div> 
         <UIContext.Provider 
         value={{
            ocultarMenu,
            showMenu,
            hideMenu
         }}>
            { children } 
         </UIContext.Provider>
      </div>
   )
}
