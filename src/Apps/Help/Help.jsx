import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Help.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/help.png';


const Help = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing,setClosing] = useState(false);
    const profileRef = useRef(null);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500); 
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`help-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbarh'>
                    <div className='adjtoph'>
                        <h2 className='app-titleh'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titleh'>Help</h2>
                    </div>
                    <p className='close-buttonh' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contenth'>
                    <div className='mainhead'>
                        <p className='hands'>🤌🏽</p>
                        <div className='sense'>
                            <p className='userguide'>User Guide</p>
                            <p className='comment'>It makes Sense...</p>
                        </div>
                    </div>
                    <div className='appscontext'>
                        <p className='appshead'>👉🏾 Apps and their uses</p>
                        <p className='profileah'></p>
                    </div>
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default Help;
