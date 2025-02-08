import Image from "next/image";
import '@/public/styles.css';

export const POKEMON_TYPES: string[] = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];
  

export  function PokemonTypeImage({ imageType }: { imageType: string }) {
  const typeClass = POKEMON_TYPES.includes(imageType.toLowerCase())
  ? imageType.toLowerCase()
  : "all"; 

return (
  <div className={`icon flex justify-center items-center ${typeClass}`}>
    <Image
      src={`/icons/${typeClass}.svg`}
      alt={imageType}
      width={40} 
      height={40} 
      className="pokemon-icon"
    />
  </div>
);
}