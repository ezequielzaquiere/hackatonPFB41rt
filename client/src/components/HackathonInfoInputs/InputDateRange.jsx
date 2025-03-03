//Importar dependenias
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours } from 'date-fns';
import PropTypes from 'prop-types';

//Input de rango de fechas
const InputDateRange = ({ formData, handleChangeDate }) => {
    const now = new Date();
    return (
        <>
            <legend className="block text-sm font-medium text-gray-900 dark:text-white">
                Fecha y hora de inicio y finalizacion
            </legend>

            {/****************************************************
             ****** Input datepicker de la fecha de inicio  ******
             ****************************************************/}

            <DatePicker
                selectsStart
                isClearable
                minDate={addHours(now, 24)}
                selected={formData.startingDate}
                onChange={(date) => {
                    handleChangeDate('startingDate', date);
                }}
                startDate={formData.startingDate}
                dateFormat="dd-MM-yyyy"
                id="startingDate"
                placeholderText="Fecha de inicio"
                openToDate={now}
                required
                withPortal
                className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                wrapperClassName="w-full"
                popperClassName="responsive-datepicker"
                calendarClassName="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            {/****************************************************
             *** Input datepicker de la fecha de fnalizacion  ****
             ****************************************************/}

            <DatePicker
                selectsEnd
                isClearable
                selected={formData.deadline}
                onChange={(date) => {
                    handleChangeDate('deadline', date);
                }}
                endDate={formData.deadline}
                minDate={formData.startingDate}
                placeholderText="Fecha de finalizacion"
                dateFormat="dd-MM-yyyy"
                className="mb-8 bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                required
                openToDate={formData.startingDate ? formData.startingDate : now}
                popperClassName="responsive-datepicker"
                withPortal
            />
        </>
    );
};
//Validadcion de props
InputDateRange.propTypes = {
    handleChangeDate: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};

export default InputDateRange;
