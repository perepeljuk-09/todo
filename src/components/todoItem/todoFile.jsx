import React from 'react';

const TodoFile = ({deleteFile, id, pathToFile,urlToFile, }) => {
    return (
        <div className="todo_file">
            <span>Ссылка на прикреплённый файл:</span>
            <div className="block_file">
                <div className="files">
                    {pathToFile !== '' ? <a rel="noreferrer" target="_blank"  href={urlToFile} download>{pathToFile}</a> : "Пусто"}
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