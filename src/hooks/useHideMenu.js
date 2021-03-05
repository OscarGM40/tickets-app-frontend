//un custom hook es un functional component
import { useContext, useEffect } from "react";
import { UIContext } from "../context/UIContext";

export const useHideMenu = (ocultar) => {
  const { showMenu, hideMenu } = useContext(UIContext);

  //va en un efecto porque se queda observando!
  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ ocultar,showMenu,hideMenu ]);

  //El hook no va a retornar nada, solo cambia el valor del state
};
