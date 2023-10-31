import React, { useState } from 'react';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

const CoursesManagament = () => {

    const navigate = useNavigate();

    const [taskFormData, setTaskFormData] = useState({
        taskName: '',
        maxScores: 0,
        options: [{ selectedOption: '', inputValue: '' }],
    });

    const [taskNames, setTaskNames] = useState([]);



    const handleMaxScoresChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTaskFormData({ ...taskFormData, maxScores: value });
    };

    const handleTaskNameChange = (e) => {
        const value = e.target.value;
        setTaskFormData({ ...taskFormData, taskName: value });
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...taskFormData.options];
        updatedOptions[index].selectedOption = e.target.value;
        updatedOptions[index].inputValue = '';
        setTaskFormData({ ...taskFormData, options: updatedOptions });
    };

    const handleInputChange = (e, index) => {
        const updatedOptions = [...taskFormData.options];
        updatedOptions[index].inputValue = e.target.value;
        setTaskFormData({ ...taskFormData, options: updatedOptions });
    };

    const handleAddOption = () => {
        const updatedOptions = [...taskFormData.options, { selectedOption: '', inputValue: '' }];
        setTaskFormData({ ...taskFormData, options: updatedOptions });
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = taskFormData.options.filter((_, i) => i !== index);
        setTaskFormData({ ...taskFormData, options: updatedOptions });
    };




    return (
        <div className="container-fluid">
            <div className="row flex-nowrap background-color-main-block">
                <SideBar navigate={navigate} />

                <div className="col-9">
                    <div className='sub__main__block'>
                        <p className="fw-normal fs-4">Создание курса</p>
                        <hr />

                        <form className="col-5 flex-row">
                            <div className="mb-3">
                                <input type="text" placeholder="Введите название курса" value={taskFormData.taskName} onChange={handleTaskNameChange} className='form-control' required />
                            </div>

                            {taskFormData.options.map((option, index) => (
                                <div key={index}>
                                    <div className="select-container d-flex align-items-center justify-content-center">
                                        <select
                                            className='form-select'
                                            onChange={(e) => handleOptionChange(e, index)}
                                            value={option.selectedOption}>
                                            <option>Выберите тип</option>
                                            <option value="Заголовок">Заголовок</option>
                                            <option value="Текст">Текст</option>
                                            <option value="Видео">Видео</option>
                                            <option value="Задание">Задание</option>
                                        </select>
                                        <span onClick={() => handleRemoveOption(index)}><i className="bi bi-x fs-3 ms-3"></i></span>
                                    </div>
                                    <br />

                                    {option.selectedOption === 'Заголовок' && (
                                        <input type="text" placeholder="Введите заголовок" value={option.inputValue} onChange={(e) => handleInputChange(e, index)} className='form-control' />
                                    )}

                                    {option.selectedOption === 'Текст' && (
                                        <textarea placeholder="Введите текст" value={option.inputValue} onChange={(e) => handleInputChange(e, index)} className='form-control' rows={5} />
                                    )}

                                    {option.selectedOption === 'Видео' && (
                                        <input type="text" placeholder="Введите ссылку на видео" value={option.inputValue} onChange={(e) => handleInputChange(e, index)} className='form-control' />
                                    )}

                                    {option.selectedOption === 'Задание' && (
                                        <select className='form-select'><option>Дискретная математика</option><option>Мат статистика</option></select>
                                    )}
                                </div>
                            ))}

                            <div className="d-flex flex-column col-6">
                                <button className='btn btn-outline-secondary mt-4 mb-3' onClick={handleAddOption} type="button">Добавить значение</button>
                                <button className='btn btn-secondary mt-4 mb-3' type="submit">Создать курс</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesManagament;