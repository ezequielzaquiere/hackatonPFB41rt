//Importar dependenias
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours } from 'date-fns';
import PropTypes from 'prop-types';
//Input de rango de fechas
const InputDateRange = ({ formData, handleChangeDate }) => {
    const now = new Date();
    return (
        <div className="mb-5">
            <legend className="block text-base font-semibold text-white mb-2">
                Fechas del Hackathon *
            </legend>

            {/****************************************************
             ****** Input datepicker de la fecha de inicio  ******
             ****************************************************/}
            <div className="flex flex-col lg:flex-row lg:justify-start gap-4 w-full justify-between lg:items-center">
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
                    className="focus:placeholder-transparent
focus:bg-[#7A3E8F] w-full bg-[#333] border border-[#7a3e8f] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition hover:ring-2 hover:ring-[#7a3e8f]"
                    wrapperClassName="w-full"
                    popperClassName="w-full responsive-datepicker"
                    calendarClassName="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    style={{ width: '100% !important' }} // Usamos !important
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
                    className="w-full bg-[#333] border border-[#7a3e8f] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition hover:ring-2 hover:ring-[#7a3e8f]"
                    required
                    openToDate={
                        formData.startingDate ? formData.startingDate : now
                    }
                    popperClassName="w-full responsive-datepicker"
                    wrapperClassName="w-full"
                    withPortal
                />
            </div>
        </div>
    );
};
//Validadcion de props
InputDateRange.propTypes = {
    handleChangeDate: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};

export default InputDateRange;
