import React, {Component, ReactNode, useState} from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/images/powered.png";
import leftArrowImage from "./assets/images/leftarrow.png";
import {Level, levels, calculateImc, cleanYourImc} from "./helpers/imc";
import {GridItem} from "./components/GridItem";


export default function () {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    function handleCalculateButton () {
        if (!(heightField && weightField)) alert("Digite todos os campos");
        setToShow(calculateImc(heightField, weightField));
    }

    function handleBackButton () {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
        cleanYourImc();
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImage} alt="" width="150"/>
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC</h1>
                    <p>
                        IMG é a sigla para Índice de Massa Corpórea, parâmetrounded
                        adotado pela Organização Mundial de Saúde para 
                        calcular o peso ideal de cada pessoa.
                    </p>
                    <input
                        type="number"
                        placeholder="Digite a sua altura. Ex: 1.47 (em métros)"
                        value={heightField ? heightField : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />
                    <input
                        type="number"
                        placeholder="Digite seu peso. Ex: 82.3 (em kg)"
                        value={weightField ? weightField : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeightField(parseFloat(e.target.value))}
                        disabled={toShow ? true : false}
                    />

                    <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>                 
                </div>
                <div className={styles.rightSide}>

                    {!toShow && 
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} data={item}/>
                            ))}
                        </div>
                    }

                    {toShow && 
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage} width="25"/>
                            </div>
                            <GridItem data={toShow}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
