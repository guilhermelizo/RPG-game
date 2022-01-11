import { useState } from "react";
import { CharacterSides } from "../types/CharacterSides";
import { mapSpots } from "../data/mapSpots";

// Hook personalizado, não entrega nada gráfico
// Apenas entrega propriedades
// (Posição do usuário)
export const useCharacter = (propName: string) => {
  const [name, setName] = useState(propName);
  const [pos, setPos] = useState({ x: 3, y: 5 });
  const [side, setSide] = useState<CharacterSides>("down");

  const moveLeft = () => {
    setPos((pos) => ({
      x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
      y: pos.y,
    }));
    setSide("left");
  };
  const moveRight = () => {
    setPos((pos) => ({
      x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
      y: pos.y,
    }));
    setSide("right");
  };
  const moveDown = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y,
    }));
    setSide("down");
  };
  const moveUp = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y,
    }));
    setSide("up");
  };

  //Função que vai verificar se o personagem pode ou não se mover de acordo com o mapa
  const canMove = (x: number, y: number) => {

    //se der como 'undefined' significa que não foi definido no mapa então ele não anda
    if (mapSpots[y] !== undefined && mapSpots[y][x] !== undefined) { 
     return (mapSpots[y][x] === 1)
    }

    return false;
  };

  return {
    name,
    x: pos.x,
    y: pos.y,
    side,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};
