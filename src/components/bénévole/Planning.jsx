// Planning.jsx
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';


const Planning = ({ festivalId, onSlotClick, onViewDetails }) => {
const [festivalInfo, setFestivalInfo] = useState(null);
const [festivalPositions, setFestivalPositions] = useState([]);

useEffect(() => {
    const fetchFestivalInfo = async () => {
    try {
        const response = await fetch(`http://localhost:3000/festival-module/${festivalId}`);
        if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du festival');
        }

        const data = await response.json();
        setFestivalInfo(data);
    } catch (error) {
        console.error(error);
    }
    };

    const fetchPositions = async () => {
    try {
        const positionsResponse = await fetch(`http://localhost:3000/employer-module/festival/${festivalId}`);
        if (!positionsResponse.ok) {
        throw new Error('Erreur lors de la récupération des postes du festival');
        }

        const positionsData = await positionsResponse.json();
        setFestivalPositions(positionsData);
    } catch (error) {
        console.error(error);
    }
    };

    fetchFestivalInfo();
    fetchPositions();
}, [festivalId]);

const getDaysDifference = (dateStart, dateEnd) => {
    const diffInTime = new Date(dateEnd) - new Date(dateStart);
    return diffInTime / (1000 * 3600 * 24);
};

const handleSlotClick = (dayIndex, slot) => {
    const selectedPosition = festivalPositions.find((position) => {
    const selectedDate = new Date(festivalInfo.DateDebut);
    selectedDate.setDate(selectedDate.getDate() + dayIndex);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    return position.inscriptions.some(
        (inscription) => inscription.Jour === formattedDate && inscription.Creneau === slot
    );
    });

    if (selectedPosition) {
    onViewDetails(selectedPosition);
    } else {
    onSlotClick(dayIndex, slot);
    }
};

const renderTimeSlots = () => {
    if (!festivalInfo || festivalPositions.length === 0) {
    return <p>Chargement en cours...</p>;
    }

    const dateDebut = new Date(festivalInfo.DateDebut);
    const daysDifference = getDaysDifference(dateDebut, new Date(festivalInfo.DateFin));

    const days = [];
    for (let i = 0; i <= daysDifference; i++) {
    const timeSlots = ['9-11', '11-14', '14-17', '17-20', '20-22'];
    days.push(
        <div key={i}>
        <h3>Jour {i + 1}</h3>
        <ul>
            {timeSlots.map((slot, index) => {
            const isSelected = festivalPositions.some((position) => {
                const selectedDate = new Date(festivalInfo.DateDebut);
                selectedDate.setDate(selectedDate.getDate() + i);
                const formattedDate = selectedDate.toISOString().split('T')[0];

                return position.inscriptions.some(
                (inscription) => inscription.Jour === formattedDate && inscription.Creneau === slot
                );
            });

            const slotClassName = isSelected ? 'inscription' : '';
            const clickable = !isSelected;

            return (
                <li
                key={index}
                className={`${slotClassName} ${clickable ? 'clickable' : ''}`}
                onClick={() => clickable && handleSlotClick(i, slot)}
                >
                {slot}
                </li>
            );
            })}
        </ul>
        </div>
    );
    }

    return days;
};

return (
    <div>
    <h1>Planning</h1>
    {renderTimeSlots()}
    </div>
);
};

Planning.propTypes = {
festivalId: PropTypes.string.isRequired,
onSlotClick: PropTypes.func,
onViewDetails: PropTypes.func,
};

Planning.defaultProps = {
onSlotClick: () => {},
onViewDetails: () => {},
};

export default Planning;
