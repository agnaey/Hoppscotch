import React from "react";
import { useState, useRef, useEffect } from "react";

const Add = () => {
    const changeMethod = (method) => {
        document.getElementById("selected-method").textContent = method;
    };


    const [isResizing, setIsResizing] = useState(false);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const resizerRef = useRef(null);

    useEffect(() => {
        const handleResize = (event) => {
            if (!isResizing) return;
            
            let newLeftWidth = (event.clientX / window.innerWidth) * 100;
            if (newLeftWidth > 20 && newLeftWidth < 80) {
                leftPanelRef.current.style.width = `${newLeftWidth}%`;
                rightPanelRef.current.style.width = `${100 - newLeftWidth}%`;
            }
        };

        const stopResizing = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", stopResizing);
        }

        return () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing]);



    return ( 
        <div className="main">
            <div className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><i className="fas fa-link"></i></a>
                <a href="#" className="sidebar-item"><i className="fa-brands fa-react"></i></a>
                <a href="#" className="sidebar-item"><i className="fa fa-globe"></i></a>
                <a href="#" className="sidebar-item"><i className="fa fa-cog"></i></a>
            </div>

            <div className="panel left-panel" ref={leftPanelRef}>
                <div className="request-bar">
                    <div className="left-section" id="tab-container">
                        <div className="add-tab" id="add-tab">+</div>
                    </div>

                    <div className="right-section">
                        <div className="env-select">
                            <span className="env-icon"><i className="fa-solid fa-layer-group"></i></span>
                            <span>Select environment</span>
                            <span className="dropdown-arrow">▾</span>
                        </div>
                        <div className="eye-icon"><i className="fa-regular fa-eye"></i></div>&nbsp;&nbsp;
                    </div>
                </div>

                <div className="content" id="topContent">
                    <div className="request-bar1">
                        <div className="method-dropdown" id="method-selector">
                            <span id="selected-method">GET</span>
                            <div className="method-options mt-3" id="method-options">
                                <div style={{ color: "green" }} onClick={() => changeMethod('GET')}><b>GET</b></div>
                                <div style={{ color: "orange" }} onClick={() => changeMethod('POST')}><b>POST</b></div>
                                <div style={{ color: "rgb(0, 140, 255)" }} onClick={() => changeMethod('PUT')}><b>PUT</b></div>
                                <div style={{ color: "purple" }} onClick={() => changeMethod('PATCH')}><b>PATCH</b></div>
                                <div style={{ color: "red" }} onClick={() => changeMethod('DELETE')}><b>DELETE</b></div>
                                <div style={{ color: "yellow" }} onClick={() => changeMethod('OPTIONS')}>OPTIONS</div>
                            </div>
                        </div>

                        <input type="text" className="input-url" placeholder="Enter request URL" defaultValue="https://echo.hoppscotch.io" />
                        <button className="send-button">Send</button>
                        <button className="save-button"><i className="fa-regular fa-floppy-disk"></i>&nbsp;&nbsp; Save</button>
                    </div>

                    <div className="custom-tab-container">
                        <div className="custom-tab active" data-target="custom-param">Parameters</div>
                        <div className="custom-tab" data-target="custom-body">Body</div>
                        <div className="custom-tab" data-target="custom-header">Headers</div>
                    </div>

                    <div className="tab-content" id="tab-content">
                        <div className="content-panel active">This is Tab 1 content.</div>
                        <h2>Request Builder</h2>
                        <p>Place your API request form here.</p>
                        <div className="custom-content-panel active" id="custom-param">Parameters Content</div>
                        <div className="custom-content-panel" id="custom-body">Body Content</div>
                        <div className="custom-content-panel" id="custom-header">Headers Content</div>
                    </div>
                </div>
            </div>


            <div 
                className="resizer d-none d-lg-block" 
                onMouseDown={() => setIsResizing(true)}
            />
 

            <div  className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><i className="fas fa-folder"></i></a>
                <a href="#" className="sidebar-item"><i className="fas fa-layer-group"></i></a>
                <a href="#" className="sidebar-item"><i className="fas fa-share-alt"></i></a>
                <a href="#" className="sidebar-item"><i className="fas fa-angle-left"></i></a>
            </div>

            <div ref={rightPanelRef} className="panel right-panel d-none d-lg-block">
                <div className="content">
                    <h2>Collections</h2>
                    <p>Manage your saved requests here.</p>
                </div>
            </div>
        </div>
    );
};

export default Add;
