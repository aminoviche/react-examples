import { useState, useEffect } from 'react';

function useCustomHook(param) {
  // Déclarez des états ou d'autres hooks ici
  const [state, setState] = useState(initialValue);

  // Utilisez useEffect ou d'autres hooks selon les besoins
  useEffect(() => {
    // Logique à exécuter lors du montage ou de la mise à jour
    // ...

    return () => {
      // Nettoyage si nécessaire
      // ...
    };
  }, [param]); // Dépendances

  // Retournez les valeurs ou fonctions nécessaires
  return [state, setState];
}
