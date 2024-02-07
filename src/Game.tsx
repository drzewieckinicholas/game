import Phaser from 'phaser';
import { useEffect } from 'react';

import { GameConfig } from './GameConfig';

const Game: React.FC = () => {
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);

    return () => game.destroy(true);
  }, []);

  return <div id='game' />;
};

export default Game;
