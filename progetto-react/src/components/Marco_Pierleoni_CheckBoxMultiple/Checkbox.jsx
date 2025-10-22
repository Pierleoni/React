import React from 'react'
// import ArraySkills from './ArraySkills'
// Importo il componente SkillSelector
import SkillSelector from './SkillSelector';

// Definisco il componente Checkbox
const Checkbox = () => {
    // Ritorno elementi JSX
    return (
        <div>
            
            <h2>Seleziona le tue skill</h2>
            {/* Renderizzo il componente importato */}
            <SkillSelector />
        </div>
    )
}

export default Checkbox