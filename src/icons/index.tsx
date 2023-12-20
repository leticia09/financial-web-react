import {
    NubankIcon,
    SantanderIcon,
    InterIcon,
    BradescoIcon,
    XPIcon,
    BRBIcon,
    SafraIcon,
    AleloIcon,
    CaixaIcon, C6Icon, LiveloIcon, TicketIcon
} from "./assets/iconsBank";

export const getIcon = (name: string, width, height) => {
    if(name.toUpperCase() === "NUBANK") {
        return <NubankIcon height={width} width={height}/>
    }
    if(name.toUpperCase() === "XP") {
        return <XPIcon height={width} width={height}/>
    }
    if(name.toUpperCase() === "CAIXA") {
        return <CaixaIcon height={width} width={height}/>
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

    if(name.toUpperCase() === "C6" ||  name.toUpperCase() === "C6 BANK") {
        return <C6Icon height={width} width={height}/>
    }

    if(name.toUpperCase() === "LIVELO") {
        return <LiveloIcon height={width} width={height}/>
    }

    if(name.toUpperCase() === "TICKET") {
        return <TicketIcon height={width} width={height}/>
    }
};