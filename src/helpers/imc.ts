export interface Level {
    title: string,
    color: string,
    icon: string,
    imc: [number, number],
    yourImc?: number
};

export const levels: Level[] = [
    {
        title: 'Magreza',
        color: '#96a3ab',
        icon: 'down',
        imc: [0, 18.5]
    },
    {
        title: 'Normal',
        color: '#0ead69',
        icon: 'up',
        imc: [18.6, 24.9]
    },
    {
        title: 'Sobrepeso',
        color: '#e2b039',
        icon: 'down',
        imc: [25, 30]
    },
    {
        title: 'Obesidade',
        color: '#c3423f',
        icon: 'down',
        imc: [30.1, 99]
    }
];

export function calculateImc (height: number, weight: number, clicked: boolean = false): Level {
    const imc = weight / height ** 2;
    const category = levels.find(({imc: limit}) => imc >= limit[0] && imc <= limit[1]) as Level;
    if(category) category.yourImc = parseFloat(imc.toFixed(2))
    return category;
}

export function cleanYourImc (): void {
    for(let level of levels){
        delete level.yourImc;
    }
}

