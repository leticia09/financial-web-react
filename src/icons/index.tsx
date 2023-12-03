import {NubankIcon, SantanderIcon, InterIcon, BradescoIcon, XPIcon, BRBIcon, SafraIcon, AleloIcon} from "./assets/iconsBank";

export const getIcon = (name: string, width, height) => {
    if(name.toUpperCase() === "NUBANK") {
        return <NubankIcon height={width} width={height}/>
    }
    if(name.toUpperCase() === "XP") {
        return <XPIcon height={width} width={height}/>
    }
    if(name.toUpperCase() === "CAIXA") {
        return null
    }
    if(name.toUpperCase() === "SANTANDER") {
        return  <SantanderIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "SAFRA") {
        return <SafraIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "INTER") {
        return <InterIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "BRADESCO") {
        return <BradescoIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "ALELO") {
        return <AleloIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "BRB") {
        return <BRBIcon height={width} width={height}/>
    }
};