import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreaNotif from '../../components/AccueilAdmin/admin/CreaNotif';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';

const AdminSendNotif = () => {
const { idFestival } = useParams();
const [selectedFestival, setSelectedFestival] = useState(idFestival);



const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
};
    return (
        <div>
            <Header currentPage="notifications" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
            <CreaNotif idFestival={selectedFestival} />
            <NavbarAdmin idFestival={selectedFestival}/>
        </div>
    );
    }
export default AdminSendNotif;