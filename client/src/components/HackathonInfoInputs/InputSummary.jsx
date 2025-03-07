//Importar dependencias
import PropTypes from 'prop-types';

//Input de textarea de  los detalles
const InputSummary = ({ formData, handleChangeGeneral }) => {
    return (
        <>
            <label
                htmlFor="summary"
                className="block mb-2 text-base font-semibold text-white"
            >
                Descripcion del hackathon *
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
                className="mb-8 w-full bg-[#333] border border-[#9A4EAE] text-white p-2 md:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
            ></textarea>
        </>
    );
};

//Validadcion de props
InputSummary.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};

export default InputSummary;
