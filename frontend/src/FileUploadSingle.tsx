import { UploadIcon } from './Links';
import { RingLoader } from "react-spinners";
import { ChangeEvent, useState } from 'react';
import { CenteredTabs } from './Tabs';

// const testJSON = {
//     "bulletpoints": {
//         "0": "- The focus of this lecture is on fluid pressure and its applications.",
//         "1": "- Pascal's Principle is about how pressure applied to a fluid will be transmitted equally in all directions.",
//         "2": "- This principle is applied to hydraulic lifts, where a small force can be used to lift a large weight.",
//         "3": "- Archimedes' Principle explains why buoyant forces exert an upward force on objects submerged in fluids. ",
//         "4": "- This enables us to calculate the buoyant force exerted on objects submerged in fluids.",
//         "5": "- The last topic is about how to measure blood pressure using a sphygmomanometer. ",
//         "6": "- Blood pressure is the pressure exerted by blood against the walls of arteries.",
//         "7": "- This university lecture covers fluid dynamics, specifically the continuity of fluid flow and Bernoulli's principle.",
//         "8": "- It also mentions viscosity, but the assumptions of the lecture are ideal fluids, meaning no viscosity, incompressibility, and laminar flow.",
//         "9": "- These assumptions help calculate the flow rate of fluids at different points, which will always be the same.",
//         "10": "- The speed of the fluid, however, will change, following the principle of continuity, where speed will increase where the cross-sectional area decreases.",
//         "11": "- Bernoulli's principle can then be used to find the pressure fluctuations in these non-viscous fluids, which will be the subject of the next lecture.",
//         "12": "- The conservation of energy is used to solve problems involving fluids flowing through pipes",
//         "13": "- These problems involve finding the pressure at certain points in the pipe, which can be done using the equation 𝑃!+12𝜌𝑣!\"+𝜌𝑔𝑦!=𝑐𝑜𝑛𝑠𝑡𝑎𝑛𝑡",
//         "14": "- This equation can be used to find the pressure at a point in a pipe where the cross-sectional area changes, as well as the velocity and height of the fluid at that point. ",
//         "15": "- The change in energy of the fluid is equal to the sum of the fluid's kinetic energy, potential energy, and pressure. ",
//         "16": "- This equation can be used to solve problems involving fluids flowing through pipes, such as finding the pressure at certain points in the pipe, the velocity of the fluid, or the height of the fluid at a particular point. ",
//         "17": "- The conservation of mass is also used to solve problems involving fluids, which states that the mass of fluid entering a point must be equal to the mass of fluid leaving the point.",
//         "18": "- Viscosity is a fluid's resistance to deformation under shear stress and is the major factor in fluid friction and traction.",
//         "19": "- Ideal fluid flow is unaffected by viscosity and obeys Bernoulli and continuity equations.",
//         "20": "- In viscous flow, pressure drop and energy loss per unit volume occurs, and Poiseuille's law applies.",
//         "21": "- The energy lost per unit volume of fluid is proportional to the viscosity of the fluid.",
//         "22": "- The greater the viscosity of a fluid, the more energy is required to maintain a given speed. ",
//         "23": "- In the example problem, we calculate the pressure that the ostrich's heart must pump the blood, accounting for both height and viscosity."
//     },
//     "definitions": {
//         "0": "- Fluid pressure: The force exerted by a fluid on a unit area.",
//         "1": "- Pascal's Principle: The principle that states that pressure applied to a fluid will be transmitted equally in all directions.",
//         "2": "- Hydraulic lift: A system that uses Pascal's Principle to lift a heavy object using a small force.",
//         "3": "- Archimedes' Principle: The principle that explains why buoyant forces exert an upward force on objects submerged in fluids.",
//         "4": "- Buoyant force: The upward force exerted on an object submerged in a fluid.",
//         "5": "- Sphygmomanometer: A device used to measure blood pressure.",
//         "6": "- Blood pressure: The pressure exerted by blood against the walls of arteries.",
//         "7": "- Fluid dynamics: The study of the motion of fluids, including the study of fluid pressure, flow, and forces.",
//         "8": "- Continuity of fluid flow: The principle that states that the flow rate of a fluid remains constant as it passes through different points in a system.",
//         "9": "- Bernoulli's principle: The principle that states that, in an ideal fluid flow, as the speed of a fluid increases, its pressure decreases.",
//         "10": "- Viscosity: A fluid's resistance to shear stress or deformation.",
//         "11": "- Incompressibility: The property of a fluid that does not change its volume when subjected to pressure.",
//         "12": "- Laminar flow: The smooth, straight flow of a fluid in parallel layers.",
//         "13": "- Conservation of energy: The principle that states that energy cannot be created or destroyed, only transformed or transferred.",
//         "14": "- Conservation of mass: The principle that states that mass is conserved in a fluid system, and the mass of fluid entering a point must be equal to the mass of fluid leaving the point.",
//         "15": "- Poiseuille's law: A formula that relates the pressure drop in a viscous fluid flow through a pipe to the flow rate, viscosity, and dimensions of the pipe.",
//         "16": "- Ideal fluid: A fluid that has no viscosity, can be considered incompressible, and has laminar flow.",
//         "17": "- Energy loss: The amount of energy that is lost per unit volume of fluid in a viscous flow.",
//         "18": "- Shear stress: The force per unit area in a fluid that results in the deformation of the fluid.",
//         "19": "- Example problem: A specific problem or calculation given as an example to apply the concepts discussed in the lecture."
//     },
//     "problems": {
//         "0": "Possible practice problems:",
//         "1": "",
//         "2": "1. Explain Pascal's Principle and provide an example of its application in hydraulic lifts.",
//         "3": "2. Describe Archimedes' Principle and how it relates to buoyant forces. Calculate the buoyant force exerted on an object submerged in a fluid.",
//         "4": "3. Outline the steps involved in measuring blood pressure using a sphygmomanometer.",
//         "5": "4. Define ideal fluids and explain the assumptions made about them in fluid dynamics. Discuss the significance of these assumptions.",
//         "6": "5. Use Bernoulli's principle to calculate pressure fluctuations in non-viscous fluids. ",
//         "7": "6. Apply the conservation of energy equation to solve problems involving fluids flowing through pipes. Find the pressure, velocity, and height of the fluid at a specific point in the pipe.",
//         "8": "7. Discuss the conservation of mass principle and its role in solving fluid problems. ",
//         "9": "8. Define viscosity and its impact on fluid friction and traction. Explain how it affects flow in both ideal and viscous fluids.",
//         "10": "9. Apply Poiseuille's law to calculate pressure drop and energy loss in viscous fluid flow.",
//         "11": "10. Use the example problem of calculating the pressure required by an ostrich's heart to pump blood to determine the effects of height and viscosity on the required pressure."
//     }
// }

