import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faGlobe, faCog, faFolder, faLayerGroup, faShareAlt, faAngleLeft,faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";


const Add = () => {
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const [tabs, setTabs] = useState([{ id: 0, title: "Untitled", method: "GET" }]);
    const [activeTab, setActiveTab] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const [activeSection, setActiveSection] = useState("custom-param");


    const changeMethod = (method) => {
        setSelectedMethod(method);
    };





    const addTab = () => {
        const newTab = {
            id: tabs.length,
            title: "Untitled",
            method: "GET",
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
    };

    const removeTab = (id) => {
        const updatedTabs = tabs.filter((tab) => tab.id !== id);
        setTabs(updatedTabs);

        if (id === activeTab && updatedTabs.length > 0) {
            setActiveTab(updatedTabs[0].id);
        } else if (updatedTabs.length === 0) {
            setTabs([{ id: 0, title: "Untitled", method: "GET" }]);
            setActiveTab(0);
        }
    };

    

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
            {/* Left Sidebar */}
            <div className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><FontAwesomeIcon icon={faLink} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faReact} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faGlobe} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faCog} /></a>
            </div>

            {/* Left Panel */}
            <div className="panel left-panel" ref={leftPanelRef}>
                <div className="request-bar">
                    <div className="left-section" id="tab-container">
                        {tabs.map((tab) => (
                            <div key={tab.id} className={`tab ${tab.id === activeTab ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}
                                style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                <div className="request-method text-success">{tab.method}</div>
                                <div className="request-title">{tab.title}</div>
                                {tabs.length > 1 && (
                                    <div className="close-tab" onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}>&times;</div>
                                )}
                            </div>
                        ))}
                        <div className="add-tab" id="add-tab" onClick={addTab}>+</div>
                    </div>

                    <div className="right-section">
                        <div className="env-select">
                            <span className="env-icon"><FontAwesomeIcon icon={faLayerGroup} /></span>
                            <span>Select environment</span>
                            <span className="dropdown-arrow">▾</span>
                        </div>
                        <div className="eye-icon"><i className="fa-regular fa-eye"></i></div>&nbsp;&nbsp;
                    </div>
                </div>

                {/* Request Bar */}
                <div className="content" id="topContent">
                    <div className="request-bar1">
                        <div className="method-dropdown">
                            <span>{selectedMethod}</span>
                            <div className="method-options mt-3">
                                <div style={{ color: "green" }} onClick={() => changeMethod("GET")}><b>GET</b></div>
                                <div style={{ color: "orange" }} onClick={() => changeMethod("POST")}><b>POST</b></div>
                                <div style={{ color: "rgb(0, 140, 255)" }} onClick={() => changeMethod("PUT")}><b>PUT</b></div>
                                <div style={{ color: "purple" }} onClick={() => changeMethod("PATCH")}><b>PATCH</b></div>
                                <div style={{ color: "red" }} onClick={() => changeMethod("DELETE")}><b>DELETE</b></div>
                                <div style={{ color: "yellow" }} onClick={() => changeMethod("OPTIONS")}>OPTIONS</div>
                            </div>
                        </div>

                        <input type="text" className="input-url" placeholder="Enter request URL" defaultValue="https://echo.hoppscotch.io" />
                        <button className="send-button">Send</button>
                        <button className="save-button">    <FontAwesomeIcon icon={faFloppyDisk} /> &nbsp; Save              </button>
                    </div>

                    <div>
            {/* UI Section Tabs */}
            <div className="custom-tab-container">
                <div
                    className={`custom-tab ${activeSection === "custom-param" ? "active" : ""}`}
                    onClick={() => setActiveSection("custom-param")}
                >
                    Parameters
                </div>
                <div
                    className={`custom-tab ${activeSection === "custom-body" ? "active" : ""}`}
                    onClick={() => setActiveSection("custom-body")}
                >
                    Body
                </div>
                <div
                    className={`custom-tab ${activeSection === "custom-header" ? "active" : ""}`}
                    onClick={() => setActiveSection("custom-header")}
                >
                    Headers
                </div>
            </div>

            {/* API Request Tabs Content */}
            <div className="tab-content">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`content-panel ${tab.id === activeTab ? "active" : "d-none"}`}
                    >
                        <h2>{tab.title} - Tab {tab.id}</h2>

                        {/* Show content based on activeSection */}
                        {activeSection === "custom-param" && <p>Parameters Content for {tab.title}</p>}
                        {activeSection === "custom-body" && <p>Body Content for {tab.title} </p>}
                        {activeSection === "custom-header" && <p>Headers Content for {tab.title}</p>}
                    </div>
                ))}
            </div>
        </div>
                </div>
            </div>

            {/* Resizer */}
            <div className="resizer d-none d-lg-block" onMouseDown={() => setIsResizing(true)} />


            {/* Right Sidebar */}
            <div className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><FontAwesomeIcon icon={faFolder} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faLayerGroup} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faShareAlt} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faAngleLeft} /></a>
            </div>

            {/* Right Panel */}
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
