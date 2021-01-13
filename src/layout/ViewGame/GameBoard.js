
import React, {  useState } from "react";
import {
    Box,
    Button,
} from "@material-ui/core";
import Cell from "./Cell";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

export default function GameBoard({steps}) {
    const [currentStep, setcurrentStep] = useState(0);
    const [matrix, setMatrix] = useState(new Array(20).fill(0).map(() => new Array(20).fill(0)));

    const handleBack = () => {
        if(currentStep > 0){
            const newArray = new Array(20).fill(0).map(() => new Array(20).fill(0));
            for(let i = 0 ; i < currentStep - 1; i++) {
                const step = steps[i];

                let stepValue = 0;
                //neu la so le thi la nuoc di cua nguoi di dau tien
                //1 == X // 2 == O
                if(!(step.stepNumber % 2 === 0))
                    stepValue = 1;
                else 
                    stepValue = 2;
                newArray[step.positionX][step.positionY] = stepValue;
                
            }
            setMatrix(newArray);
            setcurrentStep(currentStep - 1);
        }
    }

    const handleNext = () => {
        if(currentStep < steps.length){
            const newArray = new Array(20).fill(0).map(() => new Array(20).fill(0));
            for(let i = 0 ; i < currentStep + 1; i++) {
                const step = steps[i];
                
                let stepValue = 0;
                //neu la so le thi la nuoc di cua nguoi di dau tien
                //1 == X // 2 == O
                if(!(step.stepNumber % 2 === 0))
                    stepValue = 1;
                else 
                    stepValue = 2;
                newArray[step.positionX][step.positionY] = stepValue;
            
            }
            setMatrix(newArray);
            setcurrentStep(currentStep + 1);
        }
        
    }
    
    return (
        <>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
                <Button size="small" variant="outlined" color="primary" startIcon={<SkipPreviousIcon/>} onClick={handleBack}>Back</Button>
                <Button size="small" variant="outlined" color="primary" endIcon={<SkipNextIcon/>} onClick={handleNext}>Next</Button>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={2}>
                {matrix.map((row) =>
                    <Box display="flex" flexDirection="row">
                        {row.map((cell, index) => <Cell key={index} value={cell} />)}
                    </Box>
                )}
            </Box>
        </>            
    );
}