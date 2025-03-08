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
            <legend className="block mb-2 text-base font-semibold text-white">
                Fechas del Hackathon *
            </legend>

            {/****************************************************
             ****** Input datepicker de la fecha de inicio  ******
             ****************************************************/}
            <div className="flex flex-col lg:flex-row gap-4 w-full justify-between lg:items-center">
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
                    className="w-full bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    wrapperClassName="w-full"
                    popperClassName="w-full responsive-datepicker"
                    calendarClassName="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    style={{ width: '100% !important' }} // Usamos !important
                />

                <img
                    src="/faqGraphism.png"
                    alt="Adorno del título Crear Hackathon"
                    className="hidden lg:block max-w-30 pt-2 pb-5"
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
                    minDate={formData.startingDate || addHours(now, 48)}
                    placeholderText="Fecha de finalizacion"
                    dateFormat="dd-MM-yyyy"
                    className="w-full bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    required
                    openToDate={
                        formData.startingDate ? formData.startingDate : now
                    }
                    popperClassName="w-full responsive-datepicker"
                    wrapperClassName="w-full"
                    withPortal
                />
            </div>
        </>
    );
};
//Validadcion de props
InputDateRange.propTypes = {
    handleChangeDate: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};

export default InputDateRange;
