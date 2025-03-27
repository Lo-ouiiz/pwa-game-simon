import React, { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '../../types';
import './InstallButton.scss';

const InstallButton: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    let isChrome = false;

    if (navigator.userAgentData?.brands) {
        const brands = navigator.userAgentData.brands.map(b => b.brand);
        isChrome = brands.includes("Google Chrome");
    }
    
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
      <p>Installez l'application Simon sur votre appareil dès maintenant en cliquant sur le bouton ci-dessous.</p>
      <div className='buttonInstall'>
        <button onClick={handleClick}>Installer l'application</button>
      </div>
    </div>
  ) : null;
};

export default InstallButton;
