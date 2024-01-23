import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const BenevoleInscriptionZone = () => {

    const [listAreas, setListAreas] = useState([]);

    //get all areas of a festival where jeux is not empty
    return (
        <div>
            <Header currentPage="inscription" />

            <div>
                <h2>Choisissez la zone où vous souhaitez vous inscrire</h2>
            </div>
            <Navbar />
        </div>
    );
}

export default BenevoleInscriptionZone;