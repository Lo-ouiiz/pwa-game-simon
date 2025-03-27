import React, { useState, useEffect } from 'react';
import './installButton.scss';
import { BeforeInstallPromptEvent } from '../../types';

const InstallButton: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  console.log(navigator.userAgent);
  console.log(navigator.vendor);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    if (isChrome) {
      setSupportsPWA(true);
    }
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleClick = async () => {
    if (promptInstall) {
      await promptInstall.prompt();
      const choiceResult = await promptInstall.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('L\'utilisateur a accepté l\'installation de la PWA');
      } else {
        console.log("L'utilisateur a refusé l'installation de la PWA");
      }
      setPromptInstall(null);
    }
  };

  return supportsPWA ? (
    <div className='root'>
      <p>Installez l'application web GoodHealth sur votre appareil dès maintenant en cliquant sur le bouton ci-dessous.</p>
      <div className='buttonInstall'>
        <button onClick={handleClick}>Installer l'application</button>
      </div>
    </div>
  ) : null;
};

export default InstallButton;
