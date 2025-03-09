//Importar dependencias
import PropTypes from 'prop-types';

//Input de textarea de  los detalles
const InputSummary = ({ formData, handleChangeGeneral }) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="summary"
                className="block text-base font-semibold text-white mb-2"
            >
                Descripcion del Hackathon *
            </label>
            <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChangeGeneral}
                placeholder="Una breve descripcion del evento..."
                maxLength="140"
                rows="4"
                required
                className="focus:placeholder-transparent
focus:bg-[#7A3E8F] w-full bg-[#333] border border-[#7a3e8f] text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition hover:ring-2 hover:ring-[#7a3e8f]"
            ></textarea>
        </div>
    );
};

//Validadcion de props
InputSummary.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};

export default InputSummary;
