import React, { useState, useRef } from 'react';
import demkaImage from '../../img/demka.png';
import './style.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import copyIcon from '../../img/copy.svg';
import tvIcon from '../../img/tv.svg';




const Demka = () => {

    const [code, setCode] = useState(
        `    from typing import Annotated
    from fastapi import FastAPI, Path
    
    app = FastAPI()
    
    @app.get("/items/{item_id}")
    async def read_items(
    
    item_id: Annotated[int, Path(title="The ID of the item to get", ge=1)], q: str
    ):
        results = {"item_id": item_id}
        if q:
            results.update({"q": q})
        return results`
    );
    const [copied, setCopied] = useState(false);
    const fileContentRef = useRef(null);

    const [file, setFile] = useState(null);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [fileContent, setFileContent] = useState('');

    const [key, setKey] = useState('home');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setError('');

        const reader = new FileReader();
        reader.onload = (e) => {
            setFileContent(e.target.result);
        };
        reader.readAsText(selectedFile);
    };

    const handleCopy2Click = () => {
        const contentToCopy = fileContentRef.current.textContent;


        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = contentToCopy;
        document.body.appendChild(tempTextarea);

        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);


        setCopied(true);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + `/execute-code`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setOutput(response.data.output);
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('Ошибка компиляции, исправьте код');
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className='mb-5'>
            <nav className="navbar" style={{ backgroundColor: "#2D2F31" }}>
                <div className="container-fluid">
                    <span className='text-white fs-3' style={{ paddingLeft: "2rem" }}>TYUIUCON</span>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-9 pt-5 ps-5">
                        <div className="info__block">
                            <h5 className='fw-semibold'>Знакомство с редактором. Первая страница.</h5>

                            <div className="block__description pt-3">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit nunc eu erat volutpat, tempus efficitur lectus commodo. Sed tincidunt posuere enim. Sed sapien sem, volutpat in maximus vitae, tristique ac neque. Mauris sit amet leo sed ligula auctor mollis. Cras nec velit vehicula, sollicitudin erat ut, sollicitudin nulla. Fusce vulputate auctor sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam suscipit sem id sem ullamcorper, in dignissim tellus fringilla.
                                    Duis imperdiet nisi nec tellus dictum, rhoncus ultrices metus accumsan. Pellentesque euismod turpis non nisi iaculis, eu tempus neque convallis. Quisque bibendum quis augue vel fermentum. Curabitur leo massa, rhoncus eu leo vel, eleifend tristique ipsum. Praesent luctus auctor feugiat. Quisque accumsan ultricies nibh vitae pulvinar. Morbi vel libero vel mauris vestibulum ultrices eu ac lorem. Sed et purus aliquam turpis tristique scelerisque at nec nisl.
                                    Integer pulvinar neque et mi tristique consectetur. Proin nec vulputate mauris. Praesent vel lorem consequat nulla euismod feugiat eu ac ipsum. Nullam condimentum consectetur ornare. Aliquam erat volutpat. Etiam augue justo, tincidunt scelerisque tincidunt nec, placerat luctus ex. Ut convallis egestas suscipit. Quisque at posuere purus. In venenatis molestie libero, non maximus ante consectetur eu. Curabitur mattis libero ac augue hendrerit fermentum. Pellentesque venenatis interdum eros, vel blandit lacus porta at.</p>
                            </div>

                            <div className="block__image pt-3">
                                <img src={demkaImage} alt="demka-img" className='w-100 img-fluid' />
                            </div>
                        </div>
                    </div>

                    <div className="col-3">

                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className='p-3 border' style={{ display: "flex", justifyContent: "space-between" }}> <span className='fw-bold'>Материалы курса</span><button type="button" className="btn-close" aria-label="Close"></button></div>
                            <div className="p-3 border">
                                <div className="input-group">
                                    <div className="form-outline" style={{ display: "flex", width: "100%" }}>
                                        <input type="search" id="form1" className="form-control" placeholder='Поиск по материалам курса' />
                                    </div>
                                </div>
                            </div>


                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button style={{ display: "flex", flexWrap: "wrap" }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        <span className='fw-semibold' style={{ width: "100%" }}>Раздел 1: Введение. Основы HTML <br /> </span><br /><span style={{ color: "#6A6F73", marginTop: "6px" }}>0 / 5 | 1 ч 5 мин</span>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">

                                        <div className="subsection">
                                            <label htmlFor="check">
                                                <input type="checkbox" className="custom-control custom-checkbox" id="check" /> 1. Кто такой фронтенд разработчик<br />
                                                <span style={{ color: "#6A6F73", marginLeft: "25px" }}><img src={tvIcon} alt="tvIcon" /> 1 мин</span>
                                            </label>
                                        </div>

                                        <div className="subsection">
                                            <label htmlFor="check2">
                                                <input type="checkbox" className="custom-control custom-checkbox" id="check2" /> 2. Инструменты и этапы разработки <br />
                                                <span style={{ color: "#6A6F73", marginLeft: "25px" }}><img src={tvIcon} alt="tvIcon" /> 1 мин</span>
                                            </label>
                                        </div>

                                        <div className="subsection">
                                            <label htmlFor="check3">
                                                <input defaultChecked type="checkbox" className="custom-control custom-checkbox" id="check3" /> 3. Знакомство с html. Теги и атрибуты. <br />
                                                <span style={{ color: "#6A6F73", marginLeft: "25px" }}><img src={tvIcon} alt="tvIcon" /> 1 мин</span>
                                            </label>
                                        </div>

                                        <div className="subsection">
                                            <label htmlFor="check4">
                                                <input type="checkbox" className="custom-control custom-checkbox" id="check4" /> 4. Знакомство с редактором. Первая страница. <br />
                                                <span style={{ color: "#6A6F73", marginLeft: "25px" }}><img src={tvIcon} alt="tvIcon" /> 1 мин</span>
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button style={{ display: "flex", flexWrap: "wrap" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        <span className='fw-semibold' style={{ width: "100%" }}>Раздел 2: Основы CSS <br /> </span><br /><span style={{ color: "#6A6F73", marginTop: "6px" }}>0 / 5 | 1 ч 5 мин</span>
                                    </button>
                                </h2>

                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div className="accordion-body">
                                        <span>text</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9 pt-5 ps-5">
                        <div className="block__code" style={{ width: "100%", backgroundColor: "#F8F8F8", position: "relative" }}>
                            <pre className='p-3'>{code}</pre>
                            <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                                <button type='button' className='border-0' style={{ position: "absolute", bottom: "10px", right: "4px", backgroundColor: "inherit" }}><img src={copyIcon} alt="Копировать" style={{ width: '20px', height: '20px' }} /></button>
                            </CopyToClipboard>
                        </div>

                        <div className="block__material mt-4">

                            <h5 className='fw-semibold'>Давай узнаем как ты освоил материал</h5>

                            <p className='mt-2'>Создай объект типа User, сериализуй и выведи результат через print</p>

                            <div className="block__code" style={{ width: "100%", backgroundColor: "#F8F8F8" }}>
                                <div>

                                    {fileContent &&

                                        <div style={{ position: "relative" }}>

                                            <pre className='p-3' ref={fileContentRef}>{fileContent}</pre>


                                            <button
                                                type='button'
                                                className='border-0 copy2'
                                                style={{ position: "absolute", bottom: "10px", right: "4px", backgroundColor: "inherit" }}
                                                onClick={handleCopy2Click}
                                            >
                                                <img src={copyIcon} alt="Копировать" style={{ width: '20px', height: '20px' }} />
                                            </button>

                                        </div>
                                    }

                                    {output && <div className='p-2' style={{ color: "green" }}>Результат: <br /> {output}</div>}
                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                </div>

                            </div>

                            <input type="file" accept=".txt, .py" onChange={handleFileChange} />
                            <button className='border-1 mt-3' onClick={handleSubmit}>Выполнить</button>

                        </div>

                    </div>

                </div>
                <div className="col-9 pt-5 ps-5">
                    <div className="row">

                        <div className="tab__content">

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3">

                                <Tab eventKey="home" title="Обзор">
                                    <div className="col-12 d-flex">

                                        <div className="col-9">
                                            <p className='fw-semibold'>Что будет на курсе?</p>

                                            <ol className="">
                                                <li className="mt-2">&nbsp;В первой части мы узнаем кто такой frontend разработчик, познакомимся инструментами и изучим синтаксис HTML</li>
                                                <li className="mt-2">&nbsp;Во второй части мы перейдем к знакомству с CSS, узнаем о приоритетах стилей, посмотрим на панель разработчика, узнаем базовые свойства, поработаем с позиционированием и изучим Flexbox.</li>
                                                <li className="mt-2">&nbsp;В третьей части мы сверстаем небольшую страницу где применим все то что прошли ранее.</li>
                                                <li className="mt-2">&nbsp;Верстка проекта по макету.</li>
                                                <li className="mt-2">&nbsp;В четвертой части курса мы познакомимся с основами CSS Grid.</li>
                                            </ol>

                                            <p className='fw-semibold mb-2'>Для кого этот курс?</p>
                                            <span>Этот курс для тех кто никогда еще не занимался web-разработкой и хочет начать знакомство с самых азов.</span>

                                            <p className='fw-semibold mb-2 mt-3'>Чему вы научитесь</p>
                                            <ul>
                                                <li>Познакомимся с основами HTML</li>
                                                <li>Познакомимся с основами CSS</li>
                                                <li>Изучим основные свойства Flexbox</li>
                                                <li>Познакомимся с основами CSS Grid</li>
                                                <li>Сверстаем несколько небольших страниц</li>
                                                <li>Верстка проекта по макету</li>
                                            </ul>

                                            <p className='fw-semibold mb-2 mt-3'>Существуют ли у курса какие-либо (предварительные) требования?</p>
                                            <ul>
                                                <li>Желание и наличие компьютера.</li>
                                            </ul>

                                            <p className='fw-semibold mb-2 mt-3'>Для кого этот курс:</p>
                                            <ul>
                                                <li>начинающие разработчики</li>
                                                <li>люди без опыта разработки</li>
                                            </ul>

                                        </div>
                                    </div>
                                    <hr />


                                </Tab>

                                <Tab eventKey="notes" title="Заметки">
                                    Пока что тут пусто...
                                </Tab>
                                <Tab eventKey="discussions" title="Обсуждения">
                                    Пока что тут пусто...
                                </Tab>
                                <Tab eventKey="additional" title="Дополнительные материалы">
                                    Пока что тут пусто...
                                </Tab>

                            </Tabs>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default Demka;
