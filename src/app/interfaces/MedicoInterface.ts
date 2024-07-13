
export interface MedicoInterface {
    id?: string;
    nombre?: string; 
    apellido?: string; 
    numDni?: string; 
    numCel?: string; 
    correo?: string;
    conact: string;
    _links: {
        self: {
            href: string;
        };
    }
}