export default function FileUploadSingle() {
    interface Json {
        bulletpoints: any,
        definitions: any,
        problems:any,
    }
    const mt: Json = {bulletpoints:[],definitions:[],problems:[]}
    const [showButton, setShowButton] = useState(false);
    const [showUploadPhrase, setShowUploadPhrase] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showTableRes, setShowTableRes] = useState(false);
    const [file, setFile] = useState<File>();
    const [jsonData, setJsonData] = useState(mt);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setShowButton(true);
            setShowUploadPhrase(false);
            setFile(e.target.files[0]);
        }
    };
    function Loading() {

        return (
            <div className="loading">
                <RingLoader color='#30CAFB' size='3rem' />
            </div>
        )
    }
    const UploadButton = () => {
        return (
            <div>
                <button onClick={handleUploadClick}>Generate Study Tools</button>
                <div className='loaderwrapper'>
                    {showLoading ? <Loading /> : null}
                </div>
            </div>
        )
    }
    
    const handleUploadClick = () => {
        if (!file) {
            return;
        }
        if (file.type != "application/pdf") {
            return;
        }
        setShowLoading(true);
        fetch('/uploadPDF', {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`
            },
        })
            .then(function (res: Response) {
                console.log(res);
                return res.json();
            })
            .then(function (json) {
                // ANDREW DO THINGS WITH THE JSON HERE
                setShowLoading(false);
                setShowTableRes(true);
                setJsonData(json);
                console.log(json);
            })
            .catch(function (err) {
                console.log("big error\n");
                console.log(err)
            });
    };
    return (
        <>
            <div id='uploadwrapper'>
                <div className='uploaddiv'>
                    <label className='fileupload'>
                        <UploadIcon />
                        <input type="file" onChange={handleFileChange} />
                    </label>
                    <div>{file && `${file.name} - ${file.type}`}</div>
                    {showButton ? <UploadButton /> : null}
                </div>
                {showUploadPhrase ? <span className='uploadphrase'>Upload your lecture materials</span> : null}
            </div>
            {showTableRes ?
                <section>
                    <h1 className='pagetitle'>Slides Summary</h1>
                    <p>{jsonData.bulletpoints}</p>
                    <div className='tabwrapper'>
                        <CenteredTabs 
                        summary={jsonData.bulletpoints}
                        def={jsonData.definitions}
                        problems={jsonData.problems} />
                    </div>
                </section> : null}
        </>
    );
}