import PropTypes from 'prop-types';

//Input de texto del titulo
const InputTitle = ({ formData, handleChangeGeneral }) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Titulo
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChangeGeneral}
                required
                placeholder="Aqui va el título"
                autoFocus
                className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
            />
        </div>
    );
};

//Validadcion de props
InputTitle.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};
export default InputTitle;
