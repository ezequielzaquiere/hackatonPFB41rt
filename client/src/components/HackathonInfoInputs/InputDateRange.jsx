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
            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
