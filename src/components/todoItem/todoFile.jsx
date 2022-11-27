import React from 'react';

const TodoFile = ({deleteFile, id, pathToFile,}) => {
    return (
        <div className="todo_file">
            <label htmlFor="files">Кликните, чтоб скачать прикриплённый файл:</label>
            <div className="block_file">
                <div id="files">
                    {pathToFile !== '' ? pathToFile : "Пусто"}
                </div>
                {pathToFile !== '' && <button onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(pathToFile, id)
                }}>X</button> }
            </div>
        </div>
    );
};

export default TodoFile;