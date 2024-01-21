import { UploadIcon } from './Links';
import { RingLoader } from "react-spinners";
import { ChangeEvent, useState } from 'react';
import { CenteredTabs } from './Tabs';


const testfile = {"bulletpoints": {"0": "- Pascal's principle is about how pressure helps move fluids and can be used to multiply force", "1": "- Blood pressure can be calculated based on density and height of organs", "2": "- Archimedes' principle explains buoyancy, and why objects sink or float in fluids", "3": "- The buoyant force depends on the volume of fluid displaced and the fluid's density", "4": "- For an object to float, the buoyant force must be equal to or greater than the object's weight", "5": "- This slideshow covers lessons on density and buoyancy in fluids, as well as basic principles of fluid dynamics", "6": "- The buoyancy topics cover understanding why different objects sink or float in different fluids, and how to rank densities of objects in relation to different fluids", "7": "- The fluid dynamics portion covers ideal fluids, flow rate, and viscosity, and includes real-world examples such as the capacity of stand-up paddleboards and the rate of flow from a faucet to illustrate the lessons. ", "8": "- Questions throughout the slideshow reinforce the major concepts.", "9": "- The conservation of energy is used to solve for different quantities in mechanics, and especially for fluids.", "10": "- The energy of a fluid is divided into kinetic energy and gravitational potential energy.", "11": "- The change in these energies between different points in a system is equal to the work done on the fluid at that point.", "12": "- This can be used to calculate different quantities like pressure and velocity.", "13": "- Bernoulli's equation is a special case of the conservation of energy for fluid flow.", "14": "- The sum of the pressure energy, kinetic energy, and potential energy per unit volume at any point along a line is constant.", "15": "- This equation can be used to solve for different unknown quantities in fluid dynamics. ", "16": "- For example, given the diameter, height, and pressure of three points, we can solve for the velocity at point 2.", "17": "- Viscosity is a measure of a fluid's resistance to deformation at a given rate, which is ultimately a measure of the frictional forces between layers of the fluid in relative motion to one another", "18": "- Ideal fluid flow is a theoretical concept, in which there is no viscosity and no friction, and the fluid is incompressible", "19": "- Viscous flow, on the other hand, is characterized by energy loss to frictional forces, which slows down the fluid and requires work to be done to maintain a constant flow rate", "20": "- In the context of fluid dynamics, the Poiseuille's law relates the pressure drop in an incompressible and Newtonian fluid in laminar flow flowing through a long cylindrical pipe of constant diameter to the flow rate and viscosity of the fluid"}, "definitions": {"0": "1. Pascal's principle: The principle that explains how pressure helps move fluids and can be used to multiply force.", "1": "", "2": "2. Blood pressure: The measurement of the pressure exerted by blood against the walls of blood vessels, which can be calculated based on the density and height of organs.", "3": "", "4": "3. Archimedes' principle: The principle that explains buoyancy and why objects sink or float in fluids.", "5": "", "6": "4. Buoyant force: The force exerted on an object submerged or floating in a fluid, which depends on the volume of fluid displaced and the fluid's density.", "7": "", "8": "5. Density: The mass of an object divided by its volume, which is a measure of how tightly packed the matter of an object is.", "9": "", "10": "6. Buoyancy: The ability of an object to float in a fluid, which occurs when the buoyant force is equal to or greater than the object's weight.", "11": "", "12": "7. Fluid dynamics: The study of how fluids flow and behave under different conditions.", "13": "", "14": "8. Conservation of energy: The principle that states that energy cannot be created or destroyed, only transferred or transformed.", "15": "", "16": "9. Kinetic energy: The energy of an object due to its motion.", "17": "", "18": "10. Gravitational potential energy: The energy of an object due to its position in a gravitational field.", "19": "", "20": "11. Bernoulli's equation: A mathematical equation that describes the relationship between pressure, velocity, and elevation in a fluid.", "21": "", "22": "12. Viscosity: A measure of a fluid's resistance to deformation or flow.", "23": "", "24": "13. Ideal fluid: A theoretical concept of a fluid with no viscosity or friction, and is incompressible.", "25": "", "26": "14. Viscous flow: The flow of a fluid characterized by energy loss to frictional forces, which slows down the fluid and requires work to maintain a constant flow rate.", "27": "", "28": "15. Poiseuille's law: A mathematical equation that relates the pressure drop, flow rate, and viscosity of an incompressible and Newtonian fluid in laminar flow through a cylindrical pipe of constant diameter."}, "problems": {"0": "1. How does Pascal's principle relate to the movement of fluids?", "1": "2. Calculate the blood pressure in a person based on the density and height of organs.", "2": "3. Explain Archimedes' principle and its relationship to buoyancy.", "3": "4. How is the buoyant force determined for objects floating or sinking in fluids?", "4": "5. What is the condition for an object to float in a fluid?", "5": "6. How can you rank the densities of objects in relation to different fluids?", "6": "7. Give examples of real-world scenarios that illustrate the principles of density and buoyancy.", "7": "8. How does conservation of energy apply to fluid mechanics?", "8": "9. Explain the different types of energy in a fluid and their relationship to each other.", "9": "10. How can the change in energy be used to calculate pressure and velocity in fluid dynamics?", "10": "11. What is Bernoulli's equation and how does it relate to the conservation of energy?", "11": "12. Provide an example of using Bernoulli's equation to solve for an unknown quantity in fluid dynamics.", "12": "13. Define viscosity and its relationship to a fluid's resistance to deformation.", "13": "14. Contrast ideal fluid flow with viscous flow.", "14": "15. What does Poiseuille's law describe in terms of fluid flow in a long cylindrical pipe?"}}

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
        fetch('/uploadFile', {
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
            {!showTableRes ?
                <section>
                    <h1 className='pagetitle'>Slides Summary</h1>
                    
                    <div className='tabwrapper'>
                        <CenteredTabs 
                        summary={testfile.bulletpoints}
                        def={testfile.definitions}
                        problems={testfile.problems} />
                    </div>
                </section> : null}
        </>
    );
}
