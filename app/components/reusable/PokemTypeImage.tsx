import Image from 'next/image'

function pokemonImage(type : string) {
    switch (type) {
        case 'bug' : return <Image src='./icons/bug.svg' alt='All' width={25} height={25} />
        default : return <Image src='./icons/all.png' alt='All' width={25} height={25} />
    }
}


export default function PokemonTypeImage({ imageType }: { imageType: string }) {
    return (
        <>
            {pokemonImage(imageType)}
        </>
    )
}