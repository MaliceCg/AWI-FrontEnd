import React from 'react';
import { useParams } from 'react-router-dom';
import CreaNotif from '../../components/AccueilAdmin/admin/CreaNotif';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';

const AdminSendNotif = () => {
    const idFestival = useParams();
    return (
        <div>
            <Header currentPage="notifications" />
            <CreaNotif idFestival={idFestival} />
            <NavbarAdmin />
        </div>
    );
    }
export default AdminSendNotif;