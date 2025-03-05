//Importar dependencias
import PropTypes from 'prop-types';

//Input de textarea de  los detalles
const InputSummary = ({ formData, handleChangeGeneral }) => {
    return (
        <>
            <label
                htmlFor="summary"
                className="block text-sm font-medium text-[#9A4EAE]"
            >
                Descripcion del evento
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
                className="mb-8 bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
            ></textarea>
        </>
    );
};

//Validadcion de props
InputSummary.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};

export default InputSummary;
